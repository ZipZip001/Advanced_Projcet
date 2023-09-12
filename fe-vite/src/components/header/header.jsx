import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {VscSearchFuzzy} from 'react-icons/vsc'
import {FiShoppingCart} from 'react-icons/fi'
import {BiSolidBookBookmark} from 'react-icons/bi'

import './header.scss';

import {Badge, Divider, Drawer, Dropdown, Popover, Space, message } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.carts)

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const items = [
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

    // const contentPopover = () =>{
    //     return(
    //         <div className="pop-cart-body">
    //             <div className="pop-cart-content">
    //                 <div className="book">
    //                     <img src="" />
    //                     <div>Đại việt sử ký</div>
    //                     <div>109.040</div>
    //                 </div>
    //                 <div className="book">
    //                     <img src="" />
    //                     <div>Đại việt sử ký</div>
    //                     <div>109.040</div>
    //                 </div>
    //             </div>
    //             <div className="pop-cart-footer">
    //                 <button>Xem giỏ hàng</button>
    //             </div>
    //         </div>
    //     )
    // };

    const contentPopover = () =>{
        return(
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {/* diff from here */}
                    {carts?.map((book, index) =>{
                        return(
                            <div className="book" key={`book-${index}`}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                <div>{book?.detail?.mainText}</div>
                                <div className="price">
                                    {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(book?.detail?.price) ?? 0}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div >
                    <button className="pop-cart-footer">Xem giỏ hàng</button>
                </div>
            </div>
        )
    };

    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <BiSolidBookBookmark className='rotate icon-react' /> Website bán sách
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom" style={{alignItems : "center"}}>
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                    className="popover-carts"
                                    placement="topRight"
                                    rootClassName="popover-carts"
                                    title={"Sản phẩm đã thêm"}
                                    arrow={true}
                                    content={contentPopover}
                                >
                                <Badge
                                    count={carts?.length ?? 0}
                                    size={"small"}
                                    showZero
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                                </Popover>

                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}>Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Welcome {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            {/* <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer> */}
        </>
    )
}

export default Header;