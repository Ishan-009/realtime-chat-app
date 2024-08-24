// request.ts
import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';
export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    if (args.email === identity.email) {
      throw new ConvexError('Cant send a request to yourself');
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User Not Found');
    }

    const receiver = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError('User Could not be Found');
    }

    const requestAlreadySent = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', receiver._id).eq('sender', currentUser._id)
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError('Request Already Sent');
    }

    const requestAlreadyReceived = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', currentUser._id).eq('sender', receiver._id)
      )
      .first();

    if (requestAlreadyReceived) {
      throw new ConvexError('This User has already sent a request');
    }

    const friends1 = await ctx.db
      .query('friends')
      .withIndex('by_user1', (q) => q.eq('user1', currentUser._id))
      .collect();

    const friends2 = await ctx.db
      .query('friends')
      .withIndex('by_user2', (q) => q.eq('user2', currentUser._id))
      .collect();

    if (
      friends1.some((friend) => friend.user2 === receiver._id) ||
      friends2.some((friend) => friend.user1 === receiver._id)
    ) {
      throw new ConvexError('You are already Friends with this User');
    }
    const request = await ctx.db.insert('requests', {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    if (request) {
      console.log(request);
    }

    return request;
  },
});

export const deny = mutation({
  args: {
    id: v.id('requests'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const request = await ctx.db.get(args.id);

    if (!request || request.receiver !== currentUser._id) {
      throw new ConvexError('There was an error denying this request');
    }

    await ctx.db.delete(request._id);
  },
});

export const accept = mutation({
  args: {
    id: v.id('requests'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const request = await ctx.db.get(args.id);

    if (!request || request.receiver !== currentUser._id) {
      throw new ConvexError('There was an error accepting this request');
    }

    const conversationId = await ctx.db.insert('conversations', {
      isGroup: false,
    });

    await ctx.db.insert('friends', {
      user1: currentUser._id,
      user2: request.sender,
      conversationId,
    });

    await ctx.db.insert('conversationMembers', {
      memberId: currentUser._id,
      conversationId,
    });
    await ctx.db.insert('conversationMembers', {
      memberId: request.sender,
      conversationId,
    });

    await ctx.db.delete(request._id);
  },
});
