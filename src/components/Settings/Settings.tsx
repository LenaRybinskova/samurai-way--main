import React from 'react';
import {SwitchButton} from '../../components/Settings/SwitchButton';
import s from "../Settings/settings.module.css"

const Settings = () => {


    return (
        <div className={s.settingsContainer}>
            <div>Сменить тему:  <SwitchButton/></div>
            {/*            <div>Сменить язык:<SwitchButton/></div>*/}
        </div>
    );
};

export default Settings;