import React from 'react';
import ConversationFallback from '../../../components/shared/conversations/ConversationFallback';
import { ItemsList } from '../../../components/shared/items-list/ItemsList';
type Props = React.PropsWithChildren<{}>;

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemsList title="Freinds">Friends Page </ItemsList>
      <ConversationFallback></ConversationFallback>
    </>
  );
};

export default FriendsPage;
