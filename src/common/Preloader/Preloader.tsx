import React from "react";
import preloader from '../../images/loader.gif'
import s from './PreloaderStyle.module.scss'

export const Preloader = () => {
    return (
        <div className={s.preloader}>
            <div>
                <img width={100} src={preloader} alt="Preloader"/>
            </div>
        </div>
    )
}