import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sideBarReducer from './sideBarReducer';
import usersReducer from './usersReducer';
import authReducer from './auth-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {AllActionTypes} from '../redux/store';

// наши все редьюсеры нужно склеить в кучу(в объект). Этот объект надо вопринимать как наш Стейт, архитект похожа на наш старый store._state
// сейчас все стейты расписахы по иниц стейтам в редьюсорах
export const rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sideBar: sideBarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer
    }
)

// createStore создает хранилище (Стор) одной командой, под копотом там создалось содержимое store. Там и _state, dispatch(), _subscriber(), getState() создались сами.
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootSTateType = ReturnType<typeof rootReducer> // типизация склеенных стейтов из редьюсеров
export type AppThunk<ReturnType=void> =ThunkAction<ReturnType,AppRootSTateType, unknown, AllActionTypes >
export type StoreType = typeof store // типизация всего Стора: тут и стейт и функции:диспач, сабскрайб и тд
export default store


// @ts-ignore
window.store = store; // созд глоб переменную в window, присвоили ей значение store. теперь можно в Ф12 обращаться и смотреть Стор


