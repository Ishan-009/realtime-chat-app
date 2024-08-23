import React from 'react';
import { ItemsList } from '../../../components/shared/items-list/ItemsList';
type Props = React.PropsWithChildren<{}>;

const ConversationLayout = ({ children }: Props) => {
  return (
    <>
      <ItemsList title="Conversations">Conversations Page</ItemsList>
      {children}
    </>
  );
};

export default ConversationLayout;
