import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {CartItemType, GetAllCartProductsThunk} from "../../redux/slices/cartSlice";
import {CheckoutAPI, OblastType} from "../../API/woocommerce-get-checkout-data";
import s from './checkoutPageStyle.module.scss'
import {CheckoutForm} from "./CheckoutForm";
import {Preloader} from "../../common/Preloader/Preloader";
import {CheckoutProducts} from "./CheckoutProducts";
import {CartType} from "../../redux/slices/localDataSlice";
import {EmptyDirectory} from "../../common/EmptyDirectory/EmptyDirectory";
import {SuccessPurchase} from "../../common/SuccessPage/SuccessPage";
import axios from "axios";

type CartPageType = {
    products: CartItemType[]
    isFetching: boolean
}
export const CheckoutPage = () => {
    const dispatch = useDispatch()

    const [country, setCountry] = useState<OblastType[]>([])
    const [isCompletePurchase, setCompletePurchase] = useState<boolean>(false)

    const {products, isFetching} = useSelector<RootState, CartPageType>(state => state.CartPage)
    const localProducts = useSelector<RootState, CartType[]>(state => state.LocalData.cart)

    const setComplete = useCallback((condition: boolean) => {
        setCompletePurchase(condition)
    }, [])

    useEffect(() => {
        const source = axios.CancelToken.source()
        if (products.length === 0) {
            dispatch(GetAllCartProductsThunk(source.token))
        }
        CheckoutAPI.getCountryState().then(e => {
            const s = e.data.states.map(e => {
                return {...e, label: e.name.split(' ')[0]}
            })
            setCountry(s)
        })
        return () => {
            source.cancel('')
        }
    }, [])

    if (isCompletePurchase) {
        return <SuccessPurchase/>
    }
    return (
        <div className={s.checkoutPage}>
            {isFetching ?
                <Preloader/>
                :
                localProducts.length === 0 ?
                    <EmptyDirectory directory={'Cart'}/>
                    :
                    <>
                        <div className={s.checkoutBlock}>
                            <h1>Checkout</h1>
                            <p>Shipping Details</p>
                            <CheckoutForm setComplete={setComplete} cart={localProducts}
                                          country={country}/>
                        </div>
                        <div className={s.priceBlock}>
                            <h1> Cart summary</h1>
                            <CheckoutProducts products={products}/>
                        </div>
                    </>
            }
        </div>
    )
}

