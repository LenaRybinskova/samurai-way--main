import axios from 'axios';
import {ObtainedFormType} from '../components/Profile/ProfileInfo/ProfileInfo';
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:{
        "API-KEY":"7671d79b-77ef-4e89-9c24-3444848368f5"
    },
});

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`) // возвр Id, email, loggin если кука есть
    },
    login(dataLogin: LoginType) {
        return instance.post(`/auth/login`, dataLogin)
    },
    logout() {
        return instance.delete(`/auth/login`)
    }
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number, friend=false) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}&term=${" "}&friend=${friend}`).then(res => res.data)
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
    },
    saveProfile(profile: ObtainedFormType){
      return  instance.put("/profile", profile)
    }

}

export const securityAPI={
    getCaptcha(){
        return instance.get("security/get-captcha-url")
    }
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string | null
}