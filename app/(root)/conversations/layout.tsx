'use client';

import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { ItemsList } from '../../../components/shared/items-list/ItemsList';
import { api } from '../../../convex/_generated/api';
import DMConversationItem from './_components/DMConversationItem';

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemsList title="Conversations">
        {conversations === undefined ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : conversations.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center ">
            No Conversations Found
          </p>
        ) : (
          conversations.map((conversation) => {
            if (
              !conversation.conversation.isGroup &&
              conversation.otherMember
            ) {
              return (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember.username || ''}
                  imageUrl={conversation.otherMember.imageUrl || ''}
                  lastMessageContent={conversation.lastMessage?.content || ''}
                  lastMessageSender={conversation.lastMessage?.sender || ''}
                />
              );
            }
            return null;
          })
        )}
      </ItemsList>
      {children}
    </>
  );
};

export default ConversationsLayout;
