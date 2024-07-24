import {ThemesType} from '../../src/context/ThemeProvider';

export const changeCSSVariables = (theme: ThemesType) => {
    const root = document.querySelector(':root') as HTMLElement;
    const cssVariables = ['text-color-header', 'background-color-header', 'background-color-navbar', 'background-color-main', 'background-color-button', 'text-color-button', 'hover-background-color-button']
    cssVariables.forEach(element => {
        root.style.setProperty(`--theme-default-${element}`, `var(--theme-${theme}-${element}`)
    })
}

// способ для одного-двух изменений норм
/*    if(root){
       root.style.setProperty("--theme-default-text-color-header", `var(--theme-${theme}-text)`)
       root.style.setProperty("--theme-default-background-color-header", `var(--theme-${theme}-background-color-header`)
    }*/