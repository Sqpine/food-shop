import React from "react";
import {Link} from "react-router-dom";
import s from './categoryStyle.module.scss'

type PropsType = {
    img: string
    name: string
    id: number
    slug: string
}
export const Category = (props: PropsType) => {

    return (
        <Link to={`category/${props.slug}`}>
            <div className={s.category}>
                <div>
                    <img width={46} height={46} src={props.img} alt={props.name}/>
                </div>
                <div>
                    <span>{props.name}</span>
                </div>
            </div>
        </Link>
    )
}