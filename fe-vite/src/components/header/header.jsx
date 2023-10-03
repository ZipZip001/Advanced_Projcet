import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {VscSearchFuzzy} from 'react-icons/vsc'
import {FiShoppingCart} from 'react-icons/fi'
import {BiSolidBookBookmark} from 'react-icons/bi'

import './header.scss';

import {Avatar, Badge, Divider, Drawer, Dropdown, Popover, Space, message } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { callLogoutOut } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import ManagerAccount from "../A/ManagerAccount";

const Header = ({searchTerm, setSearchTerm}) => {

    // const [searchTerm, setSearchTerm] = useState("")

    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.carts)

    // const [openManager, setOpenManager] = useState(false)

    const [isManagerAccountOpen, setIsManagerAccountOpen] = useState(false);

    const openManagerAccountModal = () => {
        setIsManagerAccountOpen(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        // // Tải lại trang
        // window.location.reload(true);
        navigate('/login')
        message.success('Đăng xuất thành công');

    }

    // const res = await callLogoutOut();
    // if (res && res.data) {
    //     dispatch(doLogoutAction());
    //     message.success('Đăng xuất thành công');
    //     navigate('/')
    // }
    let items = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={openManagerAccountModal}>
                Quản lý tài khoản
                </label>,
            key: 'account',
        },
        {
            label: <label >
                    <Link to="/history" style={{ cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                        Lịch sử mua hàng
                    </Link>
                    </label>,
            key: 'order',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];
    if(user?.role === 'ADMIN'){
        items.unshift({
            label:<Link to='/admin'>Trang quản trị</Link>,
            key: 'admin'
        })
    }

    // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;
    const urlAvatar = user?.avatar;

    const contentPopover = () =>{
        return(
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {/* diff from here */}
                    {carts?.map((book, index) =>{
                        return(
                            <div className="book" key={`book-${index}`}>
                                {/* <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} /> */}
                            
                                <img src={book?.detail?.thumnail} alt="" />
                                <div>{book?.detail?.maintext}</div>
                                <div className="price">
                                    {new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(book?.detail?.price) ?? 0}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div >
                    <Link to ="/order">
                        <button className="pop-cart-footer">Xem giỏ hàng</button>
                    </Link>
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
                                <Link to="/" style={{textDecoration: "none"}}>
                                    <BiSolidBookBookmark className='rotate icon-react' /> Website bán sách
                                </Link>
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                                value={searchTerm}
                                onChange={handleSearch}
                                
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
                                            <Avatar src={urlAvatar}/>
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
            <ManagerAccount
                isModalOpen={isManagerAccountOpen}
                setIsModalOpen={setIsManagerAccountOpen}
            />
        </>
    )
}

export default Header;