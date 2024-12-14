'use client'

// react-dependencies
import { useRouter } from "next/navigation"

// Zustand
import useCartStore from "@/store/cartStore"

// MUI-dependencies

// Components

// project's styles/img/icons
import './order-btn.scss'


const OrderBtn = ({text}: {text: string}):JSX.Element => {

    const {totalPrice} = useCartStore(state => state)

    const router = useRouter()

    return (
        <button className={'order-btn'} disabled={totalPrice > 0 ? false : true} onClick={() => router.push('/cart')}>
            <span className='order-btn__text'>{text}</span>
            <span className='order-btn__info'>{totalPrice} руб</span>
        </button>
    )
}

export default OrderBtn;
