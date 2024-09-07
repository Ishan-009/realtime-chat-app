'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../../../components/ui/tooltip';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useConversation } from '../../../../../hooks/useConversation';
import { useMutationState } from '../../../../../hooks/useMutationState';
import Message from './Message';

type Props = {
  members: {
    _id?: Id<'users'>;
    lastSeenMessageId?: Id<'messages'>;
    username?: string;
    [key: string]: any;
  }[];
};

const Body = ({ members }: Props) => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<'conversations'>,
  });

  const { pending, mutate: markRead } = useMutationState(
    api.conversation.markRead
  );

  useEffect(() => {
    if (messages && messages.length > 0 && !pending) {
      markRead({
        conversationId,
        messageId: messages[0].message._id,
      });
    }
  }, [messages, conversationId, markRead, pending]);

  const getSeenMessage = (messageId: Id<'messages'>, senderId: Id<'users'>) => {
    if (!members) return undefined;

    const seenUsers = members
      .filter(
        (member) =>
          member.lastSeenMessageId === messageId && member._id !== senderId
      )
      .map((user) => user.username!.split(' ')[0]);

    if (seenUsers.length === 0) return undefined;

    return formatSeenBy(seenUsers);
  };
  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return (
          <p className="text-muted-foreground text-sm text-right">
            {`Seen by ${names[0]}`}
          </p>
        );
      case 2:
        return (
          <p className="text-muted-foreground text-sm text-right">
            {`Seen by ${names[0]} and ${names[1]}`}
          </p>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="text-muted-foreground text-sm text-right">
                  {`Seen by ${names[0]}, ${names[1]} and ${names.length - 2} more`}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {names.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar"></div>
    );
  }

  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages.map((messageData, index) => {
        const { message, senderImage, senderName, isCurrentUser } = messageData;
        const lastByUser =
          index > 0 &&
          messages[index - 1].message.senderId === message.senderId;
        const seenMessage = isCurrentUser
          ? getSeenMessage(message._id, message.senderId)
          : undefined;
        return (
          <Message
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            seen={seenMessage}
            type={message.type}
          />
        );
      })}
    </div>
  );
};

export default Body;
