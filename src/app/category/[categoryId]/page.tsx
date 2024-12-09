'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// Server Actionsa
import { getAllProducts } from '@/app/actions';

// Zustand
import useHeaderStore from '@/store/headerStore';

// Components
import CatalogProduct from '@/components/business/catalogProduct/CatalogProduct';

// project's styles/img
import Preloader from '@/assets/icons/preloader.svg'
import './category.scss'

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


const Category: FC = () => {

    // Для обновления header-a (общего на все страницы
    const {setHeaderState, setLoadingState} = useHeaderStore((state) => state)

    
    const pathname = usePathname()
    const categoryId = pathname.split('/')[2]


    const [categoryProducts, setCategoryProducts] = useState<any>([]);

    const getProducts = async () => {

        setLoadingState(true)
        const result = await getAllProducts();

        const categoryProducts = result.products.filter((product: IProduct) => product.menu_category_id === Number(categoryId))
        const categoryName = result.categories.find((category: ICategory) => category.id === Number(categoryId)).name

        setCategoryProducts(categoryProducts)
        console.log('categoryProducts - ', categoryProducts, categoryName)


        const headerState = {
            leftIcon: "back",
            title: categoryName,
            showSearchIcon: true
        }
        setHeaderState(headerState)
        setLoadingState(false)
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

            <section className="category">

                {
                    categoryProducts.length > 0
                                                    ?
                    <div className="category__main">
                        {
                            categoryProducts && categoryProducts.map((product: IProduct) => (
                                <CatalogProduct
                                    key={product.id}
                                    name={product.name}
                                    desc={product.desc}
                                    price={product.price}
                                    id={product.id}
                                />
                            ))
                        }
                    </div>
                                                    :
                    <Preloader className='preloader'/>
                }


            </section>
            
        </motion.main>
    )
}

export default Category;