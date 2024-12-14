'use client'

// react-dependencies
import { FC, useState } from "react"
import Link from "next/link"

// Zustand
import useZustandStore from "@/store/zustandStore"

// MUI-dependencies

// Components
import DiscountItem from "../discount-item/DiscountItem"

// project's styles/img/icons
import './menu.scss'


const Menu: FC = (): JSX.Element => {
    const { openMenu } = useZustandStore((state) => state); // Получаем состояние меню из стора
    const [activeList, setActiveList] = useState<number | null>(null); // Храним индекс активного списка

    const toggleList = (index: number) => {
        setActiveList((prev) => (prev === index ? null : index));
    };

    return (
        <div className={`menu ${openMenu ? 'open' : ''}`}>
            <DiscountItem />

            <div className="menu__lists">
                {/* Список меню с вложенными ссылками */}
                {['Завтраки', 'Дым', 'Бар'].map((title, index) => (
                    <div className="menu__list" key={index}>
                        <div
                            className={`menu__title ${activeList === index ? 'active' : ''}`}
                            onClick={() => toggleList(index)}
                        >
                            <h3>{title}</h3>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={`menu__links ${activeList === index ? 'open' : ''}`}>
                            <Link href="/">Категория один</Link>
                            <Link href="/">Кухня</Link>
                            <Link href="/">Категория ещё</Link>
                            <Link href="/">Кухня</Link>
                        </div>
                    </div>
                ))}

                {/* Дополнительные одиночные ссылки */}
                <Link href="" className="menu__link">Десерты</Link>
                <Link href="" className="menu__link">Кухня</Link>
            </div>

            {/* Секция продуктов */}
            <div className="menu__products">
                <div className="menu__product">
                    <h4>Экзотический дым</h4>
                    <p>От 1200 руб</p>
                    <img src="/images/menu-product_1.png" alt="Продукт" />
                </div>
                <div className="menu__product">
                    <h4>Завтраки сейчас</h4>
                    <p>От 300 руб</p>
                    <img src="/images/menu-product_2.png" alt="Продукт" />
                </div>
                <div className="menu__product">
                    <h4>PlayStation Безлимит</h4>
                    <p>В ВИП комнатах включено в депозит</p>
                    <img src="/images/menu-product_3.png" alt="Продукт" />
                </div>
            </div>
        </div>
    );
};

export default Menu;
