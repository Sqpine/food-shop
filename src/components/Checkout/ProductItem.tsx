import React from "react";
import s from './checkoutPageStyle.module.scss'
import {Link} from "react-router-dom";
type PropsType={
    name:string
    count:number
    subtotal:number
    description:string
    id:number
}
export const ProductItem=(props:PropsType)=>{
    return(
        <div>
            <div>
                <Link to={`/product/${props.id}`}>
                    <h1 className={s.productName}>{props.count} x {props.name}</h1>
                </Link>
                <p>{props.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>
            <div>
                <p>${props.subtotal}</p>
            </div>
            <hr/>
        </div>
    )
}