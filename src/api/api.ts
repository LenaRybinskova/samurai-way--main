import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:{
        "API-KEY":"3d3b9155-6649-42ea-90b9-cf4f2be8bdbb"
    },
});

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(dataLogin: LoginType) {
        return instance.post(`/auth/login`, dataLogin)
    },
    logout() {
        return instance.delete(`/auth/login`)
    }
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`/follow/${id}`)
    },
    follow(id: number) {
        return instance.post(`/follow/${id}`)
    },
    // сделали аналог backward compatibility
    getProfile(userId: number) {
        console.warn('userAPI.getProfile() method is outdated, use profileAPI.getProfile()')
        return profileAPI.getProfile(userId)
    },

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`/profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status:status})
    },
    savePhoto(file:string | Blob){
        const formData=new FormData()
        formData.append("image",file )
        return instance.put('/profile/photo', formData, {
            headers:
                {"Content-Type":"multipart/form-data"}
        })
    }
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean
}