import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
});

export const userAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unfollow(id:number){
        return instance.delete(`/follow/${id}`)
    },
    follow(id:number){
        return instance.post(`/follow/${id}`)
    }
}