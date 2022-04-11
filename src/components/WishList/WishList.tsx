import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {WishListType} from "../../redux/slices/localDataSlice";
import {GetWishListThunk, RemoveWishListThunk, setWishList} from "../../redux/slices/wishSlice";
import {ProductType} from "../../redux/slices/productSlice";
import {WishItem} from "./WishItem";
import s from './wishPageStyle.module.scss'
import {EmptyDirectory} from "../../common/EmptyDirectory/EmptyDirectory";
import {Preloader} from "../../common/Preloader/Preloader";
import axios from "axios";

type WishPageType = {
    isFetching: boolean
    wishList: ProductType[]
}
export const WishList = () => {
    const dispatch = useDispatch()

    const wishesId = useSelector<RootState, WishListType[]>(state => state.LocalData.wishList)
    const {isFetching, wishList} = useSelector<RootState, WishPageType>(state => state.WishPage)

    useEffect(() => {
        dispatch(RemoveWishListThunk({id: wishesId}))
    }, [wishesId])


    useEffect(() => {
        const source = axios.CancelToken.source()
        if (wishesId.length > 0) {
            dispatch(GetWishListThunk({wishesId: wishesId, cancelToken: source.token}))
        }
        return () => {
            dispatch(setWishList({wishList: []}))
            source.cancel('')
        }
    }, [])

    return (
        <div>
            <h1 className={s.categoryName}>WISHLIST</h1>
            {wishesId.length > 0 ? isFetching ?
                    <Preloader/>
                    :
                    <div className={s.wishes}>
                        <div className={s.option}>
                            <p>Product</p>
                            <p>Price</p>
                        </div>
                        <hr/>
                        {wishList.map(e => <WishItem key={e.images[0].src}
                                                     wishProduct={e}
                            />
                        )}
                    </div>

                :
                <EmptyDirectory directory={'Wishlist'}/>
            }
        </div>

    )
}