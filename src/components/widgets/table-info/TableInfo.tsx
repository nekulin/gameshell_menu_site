'use client'

// react-dependencies
import { FC } from "react"
import Link from "next/link";

// Zustand
import useCartStore from "@/store/cartStore";

// MUI-dependencies

// Components

// project's styles/img/icons
import './table-info.scss'


const TableInfo: FC = (): JSX.Element => {

    const {cart, totalPrice} = useCartStore((state) => state)

    return (
        <div className="table-info">
            <p>Стол №7; {cart.length} поз ~ {totalPrice} руб</p>
            <Link href="/cart">Оплатить стол</Link>
        </div>
    );
};

export default TableInfo;
