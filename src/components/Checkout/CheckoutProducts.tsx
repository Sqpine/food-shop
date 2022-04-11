import {CartItemType} from "../../redux/slices/cartSlice";
import {ProductItem} from "./ProductItem";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import s from "./checkoutPageStyle.module.scss";

type PropsType = {
    products: CartItemType[]
}
export const CheckoutProducts = (props: PropsType) => {
    const totalPrice = useSelector<RootState, number>(state => state.CartPage.totalPrice)
    return (
        <>
            {props.products.map(e => <ProductItem
                key={e.images[0].src} name={e.name}
                count={e.count} subtotal={e.subtotal}
                description={e.short_description}
                id={e.id}
            />)}
            <span  className={s.subtotal}>Sub total: ${totalPrice}</span>
        </>
    )
}