import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React from 'react';
import { Link, useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';
import indexRouter from '../Routes/index'; // 路由

export interface BasicLayoutProps extends ProLayoutProps {
  settings: Settings;
}

const defaultFooterDom = (
  <DefaultFooter
    copyright="umi-antd-pro构建项目to-yanan"
    links={[
      {
        key: 'gitlab',
        title: <GithubOutlined />,
        href: 'https://gitlab.com/YaNan_Q',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        itemRender={(route, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={() => [indexRouter]}
        {...props}
      />
    </>
  );
};

export default BasicLayout;
