import React from 'react';
import SidebarWrapper from '../../components/shared/sidebar/SidebarWrapper';
type Props = React.PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default Layout;
