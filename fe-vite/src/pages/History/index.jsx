import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callHistory } from '../../services/api';
import moment from 'moment/moment';

const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listOrder, setListOrder] = useState([]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    // {
    //   title: 'Tình trạng',
    //   dataIndex: 'phone',
    // },
    {

      title: 'Thời gian',
      dataIndex: 'updatedAt',
      render: (text, record) => {
        return moment(record.updatedAt).format('DD/MM/YYYY');
      },
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalPrice',
    },
    {
      title: 'Chi tiết đơn',
      dataIndex: 'detail',
      render: (text, record) => (
        <ul>
          {record.detail.map((item, index) => (
            <li key={index}>
              <p>Sách: {item.bookName} - Số lượng: {item.quantity} </p>
              {/* <p>ID: {item.id}</p> */}
            </li>
          ))}
        </ul>
      ),
    },

  ];

  const fetchHistory = async () =>{
    setIsLoading(true)
    const res = await callHistory();
    if (res && res.data) {
        setListOrder(res.data)
        console.log('setListOrder:', setListOrder);
    }
    setIsLoading(false);
  }
  useEffect(() =>{
    fetchHistory();
  },[]);

  
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return(
    <>
      <Table columns={columns} dataSource={listOrder} onChange={onChange} />;
    </>
  )
}
export default HistoryPage;