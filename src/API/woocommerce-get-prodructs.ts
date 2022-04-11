import {get} from "./api-config";
import {AxiosResponse, CancelToken} from "axios";
import {ProductType} from "../redux/slices/productSlice";

export const ProductsApi = {

    getProductsByCategory: (id: string | number, cancelToken: CancelToken | undefined = undefined): Promise<AxiosResponse<ProductType[]>> => {
        return get(`/products?category=${id}`,cancelToken)
    },
    getProductById: (id: string | number,cancelToken:CancelToken | undefined=undefined): Promise<AxiosResponse<ProductType>> => {
        return get(`/products/${id}`,cancelToken)
    },
};
