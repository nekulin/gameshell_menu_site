'use client'

// react-dependencies
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Server Actionsa
import { getCart, getAllProducts } from '../actions';

// Zustand
import useHeaderStore from '@/store/headerStore';
import useCartStore from '@/store/cartStore';

// MUI
import { Divider } from '@mui/material';

// Components
import TableInfo from '@/components/widgets/table-info/TableInfo';
import OrderBtn from '@/components/widgets/order-btn/OrderBtn';
import MoovingCartBtn from '@/components/widgets/mooving-cart-btn/MoovingCartBtn';
import CustomSwitch from '@/ui/Switch/Switch';
import DraggableDrawer from '@/components/widgets/draggable-drawer/DraggableDrawer'

// project's styles/img
import Preloader from '@/assets/icons/preloader.svg'
import './cart.scss'


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


const Cart: FC = () => {

    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const {setHeaderState, setLoadingState} = useHeaderStore((state) => state)
    const {cart, totalPrice, cartSwitches, setDraggableDrawer} = useCartStore((state) => state)
    const [bonus, setBonus] = useState<number>(0);

    const router = useRouter();

    const getCartHandler = async () => {
        setLoadingState(true)
        const result = await getAllProducts();
        
        const ids = cart.map((product: { id: number; count: number }) => product.id)

        const selectedProducts = result.products.filter((product: IProduct) => ids.includes(product.id));
        setCartProducts(selectedProducts)

        if(selectedProducts.length === 0){
            router.push('/')
        }

        const headerState = {
            leftIcon: "back",
            title: "Корзина",
        }
        setHeaderState(headerState)
        setLoadingState(false)
        console.log('======CART-PRODUCTS======', cartProducts, ids, cart)
    }
    
    useEffect(() => {
        getCartHandler();
    }, [cart])


    const switches = [
        { switchKey: "paymentSwitch", text: "Оплатить сразу" },
        { switchKey: "bonusSwitch", text: "Списать бонусы" },
        { switchKey: "toGoSwitch", text: "С собой" },
    ];


    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >


            <section className="cart">

                {
                    cartProducts && cartProducts.length > 0 
                                                                ?
                    <div className="cart__main">
                        <div className="cart__products">
                            <TableInfo/>
                            {
                                cartProducts.map((product: IProduct) => (
                                        <div className="cart__product" key={product.id}>
                                            <img src="https://static14.tgcnt.ru/posts/_0/ec/ecd056e3fd47e7cbec8bb98fde358cd3.jpg" alt="" />
                                            <div className="cart__product-info">
                                                <h3>{product.name}</h3>
                                                <p>
                                                    {product.weight}
                                                    {" "}
                                                    {product.weight_unit}
                                                </p>
                                                <MoovingCartBtn id={product.id} />
                                            </div>
                                            <p className="cart__product-price">{product.price} руб</p>
                                        </div>
                                ))        
                            }     
                            <Divider/>
                        </div>

                        <div className="cart__options">
                            <div className="cart__switches">
                                {
                                    switches.map((switchItem, index) => (
                                        <CustomSwitch key={index} text={switchItem.text} switchKey={switchItem.switchKey} />
                                    ))
                                }
                            </div>

                            <Divider/>

                            <div className="cart__price">
                                <h3>Итого:</h3>
                                {
                                    cartSwitches.bonusSwitch
                                                                ?
                                    <div>
                                        <p className="cart__price-bonus">{totalPrice} руб</p>
                                        <p className="cart__price-main">{Number(totalPrice) - Number(bonus)} руб</p>
                                    </div>
                                                                :
                                    <div>
                                        <p className="cart__price-main">{totalPrice} руб</p>
                                    </div>
                                }
                            </div>


                            <DraggableDrawer/>


                            <button className='order-btn' onClick={() => setDraggableDrawer(true)}>
                                Подтвердить
                            </button>
                        </div>
                    </div>  
                                                                :
                    <Preloader className="preloader" />
                }

            </section>
            
        </motion.main>
    )
}

export default Cart;