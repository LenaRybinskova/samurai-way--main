import axios from 'axios';
import {ObtainedFormType} from '../components/Profile/ProfileInfo/ProfileInfo';

import {UserType} from '../redux/usersReducer';
import {ProfileResaponseType} from '../redux/profileReducer';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '2c45728a-68be-4862-8b0c-8cd42989c7e6'
    },
});


export const authAPI = {
    authMe() {
        return instance.get<ResponseType<AuthMeType>>(`auth/me`) // возвр Id, email, loggin если кука есть
    },
    login(dataLogin: LoginType) {
        return instance.post<ResponseType<{ userId: number, token: string }>>(`/auth/login`, dataLogin)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number, friend = false) {
        return instance.get<GetUsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}&term=${' '}&friend=${friend}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete<ResponseType>(`/follow/${id}`)
    },
    follow(id: number) {
        return instance.post<ResponseType>(`/follow/${id}`)
    },
    // сделали аналог backward compatibility
    getProfile(userId: number) {
        console.warn('userAPI.getProfile() method is outdated, use profileAPI.getProfile()')
        return profileAPI.getProfile(userId)
    },

}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResaponseType>(`/profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status: status})
    },
    savePhoto(file: string | Blob) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ResponseType<{ photos: { small: string, large: string } }>>('/profile/photo', formData, {
            headers:
                {'Content-Type': 'multipart/form-data'}
        })
    },
    saveProfile(profile: ObtainedFormType) {
        return instance.put('/profile', profile)
    }

}

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}

export type LoginType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string | null
}
export type AuthMeType = {
    id: string | null,
    email: string,
    login: string
}
export type ResponseType<T = {}> = {
    data: T,
    messages: string[],
    resultCode: number,
    fieldsErrors?: []
}

export type GetUsersResponseType = {
    items: UserType[],
    totalCount: number,
    error: null
}