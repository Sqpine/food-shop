import {get} from "./api-config";
import {AxiosResponse, CancelToken} from "axios";

export const CheckoutAPI = {

    getCountryState: (cancelToken: CancelToken | undefined = undefined): Promise<AxiosResponse<CountryStateType>> => {
        return get(`/data/countries/ua`, cancelToken)
    }
};
type CountryStateType = {
    code: string
    name: string
    states: OblastType[]
}
export type OblastType = {
    code: string
    name: string
    label: string
}