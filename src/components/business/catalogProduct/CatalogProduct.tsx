// react-dependencies
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

// Server Actions

// Zustand

// Components
import MoovingCartBtn from '@/components/widgets/mooving-cart-btn/MoovingCartBtn';

// MUI-components
import Skeleton from '@mui/material/Skeleton';

// types (ZOD + TS)

// project's styles/img
import './catalogProduct.scss'


interface IProduct {
    id: number,
    name: string,
    desc: string,
    price: number,
}


const CatalogProduct: FC<IProduct> = ({
    id,
    name,
    desc,
    price,
}): JSX.Element => {


    return (
        <div className="catalog-product">
            <img src="https://static14.tgcnt.ru/posts/_0/ec/ecd056e3fd47e7cbec8bb98fde358cd3.jpg" alt="" />
            <Link href={`/product/${id}`} className="catalog-product__title">
                {name}
            </Link>
            <p className="catalog-product__desc">Идеальное начало дня с творогом и вареньем</p>
            <p className="catalog-product__price">{price} руб</p>

            <MoovingCartBtn id={id} />
        </div>
    )
}

export default CatalogProduct;