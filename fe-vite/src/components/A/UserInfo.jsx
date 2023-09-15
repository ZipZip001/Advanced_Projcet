import { message, notification } from "antd";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { callUpdateUserInfo, callUploadAvatar } from "../../services/api";
import { doUpdateUserInfoAction, doUploadAvatarAction } from "../../redux/account/accountSlice";

const UserInfo = () => {

    const user = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
    const [isSubmit, setIsSubmit] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${ user?.avatar}`;

    const handleUploadAvatar = async ({file, onSuccess, onError}) =>{
        const res = await callUploadAvatar(file);
        if(res && res.data){
            const newAvatar = res.data.fileUploaded;
            dispatch(doUploadAvatarAction({avatar: newAvatar}))
            setUserAvatar(newAvatar);
            onSuccess('ok')
        }else{
            onError('Đã có lỗi khi upload file')
        }
    }

    const propsUpload ={
        maxCount: 1,
        mutiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info){
            if(info.file.status !== 'uploading'){

            }if(info.file.status === 'done'){
                message.success(`Upload file thành công`);
            }else if(info.file.status === 'error'){
                message.error(`Upload file thất bại`)
            }
        }
    };
    
    const onFinish = async (values) => {
        const {fullName, phone, _id} = values
        setIsSubmit(true)
        const res = await callUpdateUserInfo (_id, phone, fullName, avatar);

        if(res && res.data){
            //upload redux
            dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName}));
            message.success("Cập nhật thông user thành công");

            //force renew token
            localStorage.removeItem('access_token');
        }else{
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }


}

export default UserInfo