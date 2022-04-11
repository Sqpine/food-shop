import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProductsApi} from "../../API/woocommerce-get-prodructs";
import {Preloader} from "../../common/Preloader/Preloader";
import s from './productPageStyle.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addItemInCart, addWish, CartType, removeWish, WishListType} from "../../redux/slices/localDataSlice";
import {RootState} from "../../redux/store";
import cartIco from "../../images/cart.png";
import activeHeart from '../../images/heartActive.png'
import unActiveHeart from '../../images/heart.png'
import {ProductType} from "../../redux/slices/productSlice";

type LocalDataType = {
    cart: CartType[]
    wishList: WishListType[]
}
export const ProductPage = () => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const [count, setCount] = useState<number>(1)
    const [isWish, setIsWish] = useState(false)
    const [product, setProduct] = useState<ProductType | null>(null)

    const {cart, wishList} = useSelector<RootState, LocalDataType>(state => state.LocalData)

    useEffect(() => {
        if (productId) {
            ProductsApi.getProductById(productId).then(promise => {
                if (promise.status === 200) {
                    setProduct(promise.data)
                    const isWish = wishList.findIndex(e => e.id === promise.data.id) !== -1
                    setIsWish(isWish)
                    const index = cart.findIndex(e => e.id === promise.data.id)
                    if (index > -1) {
                        setCount(cart[index].count)
                    }
                }
            })
        }
    }, [productId])

    useEffect(() => {
        if (product?.id) {
            const isWish = wishList.findIndex(list => list.id === product?.id) !== -1
            setIsWish(isWish)
        }
    }, [wishList, count])

    const buy = () => {
        if (product?.id) {
            dispatch(addItemInCart({id: product.id, count: count}))
        }
    }

    const Increment = () => {
        setCount(prevState => prevState + 1)
    }

    const Decrement = () => {
        if (count - 1 !== 0) {
            setCount(prevState => prevState - 1)
        }
    }
    const onClickWish = (id: number) => {
        if (!isWish) {
            dispatch(addWish({id}))
        } else dispatch(removeWish({wishListId: id}))
    }

    if (!product) {
        return <Preloader/>
    }
    return (
        <div className={s.product}>
            <div className={s.heroImg}>
                <img src={product.images[0].src} alt="Product"/>
            </div>
            <div className={s.productContent}>
                <h1 className={s.heroText}>{product.name}</h1>
                <p className={s.description}>
                    {product.short_description.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
                <span className={s.price}>${product.price}</span>
                <div className={s.panel}>
                    <div className={s.counter}>
                        <div className={s.button} onClick={() => Decrement()}>
                            -
                        </div>
                        <div>{count}</div>
                        <div className={s.button} onClick={() => Increment()}>
                            +
                        </div>
                    </div>
                    <div className={s.buy}
                         onClick={() => buy()}
                    >
                        <img width={16} height={16} src={cartIco} alt="Buy"/>
                        <span>Add to cart</span>
                    </div>
                    <div className={s.wish}>
                        <img width={24}
                             src={isWish ? activeHeart : unActiveHeart}
                             onClick={() => onClickWish(product.id)}
                             alt=""
                        />
                    </div>
                </div>
                <p className={s.description}>
                    Category:{product.categories[0].name}
                </p>
            </div>
        </div>
    )
}