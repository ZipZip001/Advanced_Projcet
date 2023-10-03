import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {fullName, email, password, phone});
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password});
}

export const fetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

// user Admin
export const callFetchListUser = (query) => {
    return axios.get(`/api/v1/user?${query}`)
}

export const callCreateAUser = (fullName, password, email, phone) => {
    return axios.post(`/api/v1/user`,{fullName, password, email, phone} )
}

export const callUpdateUser = (fullName, _id, phone) => {
    return axios.put(`/api/v1/user`,{fullName, _id, phone} )
}

export const callDeleteUser = ( _id) => {
    return axios.delete(`/api/v1/user/${_id}`)
}


//Book 
export const callFetchCategory = () => {
    return axios.get(`/api/v1/database/category`)
}

export const callFetchListBook = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callFetchListBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}

export const callPlaceOrder = (data) => {
    return axios.post(`/api/v1/order`,{
        ...data
    })
}

export const callHistory = () => {
    return axios.get(`/api/v1/history`)
}

//Avatar
export const callUploadAvatar =(fileImg) =>{
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    })
}

export const callUpdateUserInfo = (_id, phone, fullName, avatar) =>{
    return axios.put(`/api/v1/user`, {
        _id, phone, fullName, avatar
    })
}

export const callUpdatePassword = (email, oldpass, newpass) =>{
    return axios.put(`/api/v1/user/change-password`, {
        email, oldpass, newpass
    })
}


// api outside for books
export const callListBookOut = (query) => {
    return axios.get(`/api/book?${query}`)
}

export const callCategoryOut = () => {
    return axios.get(`/api/category`)
}
export const callFetchListBookByIdOut = (id) => {
    return axios.get(`/api/book/${id}`)
}

export const callCreateABookOut = (thumnail, maintext, category, author, price,quantity) => {
    return axios.post(`/api/book`,{thumnail, maintext, category, author, price,quantity} )
}

export const callUpdateBookOut = (thumnail, maintext, category, author, price,quantity) => {
    return axios.put(`/api/book`,{thumnail, maintext, category, author, price,quantity} )
}

export const callDeleteBookOut = ( id) => {
    return axios.delete(`/api/book/${id}`)
}



// api outside for Login
export const callRegisterOut = (fullName, email, password, phone) => {
    return axios.post('/api/user/register', {fullName, email, password, phone});
}

export const callLoginOut = (email, password) => {
    return axios.post('/api/user/login', { email, password});
}

export const fetchAccountOut = () => {
    return axios.get('/api/user/profile');
}

export const callLogoutOut = () => {
    return axios.post('/api/user/logout')
}


// user Admin Out
export const callFetchListUserOut = (query) => {
    return axios.get(`/api/user?${query}`)
}

export const callCreateAUserOut = (fullName, password, email, phone) => {
    return axios.post(`/api/user`,{fullName, password, email, phone} )
}

export const callUpdateUserOut = (fullName, _id, phone) => {
    return axios.put(`/api/user/${_id}`,{fullName, _id, phone} )
}

export const callDeleteUserOut = ( id) => {
    return axios.delete(`/api/user/${id}`)
}


//order
export const callPlaceOrderOut = (data) => {
    return axios.post(`/api/order`,{
        ...data
    })
}

export const callHistoryOut = () => {
    return axios.get(`/api/history`)
}

export const callFetchListHistoryOut = (query) => {
    return axios.get(`/api/order?${query}`)
}