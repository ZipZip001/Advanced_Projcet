import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Result
        status="404"
        title="404"
        subTitle="Trang web của bạn không được tìm thấy."
        extra={<Button type="primary"
            onClick = {() => navigate('/')}
        >Back Home</Button>}
      />
    )

}

export default NotFound;