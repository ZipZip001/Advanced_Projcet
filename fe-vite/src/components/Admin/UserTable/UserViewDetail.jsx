import React, { useState } from 'react';
import { Button, Drawer, Radio, Space, Descriptions, Badge  } from 'antd';
import moment from 'moment/moment';

const UserViewDetail = (props) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  // const [dataViewDetail, setDataViewDetail] = useState();
  const {openViewDetail, dataViewDetail} = props;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  // const fetchUser = async (searchFilter) =>{
  //   setIsLoading(true)

  //   const res = await callFetchListUser(query);
  //   if (res && res.data) {
  //       setDataViewDetail(res.data.result)
  //       console.log('dataViewDetail:', dataViewDetail);
  //   }
  //   setIsLoading(false);
  // }



  return (
    <>
      <Drawer
        title="Xem chi tiết người dùng"
        width={"50vm"}
        // placement={placement}
        // closable={false}
        onClose={onClose}
        open={openViewDetail}
        // key={placement}
      >
          <Descriptions
                title="Thông tin người dùng"
                bordered
                column={2}
                >
                <Descriptions.Item label="Id"> {dataViewDetail?._id}</Descriptions.Item> 
                <Descriptions.Item label="Họ tên"> {dataViewDetail?.fullName}</Descriptions.Item> 
                <Descriptions.Item label="Eamil"> {dataViewDetail?.email}</Descriptions.Item> 
                <Descriptions.Item label="Số điện thoại"> {dataViewDetail?.phone}</Descriptions.Item> 

                <Descriptions.Item label= "Role" span={2}> 
                    <Badge status="processing" text={dataViewDetail?.role}/>
                </Descriptions.Item> 
                <Descriptions.Item label= "Create At" > 
                    {moment(dataViewDetail?.createAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item> 
                <Descriptions.Item label= "Updated At" > 
                    {moment(dataViewDetail?.updateAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item> 
            </Descriptions>
      </Drawer>
    </>
  );
};
export default UserViewDetail;