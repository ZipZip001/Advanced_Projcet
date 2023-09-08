import React from 'react';
import { Button, Result } from 'antd';


const NotPermitted = () => {
    return(
        <Result
            status="403"
            title="403"
            subTitle="Bạn không có quyền truy cập vào trang web này"
            extra={<Button type="primary">Về trang chủ</Button>}
        />
    )
}

export default NotPermitted;