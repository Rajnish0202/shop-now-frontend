import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { SiBrandfolder } from 'react-icons/si';
import { RiCoupon4Line, RiCouponLine } from 'react-icons/ri';
import { CgViewList } from 'react-icons/cg';
import { MdChecklist, MdOutlineCategory } from 'react-icons/md';
import { IoIosColorPalette, IoMdNotifications } from 'react-icons/io';
import { HiClipboardList } from 'react-icons/hi';
import { BsBorderStyle, BsSendCheck } from 'react-icons/bs';
import { AiOutlineBgColors } from 'react-icons/ai';
import { ImBlogger, ImBlogger2 } from 'react-icons/im';
import { GoTasklist } from 'react-icons/go';
import { BiDuplicate, BiListPlus } from 'react-icons/bi';
import { VscGroupByRefType, VscTypeHierarchySub } from 'react-icons/vsc';

import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo-admin'>
          {!collapsed ? (
            <h3>Shop-Now</h3>
          ) : (
            <div className='admin-logo'>
              <img src='/assests/logo-mini.png' alt='min-logo' />
            </div>
          )}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['']}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '',
              icon: <DashboardOutlined className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'users',
              icon: <UserOutlined className='fs-4' />,
              label: 'Users',
            },
            {
              key: 'catalog',
              icon: <AppstoreOutlined className='fs-4' />,
              label: 'Catalogs',
              children: [
                {
                  key: 'add-product',
                  icon: <ShoppingCartOutlined className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <UnorderedListOutlined className='fs-4' />,
                  label: 'Product List',
                },

                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Product Brand',
                },
                {
                  key: 'brand-list',
                  icon: <GoTasklist className='fs-4' />,
                  label: 'Brand List',
                },

                {
                  key: 'category',
                  icon: <BiDuplicate className='fs-4' />,
                  label: 'Product Category',
                },
                {
                  key: 'category-list',
                  icon: <BiListPlus className='fs-4' />,
                  label: 'Category List',
                },

                {
                  key: 'type',
                  icon: <VscGroupByRefType className='fs-4' />,
                  label: 'Product Type',
                },
                {
                  key: 'type-list',
                  icon: <VscTypeHierarchySub className='fs-4' />,
                  label: 'Type List',
                },

                {
                  key: 'color',
                  icon: <IoIosColorPalette className='fs-4' />,
                  label: 'Product Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
              ],
            },
            {
              key: 'all-orders',
              icon: <BsBorderStyle className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <ImBlogger2 className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'add-blog',
                  icon: <ImBlogger className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <HiClipboardList className='fs-4' />,
                  label: 'Blog List',
                },

                {
                  key: 'blog-category',
                  icon: <MdOutlineCategory className='fs-4' />,
                  label: 'Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <CgViewList className='fs-4' />,
                  label: 'Blog Category List',
                },
              ],
            },
            {
              key: 'coupons',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Coupons',
              children: [
                {
                  key: 'add-coupons',
                  icon: <RiCoupon4Line className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupons-list',
                  icon: <MdChecklist className='fs-4' />,
                  label: 'Coupon List',
                },
              ],
            },
            {
              key: 'enquiry',
              icon: <BsSendCheck className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className='d-flex justify-content-between ps-1 pe-5'
        >
          <Button
            type='text'
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className='fs-4' />
              ) : (
                <MenuFoldOutlined className='fs-4' />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoMdNotifications size={32} />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div>
            <div className='d-flex gap-3 align-items-center'>
              <div className='admin-user'>
                <img
                  src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1670577687/avatars/ytffuvbukg5j3nrp5uhc.png'
                  alt='avataar'
                />
              </div>
              <div>
                <h5 className='mb-0'>Rajnish</h5>
                <p className='mb-0'>rajnish.0202kumar@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
