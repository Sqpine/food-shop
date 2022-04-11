import React from "react";
import {useSelector} from "react-redux";
import {CategoriesType} from "../../redux/slices/categoriesSlice";
import {RootState} from "../../redux/store";
import {Category} from "./Category";
import s from './categoryStyle.module.scss'

export const Categories = () => {

    const CategoriesList = useSelector<RootState, CategoriesType[] | []>(state =>
        state.CategoriesList.categories)

    return (
        <div className={s.categories}>
            {CategoriesList.map(e =>
                <Category
                    key={e.id} img={e.image.src}
                    name={e.name} id={e.id}
                    slug={e.slug}
                />
            )}
        </div>
    )
}