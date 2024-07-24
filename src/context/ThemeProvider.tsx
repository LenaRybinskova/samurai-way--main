import React, {FC, ReactNode, useState} from 'react';
import {changeCSSVariables} from '../utils/change-CSS-variables';


export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export type ThemesType = 'light' | 'dark'

type ThemeContextType = {
    theme: ThemesType;
    change: (name: ThemesType) => void;
};
export type ThemeProviderType = {
    children: ReactNode
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<ThemeProviderType> = ({children, ...props}) => {

    const [theme, setTheme] = useState<ThemesType>('light')

    const change = (name: ThemesType) => {
        setTheme(name)
        changeCSSVariables(name)
    }

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            change: change
        }} {...props}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider


