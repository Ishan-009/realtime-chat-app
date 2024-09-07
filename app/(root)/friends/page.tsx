'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import ConversationFallback from '../../../components/shared/conversations/ConversationFallback';
import ItemsList from '../../../components/shared/items-list/ItemsList';
import AddFriendDialog from './_components/AddFriendDialog';
import Request from './_components/Request';

const FriendsPage = () => {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <ItemsList title="Friends" action={<AddFriendDialog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No friend requests found
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              );
            })
          )
        ) : (
          <Loader2 className="h-8 w-8" />
        )}
      </ItemsList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
