## В проекте использовались библиотеки:
- React
- Redux
- React-Redux
- Redux-thunk
- React-router-dom
- Axios
- Formik
- Moment
- React-hot-toast
- Jest






### 74: componentDidUpdate()

метод жизн цикла, в которых приходят 2 объекта - предыдущие пропсы и стейт.
В нем можно исп setState, но только в условии - иначе будет зацикленность апдейтов.
componentDidUpdate тоже вызывается после render()

###70: compose()()

функция, в которую передаем все контейн компоненты(функции) и целевую компоненту.

### 69: HOC

НОС - это функ, принимающая компоненту и возвращающая унифицированную контейн компоненту.

Чтобы в кажд компоненте не делать проверку на isAuth, эту проверку можно делать в НОС, в которую передавать презент компоненту и получать из НОС контейн компоненту.

```
export function WithAuthRedirect <T>(Component: React.ComponentType<T>)  {

    const RedirectComponent=(props:MstpType)=> {
        let {isAuth, ...restProps}=props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    //обернули коннектом, чтобы получть из Стора isAuth
    let ConnectRedirectComponent = connect(mstp)(RedirectComponent)

    return ConnectRedirectComponent
};
```

### 66: THUNK

THUNK - функ, принимающая параметрами dispatch и getStore(), в которой выполняются асинхр действия( запрос на сервер, напр) и диспатчатся экшены в редьюсор.
НА UI только диспачим. Чтобы Стор понимал диспач не только АС но и ТС, надо подключить applyMiddleware(thunk))


### 60: withRouter, props.match.params

на UI щекл на аву => в текущий УРЛ добавился Ид юзера => на измен текущий УРЛ сработал  <Route exact path={'/profile/:userId?'} render={() => <ProfileContainer/>}/> => начала рендериться компонента ProfileContainer => вернулся базовый JSX => вызов componentDidMount(), в нем вытащили из текущего УРЛ Ид юзера => get запрос по этому Ид на сервер=> диспач с Стор Редакс новых данных профиля => mstp срабатывает на обновление стейта => передает в компоненту Профайл новые пропсы и Профайл ререндериться.

### 59: profile page, ajax, api

<Profile {...this.props} profile={this.props.profile}/>

{...this.props} - это транзитные пропсы, они пойдут дальше дочерним компонентам, в Profile они неиспользуются и типиз их не надо
profile={this.props.profile - это явные пропсы для Profile, они там и используются, поэтому обязательно типизируем.


### 58: mstd

раньше передавали в функ connect(ХОК) две функции и компоненту.
Mstp и mstd возвращают каждая свой объект. КОннект из них формирует единый объект  - пропс.
Вместо mstd можно сформировать самостоятельно объект и передать в коннект {follow:followAC}

### 55: pagination, постраничный вывод пользователей

### 54: life cycle methods, componentDidMount

side effects делаем в функции componentDidMount()

### 53: классовая компонента
конструктор - функция, создает пустой объект и определяет свойства объекта через this.свойство

супер - функ конструктор класса(родителя) React.Component

класс обязательно имеет метор render, который возвращает JSX

пропсов, как таковых нет, есть свойства объекта this (this.props.callback, например )

### 51: "side effect" в компоненте Users

Users можно назвать чистой функ, тк мы сайд эффект (гет запрос) перенесли в функ обработчик onClick

### 50: users API

DAL - Data Access Layer это прослойка,которая бетет на себя мапинг данных с сервера и преобразует их в тот формат,
который нам нужен.

Последовательность:

1. как организовать BLL (хранение данных)
2. Route
3. Reducer
4. ветка в storeRedux
5. Контейнерная компонента с помощью connect
6. Презентационная компонента + обработчики на кнопки

### 46: иисправлена работа редьюсоров, работают иммутабельно

### 45:connect, mapStateToProps, mapDispatchToProps (РЕДЬЮСОРЫ РАБОТАЮТ НЕ ПРАВИЛЬНО-Мутабельно)

Функция connect принимает две функции mapStateToProps, mapDispatchToProps и передает презентационной компонене все
данные и ВОЗВРАЩАЕТ контейнерную компоненту.

mapStateToProps функ возвращает ОБЪЕКТ с свойствами стейта

mapDispatchToProps функ возвращает ОБЪЕКТ с коллбеками(с диспатчами)

mapStateToProps и mapDispatchToProps надо типизировать на вход и выход

### 44: Context API

Кентекст это как бы глобальная обл видимости. Этот контекст можно объявить и положить туда какие то данные и все
дочерние компоненты будут иметь доступ к этому контексту.

Объявляем контекст через StoreContext = React.createContext({} as StoreType)

Оборачиваем "родительскую" компоненту StoreContext.Provider value={store}><App/></StoreContext.Provider>*/}

Контейнерную компоненту делаем Потребителем Контекста <

```
export const MyPostsContainer = (props: MyPostsType) => {
    return (
        <StoreContext.Consumer>{
            (store:StoreType)=> {
                let state = store.getState()

                const addPost = () => {
                    store.dispatch(addPostAC())
                }

                const onPostChange = (text: string) => {
                    const action = updateNewPostTextAC(text)
                   store.dispatch(action)
                }
                return <MyPosts
                    updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    )
}
```

### 43: контейнерная компонента MyPostsContainer и презетационная компонента MyPosts

Задача контейнерной компоненты быть оберткой и работать с Стор и в презетационную(дочернюю) передавать нужные данные
Пропсами( значения и коллбеки)
Контейнерной MyPostsContainer передали Стор, она в себе разобрала на части и передала презентационной MyPosts.
В контейнерную компонену кладем функции с диспатчем, а в контейнерную передаем эти функ как коллбеки

### 42: redux

// наши все редьюсеры нужно склеить в кучу(в объект). Этот объект надо вопринимать как наш Стейт, архитект похожа на наш
старый store._state
// сейчас все стейты расписаны по иниц стейтам в редьюсорах
export const rootReducer = combineReducers(
{
profilePage: profileReducer,
dialogsPage: dialogsReducer,
sideBar: sideBarReducer
}
)

// createStore создает хранилище (Стор) одной командой, под копотом там создалось содержимое store. Там и _state,
dispatch(), _subscriber(), getState() создались сами.
export const store = createStore(rootReducer);

export type AppRootSTateType = ReturnType<typeof rootReducer> // типизация склеенных стейтов из редьюсеров
export type StoreType = typeof store // типизация всего Стора: тут и стейт и функции:диспач, сабскрайб и тд
export default store

### 41: Reducer (почти redux)

Тиизация для всех action для всех reducer должны быть одна (AllActionTypes), иначе ошибка. Не надо было отделять
экшентайпы для диалогов и профайла отдельно.

export type AllActionTypes = UpdateNewMessageBodyACType | SendMessageAC | AddPostActionType |
UpdateNewPostTextActionType

### 40: добавление нового сообщения в Диалоге

Как лучше передать в компоненту Dialogs пропсы: весь store или отдельно state и dispatch ?

Лучше передать отдельно state и dispatch, тк чем меньше лишнего в компоненту передаем, тем лучше.

