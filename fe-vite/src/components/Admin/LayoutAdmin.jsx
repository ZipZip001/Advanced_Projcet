import React, { useState } from 'react';
import { AppstoreOutlined, DownOutlined, ExceptionOutlined, HeartTwoTone, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';  //DollarCir
import { Dropdown, Layout, Menu, Space, Switch, message } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './layout.scss';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
const {Content, Footer, Sider} = Layout

const items = [
    {
        label: <Link to='/admin'>Main Page</Link>,
        key: 'dasboard',
        icon:<AppstoreOutlined/>
    },

    {
        label: <span>Manage Users</span>,

        icon: <UserOutlined/>,
        children: [
            {
                label: <Link to='/admin/user'>User Infor</Link>,
                key: 'user',
                icon:<AppstoreOutlined/>
            },
            {
                label: 'A1',
                key: 'A1',
                icon:<TeamOutlined/>
            },
        ]
    },

    {
        label: <Link to='/admin/book'>Manager Books</Link>,
        key: 'book',
        icon:<ExceptionOutlined/>
    },

    {
        label: <Link to='/admin/orders'>Manager Orders</Link>,
        key: 'order',
        icon:<ExceptionOutlined/>
    },
];



const LayoutAdmin = () => {

    // make dark and white
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    //  Data
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dasboard');
    const user = useSelector(state =>state.account.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    // Drop
    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    
    ];

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />

      <Layout
        style={{ minHeight: '100vh'}}
        className='layout-admin'
        >
            <Sider
                theme={theme}
                collapsible
                collapsed = {collapsed}
                mode="inline"
                onCollapse={(value) => setCollapsed(value)}
            >
                <div style={{height: 32, margin: 16, textAlign: 'center', color:"#5C8374"}}>
                    <span>ADMIN PAGE</span>
                </div>
                
                <Menu
                    theme={theme}
                    onClick={onClick}
                    style={{height: 530}}

                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClickCapture={(e) => setActiveMenu(e.key)}
                />
            </Sider>

            <Layout>
                <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,{className: 'trigger', onClick: () => setCollapsed(!collapsed) })}
                    </span>

                    <Dropdown menu={{items: itemsDropdown}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcone{user?.fullName}
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet/>
                </Content>
                <Footer style={{ padding: 0 }}>
                    Admin Footer <HeartTwoTone/>
                </Footer>
            </Layout>
      </Layout>
      
    </>
  );
};
export default LayoutAdmin;