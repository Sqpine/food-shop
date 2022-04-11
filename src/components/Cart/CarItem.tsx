import React from "react";
import {useDispatch} from "react-redux";
import s from './cartStyle.module.scss'
import {Link} from "react-router-dom";
import {addItemInCart, removeItemInCart} from "../../redux/slices/localDataSlice";

type PropsType = {
    index: number
    id: number
    name: string
    img: string
    price: number
    subtotal: number
    count: number
}
export const CarItem = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    const Increment = () => {
        dispatch(addItemInCart({id: props.id, count: props.count + 1}))
    }
    const Decrement = () => {
        const count = props.count - 1
        if (count !== 0) {
            dispatch(addItemInCart({id: props.id, count: count}))
        }
    }

    const Remove = (id: number) => {
        dispatch(removeItemInCart({id}))
    }

    return (
        <>
            <div className={s.cartItemDetail}>
                <div className={s.productInfo}>
                    <button className={s.remove}
                            title="Remove"
                            onClick={() => Remove(props.id)}
                    >✖
                    </button>
                    <Link className={s.item} to={`products/${props.id}`}>
                        <img width={70} height={70} src={props.img} alt={props.name}/>
                        <h1 className={s.productName}>{props.name}</h1>
                    </Link>
                </div>
                <p>{props.price}$</p>
                <div className={s.counter}>
                    <div
                        className={s.button}
                        onClick={() => Increment()}
                    >
                        +
                    </div>
                    <div>{props.count}</div>
                    <div
                        className={s.button}
                        onClick={() => Decrement()}
                    >
                        -
                    </div>
                </div>
                <p className={s.subtotal}>{props.subtotal}$</p>
            </div>
            <hr/>
        </>
    )
})