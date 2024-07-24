import {Dispatch} from 'redux';
import {UserType} from '../redux/usersReducer';
import {userAPI} from '../../src/api/api';
import {handleError} from '../utils/handleError';


const SET_FRIENDS = 'samurai-network/profile/SET_FRIENDS'

const initialState = {
    friends: [] as UserType[],
    totalCountFriend: null,
    currentPage: 1,
    pageSize: 3,
}

export type InitialState = typeof initialState

export const subscribersReducer = (state: InitialState = initialState, action: SetFriendsType): InitialState => {
    switch (action.type) {
        case SET_FRIENDS: {
            return {...state, friends: action.friends}
        }
        default:
            return state
    }
}

export type SetFriendsType = ReturnType<typeof setFriends>

export const setFriends = (friends: UserType[]) => {
    return {type: SET_FRIENDS, friends} as const
}

// TC
export const getSubscribersTC = (currentPage: number, pageSize: number, friend: boolean) => async (dispatch: Dispatch) => {
    try {
        const res = await userAPI.getUsers(currentPage, pageSize, friend)
        dispatch(setFriends(res.items))
    } catch (e) {
        handleError(e, dispatch)
    }
}
export default subscribersReducer;


