import React from 'react';
import {StoreType} from './redux/reduxStore';

export type ProviderType={
    store:StoreType
    children:React.ReactNode
}
/*export const StoreContext = React.createContext <StoreType | null>( null)*/
 const StoreContext = React.createContext({} as StoreType) // СОЗДАЛИ КОНТЕКСТ

 const Provider = (props:ProviderType) => {
    return <StoreContext.Provider value = {props.store}>{props.children}</StoreContext.Provider> // СОЗДАЛИ ОБЕРТКУ ДЛЯ ПРОПИХИВАНИЯ КОНТЕКСТА
}