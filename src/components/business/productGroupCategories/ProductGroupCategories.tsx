'use client'

// react-dependencies
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useIntersectionObserver} from '@reactuses/core'

// Zustand
import useZustandStore from '@/store/zustandStore';

// Components
import CatalogProduct from '../catalogProduct/CatalogProduct';

// types (ZOD + TS)

// project's styles/img
import './productGroupCategories.scss'


interface IProduct {
    id: number,
    name: string,
    desc: string,
    weight: number,
    weight_unit: string,
    price: number,
    price_value: string,
    menu_category_id: number,
    menu_root_category_id: number,
}


const ProductGroupCategories = ({categoryId, categoryName, products} : {categoryId: number, categoryName: string, products: IProduct[]}): JSX.Element => {


    const {setCategoryTabsId, categoryTabsId} = useZustandStore((state) => state)
    const intersectionRef = useRef(null);
    const intersection = useIntersectionObserver(
        intersectionRef,
        ([entry]) => {
            // Проверяем, что элемент полностью виден на экране
            if (entry.isIntersecting && categoryTabsId !== categoryId) {
                console.log("Updating categoryTabsId to:", categoryId);  // Лог для проверки
                setCategoryTabsId(categoryId);
            }
        },
        {
            threshold: .9,
            rootMargin: "0px 0px 0% 0px"
        }
    );


    console.log('TAB-ID: ', categoryTabsId)


    return (
        <div className="product-group" key={categoryId} ref={intersectionRef} id={`category-${categoryId}`}>

            <div className="product-group__titles">
                <h1>{categoryName}</h1>
                <Link href={`/category/${categoryId}`}>Смотреть всё</Link>
            </div>

            <div className="product-group__body">
                 <Swiper
                    spaceBetween={20}
                    slidesPerView="auto"
                    loop={false}
                    freeMode={true}
                    centeredSlides={false}
                >
                    {
                        products && products.map((product: IProduct) => (
                            <SwiperSlide key={product.id}>
                                <CatalogProduct
                                    name={product.name}
                                    desc={product.desc}
                                    price={product.price}
                                    id={product.id}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductGroupCategories;