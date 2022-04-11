import React, {useState} from "react";
import s from './productStyel.module.scss'
import cart from './../../images/cart.png'
import heart from './../../images/heart.png'
import heartActive from './../../images/heartActive.png'
import {useDispatch} from "react-redux";
import {addItemInCart, addWish, removeWish} from "../../redux/slices/localDataSlice";
import {Link} from "react-router-dom";


type PropsType = {
    title: string
    img: string
    tag: string
    price: string
    id: number
    isWish: boolean
    count: number
}
export type wishIdType = {
    id: number
}
export const Product = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const [isActive, setActive] = useState<boolean>(true)

    const buy = () => {
        if (props.count === 0) {
            dispatch(addItemInCart({id: props.id, count: 1}))
        }
        setActive(false)
    }

    const increment = () => {
        dispatch(addItemInCart({id: props.id, count: props.count + 1}))
    }

    const dicrement = () => {
        const count = props.count - 1

        if (count > 0) {
            dispatch(addItemInCart({id: props.id, count: count}))
        } else if (props.count - 1 === 0) {
            setActive(true)
        }
    }

    const onClickWish = (id: number) => {
        if (!props.isWish) {
            dispatch(addWish({id}))
        } else dispatch(removeWish({wishListId: id}))
    }

    return (
        <div className={s.productBox}>
            <div className={s.heroSection}>
                <img width={20} className={s.wishAdd}
                     src={props.isWish ? heartActive : heart} alt="I wish"
                     onClick={() => onClickWish(props.id)}
                />
                <Link to={`/product/${props.id}`}>
                    <img className={s.heroImg} width={240} src={props.img} alt={props.title}/>
                </Link>
            </div>
            <div className={s.detail}>
                <Link to={`/product/${props.id}`}>
                    <h1 className={s.heroText}>{props.title}</h1>
                </Link>
                <Link to={`/product/${props.id}`}>
                    <p className={s.tag}>{props.tag}</p>
                </Link>
                <span className={s.price}>${props.price}</span>
                {isActive ?
                    <div className={s.buy}
                         onClick={() => buy()}
                    >
                        <img width={16} height={16} src={cart} alt="Buy"
                        />
                        <span>Add to cart</span>
                    </div>
                    :
                    <div className={s.counter}>
                        <div className={s.controller} onClick={() => dicrement()}>
                            -
                        </div>
                        <div className={s.count}>{props.count}</div>
                        <div className={s.controller} onClick={() => increment()}>
                            +
                        </div>
                    </div>
                }
            </div>
        </div>
    )
})