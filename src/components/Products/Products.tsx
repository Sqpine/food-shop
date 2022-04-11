import React, {useEffect, useState} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useParams} from "react-router-dom";
import {GetProductsThunk, ProductType, setProducts,} from "../../redux/slices/productSlice";
import {CategoriesType} from "../../redux/slices/categoriesSlice";
import s from './productStyel.module.scss'
import {CartType, WishListType} from "../../redux/slices/localDataSlice";
import {Preloader} from "../../common/Preloader/Preloader";
import axios from "axios";

export const Products = () => {

    let {categoryId} = useParams()
    const dispatch = useDispatch()

    const [source,setSource]=useState(axios.CancelToken.source())
    const categories = useSelector<RootState, CategoriesType[] | []>(state => state.CategoriesList.categories)

    const isFetching = useSelector<RootState, boolean>(state => state.ProductPage.isFetching)
    const products = useSelector<RootState, ProductType[]>(state => state.ProductPage.products)

    const wishList = useSelector<RootState, WishListType[]>(state => state.LocalData.wishList)
    const cart = useSelector<RootState, CartType[]>(state => state.LocalData.cart)

    useEffect(() => {
        if (categoryId) {
            dispatch(GetProductsThunk({id:categoryId,cancelToken:source.token}))
        }
        return () => {
            dispatch(setProducts({products: []}))
            source.cancel()
            setSource(axios.CancelToken.source())
        }
    }, [categoryId, categories.length])


    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div>
            <h1 className={s.categoryName}>{products.length > 0 && products[0].categories[0].name}</h1>
            <div className={s.products}>
                {products?.length > 0 && products.map((e) => {
                    const isWish = !!wishList.find(list => list.id === e.id)
                    const currentCount = cart.find(cart => cart.id === e.id)
                    const count = currentCount ? currentCount.count : 0

                    return (
                        <Product key={e.images[0].src}
                                 id={e.id}
                                 img={e.images[0].src}
                                 title={e.name}
                                 price={e.price}
                                 tag={e.short_description.replace(/<\/?[^>]+(>|$)/g, "")}
                                 isWish={isWish}
                                 count={count}
                        />
                    )
                })}
            </div>
        </div>
    )
}