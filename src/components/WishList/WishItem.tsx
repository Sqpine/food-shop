import React from "react";
import {Link} from "react-router-dom";
import {CategoriesType, ImageType} from "../../redux/slices/productSlice";
import s from './wishPageStyle.module.scss'
import cart from "../../images/cart.png";
import {useDispatch} from "react-redux";
import {removeWish} from "../../redux/slices/localDataSlice";

type PropsType = {
    wishProduct: {
        id: number
        name: string
        slug?: string
        description?: string
        short_description?: string
        price: string
        images: ImageType[]
        categories?: CategoriesType[]
    }
}
export const WishItem = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    const remove = (id: number) => {
        dispatch(removeWish({wishListId: id}))
    }

    return (
        <>
            <div className={s.wishItemDetail}>
                <div className={s.productInfo}>
                    <button className={s.remove}
                            title="Remove"
                            onClick={() => remove(props.wishProduct.id)}
                    >✖
                    </button>
                    <Link className={s.item} to={`/product/${props.wishProduct.id}`}>
                        <img width={70} height={70} src={props.wishProduct.images[0].src} alt={props.wishProduct.name}/>
                        <h1 className={s.productName}>{props.wishProduct.name}</h1>
                    </Link>
                </div>
                <p>{props.wishProduct.price}$</p>
                <Link to={`/product/${props.wishProduct.id}`}>
                    <div className={s.buy}>
                        <img width={16} height={16} src={cart} alt="Buy"/>
                        <span>Add to cart</span>
                    </div>
                </Link>
            </div>
            <hr/>
        </>
    )
})