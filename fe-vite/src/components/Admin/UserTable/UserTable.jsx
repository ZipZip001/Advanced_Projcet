import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callFetchListUser } from '../../../services/api';


const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        fetchUser();
    },[current, pageSize]);

   



    const fetchUser = async () =>{
        const query = `current=${current}&pageSize=${pageSize}`;
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
    }

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
        },
        {
          title: 'Họ tên',
          dataIndex: 'fullName',
          sorter:  true ,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter:  true ,
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          sorter:  true ,
        },
        {
          title: 'Action',
          render: (text, record, index) => {
              return(
                  <>
                      <button>Delete</button>
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
    return (
        <>
            <Table 
                columns={columns} 
                dataSource={listUser} 
                onChange={onChange} 
                rowKey="_id"
                pagination={ 
                    {   
                        current: current, 
                        pageSize: pageSize, 
                        showSizeChanger: true,
                        total: total
                    }
                }
            />;
        </>
    )
}


export default UserTable;