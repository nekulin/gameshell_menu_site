import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  cart: Array<any>
  totalPrice: number
  cartSwitches: {
    paymentSwitch: true,
    bonusSwitch: true,
    toGoSwitch: false,
  },
  draggableDrawer: boolean
}

type Action = {
  setCart: (product:any) => void
  setTotalPrice: (price:number) => void
  setCartSwitches: (key: string, value: boolean) => void
  setDraggableDrawer: (value: boolean) => void
}

const useCartStore = create<State & Action>()(
    persist(immer((set) => ({

        // [ {id: 998, count: 5}, {id: 999, count: 3} ]
        cart: [],
        setCart: (product: { id: number; count: number }) => {
            set((state) => {
              const isProductInCart = state.cart.find((item) => item.id === product.id);
          
              if (isProductInCart) {
                    // Если товар уже есть в корзине - увеличиваем его count
                    isProductInCart.count += product.count;
                    if (isProductInCart.count === 0) {
                      state.cart = state.cart.filter((item) => item.id !== product.id);
                    }
              } else {
                    // Если товара нет в корзине, добавляем его
                    state.cart.push(product);
                }
            });
        },

        totalPrice: 0,
        setTotalPrice: (price) => {
            set((state) => {
              state.totalPrice = price
            })
          },


        cartSwitches: {
            paymentSwitch: true,
            bonusSwitch: true,
            toGoSwitch: false
        },
        setCartSwitches: (key: string, value: boolean) => {
            set((state) => {
              state.cartSwitches[key] = value;
            });
        },


        draggableDrawer: false,
        setDraggableDrawer: (value: boolean) => {
            set((state) => {
              state.draggableDrawer = value;
            });
        },

    })),
        {
            name: 'cart-store',
        }
    )
);

export default useCartStore;