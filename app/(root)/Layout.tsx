import React from 'react';
import SidebarWrapper from '../../components/shared/sidebar/SidebarWrapper';
type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  console.log('Main Layout');

  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default layout;
