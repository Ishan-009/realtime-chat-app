import React from 'react';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  return <div>{children}</div>;
};
