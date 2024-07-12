import React, {useRef} from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
import {MyPostsContainerPropsType} from './MyPostsContainer';
import AddNewPost, {InputFormType} from '../AddNewPost/AddNewPost';
import {useSelector} from 'react-redux';
import {AppRootSTateType} from '../../../redux/reduxStore';
import {useParams} from 'react-router-dom';
import Subscriber from '../../Subscribers/Subscriber';


// вариант мемоизации функц компоненты:
//React.memo ХОК
export const MyPosts = React.memo((props: MyPostsContainerPropsType) => {
    const currentProfilePhoto = useSelector<AppRootSTateType, any>(state => state.profilePage.profile?.photos.small)
    let postsElements = props.posts.map(p => <Post
        key={p.id}
        message={p.message}
        likesCount={p.likesCount}
        currentProfilePhoto={currentProfilePhoto}/>)



    const ownAccountId = useSelector<AppRootSTateType, string | null>(state => state.auth.userId)
    const currentProfileId = useParams<{ userId: string }>()
    console.log('currentProfileId', currentProfileId)

    const addPost = (data: InputFormType) => {
        props.addPost(data.newPostText)
    }


    return (
        <div className={s.postsBlock}>
            <h3 className={s.postsBlockTitle}>My posts</h3>
            {<AddNewPost onSubmit={addPost}/>}
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

/*
// вариант мемоизации для классовой компоненты: либо экстендиться от PureComponent или самост указать метод shouldComponentUpdate
/!*!//PureComponent делает за нас эту проверку в shouldComponentUpdate
// цепочка наследования такая: Component -PureComponent - MyPosts
export class MyPosts extends React.PureComponent<MyPostsContainerPropsType> {

    /!*    shouldComponentUpdate(nextProps: Readonly<MyPostsContainerPropsType>, nextState: Readonly<{}>, nextContext: any): boolean {
            // пропсы новые пришли и стейт изменился - ТРУ -Ререндер компоненты
            return nextProps != this.props  ||  nextState != this.state // если пропсы нов не равны старым ТРУ, то будет ререндер
        }*!/

    render() {

        let postsElements = this.props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

        const addPost = (data: InputFormType) => {
            console.log('text ', data)
            this.props.addPost(data.newPostText)
        }

        return (
            <div className={s.postsBlock}><h3>My posts</h3>
                <div>
                    <AddNewPost onSubmit={addPost}/>
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        )
    }
}*!/
*/


/*   //1 вариант
    const addPost = () => {
            alert(newPostElement.current?.value) // если вдруг такой ссылки на ТексЭрия не будет и Реакт вернет null undefined и не будет брать value
    }

    //2 вариант
    const addPost2 = () => {
        if(newPostElement.current)
        alert(newPostElement.current.value)
    }

    //3 вариант
    const addPost3 = () => {
            alert(newPostElement.current && newPostElement.current.value)
    }*/


/*    const newPostElement = React.createRef<HTMLTextAreaElement>()*/ // теперь через евент проще сделать, чем вещать хук реф