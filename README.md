# 43: контейнерная компонента MyPostsContainer и презетационная компонента MyPosts

Задача контейнерной компоненты быть оберткой и работать с Стор и в презетационную(дочернюю) передавать нужные данные Пропсами( значения и коллбеки)
Контейнерной MyPostsContainer передали Стор, она в себе разобрала на части и передала презентационной MyPosts. 
В контейнерную компонену кладем функции с диспатчем, а в контейнерную передаем эти функ как коллбеки


# 42: redux

// наши все редьюсеры нужно склеить в кучу(в объект). Этот объект надо вопринимать как наш Стейт, архитект похожа на наш старый store._state
// сейчас все стейты расписаны по иниц стейтам в редьюсорах
export const rootReducer = combineReducers(
{
profilePage: profileReducer,
dialogsPage: dialogsReducer,
sideBar: sideBarReducer
}
)

// createStore создает хранилище (Стор) одной командой, под копотом там создалось содержимое store. Там и _state, dispatch(), _subscriber(), getState() создались сами.
export const store = createStore(rootReducer);

export type AppRootSTateType = ReturnType<typeof rootReducer> // типизация склеенных стейтов из редьюсеров
export type StoreType = typeof store // типизация всего Стора: тут и стейт и функции:диспач, сабскрайб и тд
export default store



# 41: Reducer (почти redux)

Тиизация для всех action для всех reducer должны быть одна (AllActionTypes), иначе ошибка. Не надо было отделять экшентайпы для диалогов и профайла отдельно.

export type AllActionTypes = UpdateNewMessageBodyACType | SendMessageAC | AddPostActionType | UpdateNewPostTextActionType


# 40: добавление нового сообщения в Диалоге

Как лучше передать в компоненту Dialogs пропсы: весь store или отдельно state и dispatch ?

Лучше передать отдельно state и dispatch, тк чем меньше лишнего в компоненту передаем, тем лучше.



# Hello, Самурай! 

Друзья, для вас мы специально подготовили этот репозиторий. Здесь вы можете взять полностью подготовленный проект для "Пути самурая", где установлены ВСЕ библиотеки нужных версий.
В процессе прохождения видео-уроков вам не нужно устанавливать пакеты. Просто провейряйте, что библиотека есть в package.json.
В случае, если ее вы не найдете или заметите неправильную ее работу (отличную от Диминой версии), 
просим вас написать об этом в Telegram `Валере Сафронову (@safronman)` или `Марго (@margokomilfo)`.

Успехов и позитивного настроения, ребята!!! Летим!🚀🚀🚀

В этом стартовом проекте установлены следующие библиотеки

- **antd** 
- **axios** 
- **classnames**
- **formik**
- **gh-pages**
- **jest**
- **react** and **@types/react**
- **react-dom** and **@types/react-dom**
- **react-redux** and **@types/react-redux**
- **react-router-dom** and **@types/react-router-dom**
- **react-scripts** 
- **react-test-renderer** and **@types/react-test-renderer**
- **redux**
- **redux-form** and **@types/redux-form**
- **redux-thunk**
- **reselect**
- **typescript** 
- **uuid** and **@types/uuid**

После git clone 'link' установите все зависимости из package.json:
### `yarn`

а потом запустите проект:
### `yarn start`


<hr>
To learn React, check out the [React documentation](https://reactjs.org/).
