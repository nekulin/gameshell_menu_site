'use client'

// react-dependencies
import { useState, useEffect } from "react"

// Server-actions
import { addToCart, deleteFromCart } from "@/app/actions";

// Zustand
import useCartStore from "@/store/cartStore";

// MUI
import Skeleton from '@mui/material/Skeleton';

// Components

// project's styles/img/icons
import './mooving-cart-btn.scss'


const MoovingCartBtn = ({id} : { id: number }): JSX.Element => {

    const {cart, setCart, setTotalPrice} = useCartStore((state) => state);
    const [btnLoading, setBtnLoading] = useState(false)
    const [productInCart, setProductInCart] = useState(false);

    useEffect(() => {
        // Оптимальная проверка: останавливаемся при первом совпадении
        const isInCart = cart.some((item) => item.id === id);
        setProductInCart(isInCart);
    }, [cart]);


    const addToCartHandler = async () => {
        setBtnLoading(true)

        const result = await addToCart(id, 1)
        const totalPrice = result.basket.total
        setTotalPrice(totalPrice.slice(0, -3))

        setCart({id, count: 1})
        setBtnLoading(false)
    }

    const deleteFromCartHandler = async () => {
        setBtnLoading(true)

        const result = await deleteFromCart(id, 1)
        console.log('===deleteFromCartHandler=== - ', result)
        const totalPrice = result.basket.total
        setTotalPrice(totalPrice ? totalPrice.slice(0, -3) : '0')


        setCart({id, count: -1})
        setBtnLoading(false)
    }

    // Ищем количество товара, если он в корзине
    const productCount = cart.find((item) => item.id === id)?.count

    return (
        btnLoading 
        ? 
        <Skeleton variant="rectangular" width={130} height={45} sx={{borderRadius: 50}}/>
                :
        productInCart
                ?
        <button 
            className="mooving-btn in-cart"
        >
            <span onClick={() => deleteFromCartHandler()} className="mooving-btn__minus">-</span>
                {productCount} шт
            <span onClick={() => addToCartHandler()} className="mooving-btn__plus">+</span>
        </button>
                :
        <button 
            className="mooving-btn"
            onClick={() => addToCartHandler()}
        >
            Добавить 
            <span>+</span>
        </button>
    );
};

export default MoovingCartBtn;
