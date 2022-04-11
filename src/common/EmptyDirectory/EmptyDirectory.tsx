import React from "react";
import s from './EmptyStyle.module.scss'
import EmptyIco from '../../images/emptyBox.png'
import {Link} from "react-router-dom";
type PropsType={
    directory:string
}
export const EmptyDirectory=(props:PropsType)=>{

    return(
        <div className={s.emptyPage}>
            <div>
                <img width={200} src={EmptyIco} alt="Empty"/>
                <h1>Your {props.directory} is currently empty</h1>
                <Link to={'/category'}>
                    <button>Return to shop</button>
                </Link>
            </div>
        </div>
    )
}