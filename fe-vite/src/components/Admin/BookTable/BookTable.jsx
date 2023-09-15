import React, { useEffect, useState } from 'react';
import { Button, Col, Popconfirm, Table, message, notification } from 'antd';
import {  callFetchListBook } from '../../../services/api';
import InputSearch from './InputSearch';

import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import BookViewDetail from './BookViewDetail';

const BookTable = () => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [dataViewDetail, setDataViewDetail] = useState();

    const [refreshTable, setRefreshTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [sortQuery, setSortQuery] = useState("sort=-updateAt");

    // const [openModalCreate, setOpenModalCreate] = useState(false);
    // const [openModalUpdate, setOpenModalUpdate] = useState(false);
    // const [dataUpdate, setDataUpdate] = useState(null);



    useEffect(() =>{
        fetchBook();
    },[current, pageSize, refreshTable]);

   
    const fetchBook = async (searchFilter) =>{
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if(searchFilter){
            query +=`&${searchFilter}`
        }

        const res = await callFetchListBook(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
          render:(text, record, index) =>{
            return(
                <a href="#" onClick={() =>{
                    setDataViewDetail(record);
                    setOpenViewDetail(true)
                }}>{record._id}
                </a>
            )
          }
        },
        {
          title: 'Tên sách',
          dataIndex: 'mainText',
          sorter:  true ,
        },
        {
          title: 'Tác giả',
          dataIndex: 'author',
          sorter:  true ,
        },
        {
          title: 'Thể lọai',
          dataIndex: 'category',
          sorter:  true ,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter:  true ,
            render: (text, record) => {
                return moment(record.updatedAt).format('DD/MM/YYYY');
            },
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter:  true ,
        },
        {
          title: 'Action',
          width: 150,
          render: (text, record, index) => {
              return(
                  <>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa user"}
                        description={"Bạn có chắc chắn muốn xóa user này ?"}
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone/>
                    </Popconfirm>

                    <EditTwoTone
                        style={{marginLeft: "20px"}}
                        onClick={() => {
                            setOpenModalUpdate(true)
                            setDataUpdate(record);
                        }}
                    >
                    </EditTwoTone>
                  </>
                  
              )
          }
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if(pagination && pagination.current !== current){
            setCurrent(pagination.current)
        }
        if(pagination && pagination.pageSize !== pageSize){
            setPageSize(pagination.pageSize)
            setCurrent(1)
        }
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleDeleteBook = async (userId) =>{
        const res = await callDeleteUser(userId);
        if (res && res.data){
            message.success('Xóa sách thành công');
            fetchBook();
        }else{
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message,
            });
        }
    }


    const handleReload = () => {
        setRefreshTable(!refreshTable); 
    }
    const handleSearch = (query) =>{
        fetchBook(query);  
    }

    // const handleExportData = () =>{
    //     if(listBook.length > 0){
    //         const worksheet = XLSX.utils.json_to_tosheet(listBook)
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook,worksheet, "Sheet1");
    //         XLSX.writeFile(workbook, "ExportUser.csv");
    //     }
    // }

    const renderHeader = () => {
        return(
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Bảng sách</span>
                <span style={{ display: 'flex', gap: 15}}>
                    <Button
                        icon={<ExportOutlined/>}
                        type= "primary"
                        // onClick={() => handleExportData()}
                        >Export
                    </Button>
                    <Button
                        icon={<CloudUploadOutlined/>}
                        type= "primary"
                        >Import
                    </Button>
                    <Button
                        icon={<PlusOutlined/>}
                        type= "primary"
                        onClick={() => setOpenModalCreate(true)}
                        >Thêm mới
                    </Button>
                    <Button
                        onClick={handleReload}
                        icon={<ReloadOutlined/>}
                        >
                    </Button>
                </span>
            </div>
        )
    }


    return (
        <>
            <Col span ={24}>
                <InputSearch 
                    handleSearch={handleSearch}
                />
            </Col>
            <Col span ={24}>
                <Table 
                    title ={renderHeader}

                    columns={columns} 
                    dataSource={listBook} 
                    loading = {isLoading}
                    onChange={onChange} 
                    rowKey="_id"
                    pagination={ 
                        {   
                            current: current, 
                            pageSize: pageSize, 
                            showSizeChanger: true,
                            total: total,

                        }
                    }
                    // key={refreshTable} 
                />
            </Col>   

            <BookViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />



            {/* <UserModalCreate
                openModalCreate = {openModalCreate}
                setOpenModalCreate ={setOpenModalCreate}
                fetchBook={fetchBook}
            />
            

            <UserModalUpdate
                openModalUpdate = {openModalUpdate}
                setOpenModalUpdate ={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                fetchBook={fetchBook}
            /> */}
        </>
    )
}


export default BookTable;