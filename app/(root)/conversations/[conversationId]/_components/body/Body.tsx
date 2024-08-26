import { useQuery } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useConversation } from '../../../../../hooks/useConversation';
import Message from './Message';

const Body = () => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<'conversations'>,
  });

  console.log('conversationId:', conversationId);
  console.log('messages:', messages);

  if (messages === undefined) {
    return <div>Loading...</div>;
  }

  if (messages === null) {
    return <div>Error loading messages. Please try again.</div>;
  }

  if (messages.length === 0) {
    return <div>No messages in this conversation yet.</div>;
  }

  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages.map((messageData, index) => {
        const { message, senderImage, senderName, isCurrentUser } = messageData;
        const lastByUser =
          index > 0 &&
          messages[index - 1].message.senderId === message.senderId;

        return (
          <Message
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            type={message.type}
          />
        );
      })}
    </div>
  );
};

export default Body;
