import React from "react";
import Logo from '../../images/logo.png'
import Cart from '../../images/cart.png'
import heart from '../../images/heart.png'
import s from './header.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {CartType, WishListType} from "../../redux/slices/localDataSlice";
import {Link} from "react-router-dom";

export const Header = () => {

    const cart = useSelector<RootState, CartType[]>(state => state.LocalData.cart)
    const wishList = useSelector<RootState, WishListType[]>(state => state.LocalData.wishList)

    return (
        <div className={s.header}>
            <Link to={'category'}>
                <img width={64} height={64} src={Logo} alt="Logo"/>
            </Link>
            <div className={s.itemsShop}>
                <Link to='wishlist'>
                    <div>
                        <img width={30} src={heart} alt="Wish List"/>
                        {wishList.length > 0 && <span>{wishList.length}</span>}
                    </div>
                </Link>
                <Link  to='cart'>
                    <div>
                        <img width={36} height={36} src={Cart} alt="Cart"/>
                        {cart.length > 0 && <span>{cart.length}</span>}
                    </div>
                </Link>
            </div>
        </div>
    )
}