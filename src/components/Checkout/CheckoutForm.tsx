import {useFormik} from "formik";
import s from "./checkoutPageStyle.module.scss";
import {Autocomplete, Button, TextField} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import React from "react";
import {OblastType} from "../../API/woocommerce-get-checkout-data";
import {CartType, setItemInCart} from "../../redux/slices/localDataSlice";
import {validationSchema} from "../../common/validation";
import {useDispatch} from "react-redux";

type PropsType = {
    country: OblastType[]
    cart: CartType[]
    setComplete: (s: boolean) => void
}
export const CheckoutForm = (props: PropsType) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            postcode: '',
            address: '',
            phone: '',
            email: '',
            city: props.country[0]
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            dispatch(setItemInCart({products: []}))
            props.setComplete(true)
        },
    });

    return (
        <form className={s.checkoutForm} onSubmit={formik.handleSubmit}>
            <div className={s.items}>
                <div>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </div>
                <div>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </div>
            </div>
            <div className={s.item}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </div>
            <div className={s.item}>
                <Autocomplete
                    fullWidth
                    disablePortal
                    id="city"
                    value={formik.values.city}
                    onChange={(_, value) => {
                        formik.setFieldValue('city', value)
                    }}
                    options={props.country}
                    renderInput={(params) => <TextField
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        {...params}
                        name="city"
                        label="City"
                    />}
                />
            </div>
            <div className={s.item}>
                <MuiPhoneNumber
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone"
                    regions={'europe'}
                    value={formik.values.phone}
                    onChange={value => formik.setFieldValue('phone', value)}
                    defaultCountry={'ua'}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
            </div>
            <div className={s.items}>
                <div>
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </div>
                <div>
                    <TextField
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        type='number'
                        value={formik.values.postcode}
                        onChange={formik.handleChange}
                        error={formik.touched.postcode && Boolean(formik.errors.postcode)}
                        helperText={formik.touched.postcode && formik.errors.postcode}
                    />
                </div>
            </div>
            <Button color="success" variant="contained" fullWidth type="submit">
                Place order
            </Button>
        </form>
    )

}