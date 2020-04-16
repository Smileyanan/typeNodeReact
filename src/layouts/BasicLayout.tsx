import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React from 'react';
import { Link, useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';

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
  const { settings } = props;

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
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={() => [
          {
            path: '/wechat',
            name: '内容',
          },
        ]}
        {...props}
        {...settings}
      ></ProLayout>
    </>
  );
};

export default BasicLayout;
