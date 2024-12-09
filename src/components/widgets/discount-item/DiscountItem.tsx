'use client'

// react-dependencies
import { FC, useState } from "react"

// Zustand

// MUI-dependencies

// Components

// project's styles/img/icons
import DiscountDoneIcon from '@/assets/icons/discount-done.svg' 
import './discount-item.scss'


const DiscountItem:FC = ():JSX.Element => {

    const [discountStep, setDiscountStep] = useState(1)


    return (
        <div className="discount">
            <p className="discount__text">Еще 4 кальяна до бесплатного</p>
            <div className="discount__steps">
                <span className="discount__num-step">1</span>
                <span className="discount__num-step">2</span>
                <span className="discount__num-step">3</span>
                <span className="discount__num-step">4</span>
                <span className="discount__num-step">5</span>
                <span className="discount__text-step">Free</span>
            </div>
            {/* <img src="/images/pineapple.png" alt="" /> */}
        </div>
    )
}

export default DiscountItem;
