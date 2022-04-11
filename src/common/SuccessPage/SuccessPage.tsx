import React from "react";
import done from "../../images/done.gif";
import s from './SuccessPageStyle.module.scss'

export const SuccessPurchase = () => {
    return (
        <div className={s.success}>
            <div>
                <img width={192} height={192} src={done} alt="Done"/>
                <h1>Your purchase was successful!</h1>
            </div>
        </div>

    )
}