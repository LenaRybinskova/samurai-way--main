import React from 'react';
import s from './ProfilInfo.module.css'


export const ProfileInfo = () => {
    return (
        <div >
            <div>
                <img
                    src="https://mobimg.b-cdn.net/v3/fetch/fe/fe9778a706308a25d2e6143e7bce5207.jpeg" alt=""/>
            </div>
            <div className={s.descriptionBlock}>ava+description</div>
        </div>
    )
}
