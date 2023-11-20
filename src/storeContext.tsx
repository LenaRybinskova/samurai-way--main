import React, {ReactChildren} from 'react';
import store, {StoreType} from './redux/reduxStore';
import App from './App';

export type ProviderType={
    store:StoreType
    children:React.ReactNode
}
/*export const StoreContext = React.createContext <StoreType | null>( null)*/
export const StoreContext = React.createContext({} as StoreType) // СОЗДАЛИ КОНТЕКСТ

export const Provider = (props:ProviderType) => {
    return <StoreContext.Provider value = {props.store}>{props.children}</StoreContext.Provider> // СОЗДАЛИ ОБЕРТКУ ДЛЯ ПРОПИХИВАНИЯ КОНТЕКСТА
}