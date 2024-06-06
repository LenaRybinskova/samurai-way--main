import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers:{
        "API-KEY":"cb236820-9aa4-49a0-86c3-cf872a5026ed"
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
    }
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean
}