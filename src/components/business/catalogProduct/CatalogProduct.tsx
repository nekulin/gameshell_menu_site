// react-dependencies
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Zustand

// MUI-components

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
        <div className="catalog-product" key={id}>
            <img src="https://static14.tgcnt.ru/posts/_0/ec/ecd056e3fd47e7cbec8bb98fde358cd3.jpg" alt="" />
            <h3 className="catalog-product__title">{name}</h3>
            <p className="catalog-product__desc">{desc}</p>
            <p className="catalog-product__price">{price} руб</p>
            <button className="catalog-product__btn">Добавить <span>+</span></button>
        </div>
    )
}

export default CatalogProduct;