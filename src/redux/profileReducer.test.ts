import profileReducer, {
    addPostAC,
    deletePostAC,
    PostType,
    ProfilePageType,
    ResponseAPIProfileType
} from '../redux/profileReducer';


//1 start data
let state: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 0}
    ] as PostType[],
    newPostText: 'IT-kamasutra',
    profileStatus: '',
    profile: {
        userId: 30404,
        lookingForAJob: true,
        lookingForAJobDescription: '11',
        fullName: '11',
        contacts: {
            github: '11',
            vk: '11',
            facebook: '11',
            instagram: '11',
            twitter: '11',
            website: '11',
            youtube: '11',
            mainLink: '11'
        },
        photos: {
            small: '11',
            large: '11'
        }
    } as ResponseAPIProfileType,
    friends: []
}

it('new post should be added', () => {

    //2 actions
    const newState = profileReducer(state, addPostAC('new post'))

    //3. expectation
    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {

    //2 actions
    const newState = profileReducer(state, addPostAC('new post'))

    //3. expectation
    expect(newState.posts[2].message).toBe('new post')
})

it('after deleting length of message should be decrement', () => {

    //2 actions
    const newState = profileReducer(state, deletePostAC(1))

    //3. expectation
    expect(newState.posts.length).toBe(1)
})

it('after deleting length shouldn`t be decrement if id is incorrect', () => {

    //2 actions
    const newState = profileReducer(state, deletePostAC(1000))

    //3. expectation
    expect(newState.posts.length).toBe(2) // сколько было, столько и осталось
})