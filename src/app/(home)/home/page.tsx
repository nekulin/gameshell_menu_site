'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Server Actionsa
import { getAllProducts } from '@/app/actions';

// Components
import CategoryTabs from '@/components/widgets/category-tabs/CategoryTabs';
import ProductGroupCategories from '@/components/business/productGroupCategories/ProductGroupCategories';

// project's styles/img
import Preloader from '@/assets/icons/preloader.svg'
import './home.scss'

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


const Home: FC = () => {

    const [products, setProducts] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);

    const getProducts = async () => {
        const result = await getAllProducts();

        setProducts(result.products)
        setCategories(result.categories)
        console.log('RESULT - ', result)
    }

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            <section className="products">

                <CategoryTabs categories={categories}/>

                <div className="products__main">
                    {
                        
                        categories.length > 0
                                                ?
                        categories.map((category: ICategory) => (
                            <ProductGroupCategories key={category.id} categoryId={category.id} categoryName={category.name} products={products.filter((product: IProduct) => product.menu_category_id === category.id)}/>
                        ))
                                                :
                        <Preloader className='preloader'/>
                    }
                </div>

                <button className="order-btn">
                    <span className='order-btn__text'>Заказать</span>
                    <span className='order-btn__info'>0 руб ~ 5 мин</span>
                </button>

            </section>
            
        </motion.main>
    )
}

export default Home;