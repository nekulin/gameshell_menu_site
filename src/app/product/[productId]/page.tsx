'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Server Actionsa
import { getAllProducts } from '@/app/actions';

// Zustand
import useHeaderStore from '@/store/headerStore';
import useCartStore from '@/store/cartStore';

// Components
import CatalogProduct from '@/components/business/catalogProduct/CatalogProduct';
import OrderBtn from '@/components/widgets/order-btn/OrderBtn';
import MoovingCartBtn from '@/components/widgets/mooving-cart-btn/MoovingCartBtn';

// MUI
import { Divider } from '@mui/material';

// project's styles/img
import Preloader from '@/assets/icons/preloader.svg'
import './product.scss'

interface ICategory {
    id: number,
    parent_id: number | null,
    name: string
}

interface IProduct {
    id: number,
    name: string,
    desc: string,
    weight: number,
    weight_unit: string,
    price: number,
    price_value: string,
    menu_category_id: number,
}


const Product: FC = () => {

    // Для обновления header-a (общего на все страницы
    const {setHeaderState, setLoadingState} = useHeaderStore((state) => state)
    const {totalPrice, setTotalPrice, setCart} = useCartStore((state) => state)

    
    const pathname = usePathname()
    const productId = Number(pathname.split('/')[2])

    
    // данные 1го товара и данные первых 4х товаров из той же категории, что этот товар
    const [productData, setProductData] = useState<IProduct>();
    const [suggestedProducts, setSuggestedProducts] = useState<[IProduct]>([]);
     

    const getProduct = async () => {
        setLoadingState(true)
        const result = await getAllProducts();

        const productData = result.products.filter((product: IProduct) => product.id === productId)[0]


        const categoryId = productData.menu_category_id
        const suggestedProducts = result.products.filter((product: IProduct) => product.menu_category_id === categoryId)
        setSuggestedProducts(suggestedProducts)


        setProductData(productData)
        console.log('Products - ', productData, suggestedProducts)


        const headerState = {
            leftIcon: "back",
            title: '',
        }
        setHeaderState(headerState)
        setLoadingState(false)
    }

    useEffect(() => {
        getProduct();
    }, [])



    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            {
                productData 
                                ?
                <section className="product">
                    <div className="product__body">

                        <div className="product__main">
                            <img src="https://static14.tgcnt.ru/posts/_0/ec/ecd056e3fd47e7cbec8bb98fde358cd3.jpg" alt="" />
                            <h3 className="product__title">{productData?.name}</h3>
                            <p className="product__desc">{productData?.desc}</p>
                            <div className="product__ingredients">
                                <span>Состав:</span>
                                <p>{productData?.desc}</p>
                            </div>
                            <p className="product__weight">
                                {productData?.weight}
                                {" "}
                                {productData?.weight_unit}
                            </p>
                            <div className="product__order">
                                <p>{productData?.price} руб</p>
                                <MoovingCartBtn id={productId}/>
                            </div>
                        </div>

                        <OrderBtn text={'Заказать'} />

                        <Divider/>

                        <div className="product__suggest">

                            <h3 className="product__suggest-title">
                                Возможно понравится
                            </h3>

                            <Swiper
                                spaceBetween={20} // Пробел между слайдами
                                slidesPerView={2} // Количество видимых слайдов
                            >
                                {
                                    suggestedProducts && suggestedProducts.map((product: IProduct) => (
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


                </section>
                                :
                <Preloader className='preloader'/>
            }

            
        </motion.main>
    )
}

export default Product;