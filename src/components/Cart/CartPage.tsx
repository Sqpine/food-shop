import React, {useEffect, useLayoutEffect} from "react";
import {
    CartItemType,
    GetAllCartProductsThunk,
    RemoveProductThunk,
    UpdateProductsThunk
} from "../../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import s from './cartStyle.module.scss'
import {EmptyDirectory} from "../../common/EmptyDirectory/EmptyDirectory";
import {Preloader} from "../../common/Preloader/Preloader";
import {CarItem} from "./CarItem";
import {CartType} from "../../redux/slices/localDataSlice";
import {Link} from "react-router-dom";
import axios from "axios";

type CartPageType = {
    totalPrice: number
    isFetching: boolean
    products: CartItemType[]
}
export const CartPage = () => {
    const dispatch = useDispatch()

    const CartLocalData = useSelector<RootState, CartType[]>(state => state.LocalData.cart)
    const {products, totalPrice, isFetching} = useSelector<RootState, CartPageType>(state => state.CartPage)

    useLayoutEffect(() => {
        const source = axios.CancelToken.source()
        dispatch(GetAllCartProductsThunk(source.token))

        return () => {
            source.cancel('')
        }
    }, [])

    useEffect(() => {
        if (CartLocalData.length === products.length) {
            dispatch(UpdateProductsThunk(CartLocalData))
            console.log('sync with local storage')
        }
    }, [CartLocalData])

    useEffect(() => {
        if (CartLocalData.length < products.length) {
            dispatch(RemoveProductThunk(CartLocalData))
            console.log('delete by sync with local storage')
        }
    }, [CartLocalData.length])

    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div>
            <h1 className={s.categoryName}>CART</h1>
            {products.length === 0 ?
                <EmptyDirectory directory={'Cart'}/>
                :
                <div className={s.cart}>
                    <div className={s.option}>
                        <p>Product</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                    <hr/>
                    {products.map((e, key) => <CarItem key={e.images[0].src}
                                                       index={key}
                                                       count={e.count}
                                                       id={e.id}
                                                       img={e.images[0].src}
                                                       name={e.name}
                                                       price={Number(e.price)}
                                                       subtotal={e.subtotal}
                        />
                    )}
                    <div className={s.checkout}>
                        <p>
                            {totalPrice}$
                        </p>
                        <div className={s.buttonCheckout}>
                            <Link to='/checkout'>
                                <button>
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
