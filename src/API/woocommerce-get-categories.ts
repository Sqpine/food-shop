import {get} from "./api-config";
import {CategoriesType} from "../redux/slices/categoriesSlice";
import {AxiosResponse} from "axios";

export const CategoriesApi = {
    getCategories:  ():Promise<AxiosResponse<CategoriesType[]>> => {
        return  get("/products/categories");
    },
};
