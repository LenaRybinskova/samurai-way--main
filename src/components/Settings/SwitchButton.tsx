import React, {FC, useContext} from 'react';
import {Switch} from 'antd';
import {THEME_DARK, THEME_LIGHT, ThemeContext} from '../../context/ThemeProvider';

export type SwitchButtonType = {}

const style = {
    backgroundColor: "grey"
};


export const SwitchButton: FC<SwitchButtonType> = () => {
    const theme = useContext(ThemeContext)

    const onChange = (checked: boolean) => {
        checked
            ? theme?.change(THEME_LIGHT)
            : theme?.change(THEME_DARK)
    };

    return (
        <Switch defaultChecked={theme?.theme===THEME_LIGHT && true} onChange={onChange} style={style}/>
    )
}
