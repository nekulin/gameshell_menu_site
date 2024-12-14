'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// Server Actionsa
import { getAllProducts } from '@/app/actions';

// Functions
import getProductsByRootCategory from '@/functions/productsFilter';
import handleTabClick from '@/functions/handleTab';

// Zustand
import useHeaderStore from '@/store/headerStore';
import useCartStore from '@/store/cartStore';

// Components
import CategoryTabs from '@/components/widgets/category-tabs/CategoryTabs';
import ProductGroupCategories from '@/components/business/productGroupCategories/ProductGroupCategories';
import CatalogProduct from '@/components/business/catalogProduct/CatalogProduct';
import TableInfo from '@/components/widgets/table-info/TableInfo';
import OrderBtn from '@/components/widgets/order-btn/OrderBtn';


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
    menu_root_category_id: number,
}


const Category: FC = () => {

    // Для обновления header-a (общего на все страницы
    const {setHeaderState, setLoadingState} = useHeaderStore((state) => state)
    const {totalPrice} = useCartStore((state) => state)

    
    const pathname = usePathname()
    const categoryId = Number(pathname.split('/')[2])


    const [tabs, setTabs] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);


    const getProducts = async () => {

        setLoadingState(true)
        const result = await getAllProducts();


        // Найти текущую root категорию
        const currentCategory = result.categories.find((category: ICategory) => category.id === categoryId);

        // Получить вложенные категории
        const subcategories = result.categories.filter((category: ICategory) => category.parent_id === categoryId);
        setTabs(subcategories)

        // ПОЧЕМУ ТО ОЧЕНЬ ВАЖНА ЭТА СТРОЧКА
        const allCategories = [currentCategory, ...subcategories];


        // Получить продукты для каждой вложенной категории - если ТАБ 1 - значит мы на самом глубой категории
        const productGroups = subcategories.length > 0 ? allCategories.slice(1).map((category: ICategory) => ({
            category,
            products: getProductsByRootCategory(category.id, result.categories, result.products),
        })) : allCategories.map((category: ICategory) => ({
            category,
            products: getProductsByRootCategory(category.id, result.categories, result.products),
        }))
        setProducts(productGroups)


        const headerState = {
            leftIcon: "back",
            title: currentCategory.name,
            showSearchIcon: true
        }
        setHeaderState(headerState)
        setLoadingState(false)

    }
    
    useEffect(() => {
        getProducts();
    }, [])
    
    console.log('PRODUCTS / TABS - ', products, tabs)

    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >

            <section className="category">

                <TableInfo/>

                <CategoryTabs categories={tabs} handleTabsClick={handleTabClick}/>

                <div className={products.length !== 1 ? 'products-main' : 'products-main--one'}>
                    {
                        products.length > 0
                                                ?
                        products.map(({ category, products } : { category: ICategory, products: IProduct[] }) => (
                            <ProductGroupCategories
                                key={category.id}
                                categoryId={category.id}
                                categoryName={category.name}
                                products={products}
                            />
                        ))
                                                :
                        <Preloader className='preloader'/>
                    }
                </div>

                <OrderBtn text={'Заказать'} />

            </section>
            
        </motion.main>
    )
}

export default Category;