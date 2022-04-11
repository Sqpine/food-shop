import React, {useEffect} from 'react';
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Products} from "./components/Products/Products";
import {Navigate, Route, Routes} from "react-router-dom";
import {WishList} from "./components/WishList/WishList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {Preloader} from "./common/Preloader/Preloader";
import {GetCategoriesTnunk} from "./redux/slices/categoriesSlice";
import {CartPage} from "./components/Cart/CartPage";
import {HomePage} from "./components/Home/HomePage";
import {ProductPage} from "./components/Product/ProductPage";
import {withLazyComponent} from "./common/WithLazyComponent";
import CustomizedSnackbars from "./common/snackBar";
import {CheckoutPage} from "./components/Checkout/CheckoutPage";

const ProductPageLazy = withLazyComponent(ProductPage)
const CartPageLazy = withLazyComponent(CartPage)
const WishListLazy = withLazyComponent(WishList)
const ProductsLazy = withLazyComponent(Products)
const CheckoutPageLazy = withLazyComponent(CheckoutPage)

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetCategoriesTnunk())
    }, [])

    const initializeApp = useSelector<RootState, boolean>(state => state.CategoriesList.isFetching)

    if (initializeApp) {

        return <>
            <CustomizedSnackbars/>
            <Preloader/>
        </>
    }

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <Header/>
            <Categories/>
            <Routes>
                <Route path="category/">
                    <Route path='' element={<HomePage/>}/>
                    <Route path=":categoryId" element={<ProductsLazy/>}/>
                </Route>
                <Route path="cart" element={<CartPageLazy/>}/>
                <Route path="checkout" element={<CheckoutPageLazy/>}/>
                <Route path="product">
                    <Route path='' element={<HomePage/>}/>
                    <Route path=":productId" element={<ProductPageLazy/>}/>
                </Route>
                <Route path="wishlist" element={<WishListLazy/>}/>
                <Route path="/" element={<Navigate to="/category/burgers"/>}/>
            </Routes>
        </div>
    );
}

export default App;
