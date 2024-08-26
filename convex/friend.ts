import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';
export const remove = mutation({
  args: {
    conversationId: v.id('conversations'),
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

    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
      throw new ConvexError('Conversation Not Found');
    }

    const memberships = await ctx.db
      .query('conversationMembers')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .collect();

    if (!memberships) {
      throw new ConvexError('This Conversation does not have any members');
    }

    const freindships = await ctx.db
      .query('friends')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .unique();

    if (!freindships) {
      throw new ConvexError('Friends Could Not be Found');
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .collect();
    await ctx.db.delete(args.conversationId);
    await ctx.db.delete(freindships._id);
    await Promise.all(
      memberships.map(async (membership) => {
        await ctx.db.delete(membership._id);
      })
    );
    await Promise.all(
      messages.map(async (message) => {
        await ctx.db.delete(message._id);
      })
    );
  },
});
