'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Server Actionsa
import { getAllProducts } from '@/app/actions';

// Zustand
import useHeaderStore from '@/store/headerStore';
import useCartStore from '@/store/cartStore';

// Components
import Menu from '@/components/widgets/dropdown-menu/Menu';
import CategoryTabs from '@/components/widgets/category-tabs/CategoryTabs';
import ProductGroupCategories from '@/components/business/productGroupCategories/ProductGroupCategories';
import TableInfo from '@/components/widgets/table-info/TableInfo';
import OrderBtn from '@/components/widgets/order-btn/OrderBtn';

// Functions
import handleTabClick from '@/functions/handleTab';
import getProductsByRootCategory from '@/functions/productsFilter';

// project's styles/img
import Preloader from '@/assets/icons/preloader.svg'
import './home.scss'

interface ICategory {
    id: number,
    parent_id: number,
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
    menu_root_category_id: number,
}


const Home: FC = () => {

    // Для обновления header-a (общего на все страницы  и  логика меню
    const {setHeaderState, setLoadingState} = useHeaderStore((state) => state)


    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [rootCategories, setRootCategories] = useState<any>([]);


    const getProducts = async () => {
        setLoadingState(true)
        const result = await getAllProducts();

        setProducts(result.products)
        setCategories(result.categories)

        const categories = result.categories.filter((category: ICategory) => category.parent_id === null)
        setRootCategories(categories)

        const headerState = {
            leftIcon: "menu",
            title: "Всё меню",
            showSearchIcon: true
        }
        setHeaderState(headerState)
        setLoadingState(false)

    }
    
    useEffect(() => {
        getProducts();
    }, [])
    
    console.log('PRODUCTS = ', products)


    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            <Menu/>

            <section className="products">

                <TableInfo/>

                <CategoryTabs categories={rootCategories} handleTabsClick={handleTabClick}/>

                <div className="products-main">
                    {
                        
                        rootCategories && products.length > 0 && rootCategories.length > 0
                                                ?
                        rootCategories.map((category: ICategory) => {

                            const allProductsByRootCategory = getProductsByRootCategory(category.id, categories, products)

                            return (
                                <ProductGroupCategories 
                                    key={category.id} 
                                    categoryId={category.id} 
                                    categoryName={category.name} 
                                    products={allProductsByRootCategory}
                                />
                            )
                        })
                                                :
                        <Preloader className='preloader'/>
                    }
                </div>

                <OrderBtn text={'Заказать'}/>

            </section>
            
        </motion.main>
    )
}

export default Home;