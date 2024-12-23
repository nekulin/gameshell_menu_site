'use client'

// react-dependencies
import { FC, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Server Actionsa

// Components

// Zustand
import useZustandStore from '@/store/zustandStore';

// project's styles/img
import './categoryTabs.scss'

interface ICategoryTabs {
    categories: [{
        id: number,
        parent_id: number | null,
        name: string
    }]
    handleTabsClick: (id: number) => void
}


const CategoryTabs: FC<ICategoryTabs> = ({categories, handleTabsClick}) => {

    const categoryTabsId = useZustandStore((state) => state.categoryTabsId)

    const swiperRef = useRef<any>(null)
    useEffect(() => {
        if (swiperRef.current && categories) {
            const index = categories.findIndex((category) => category.id === categoryTabsId);
            if (index !== -1) {
                swiperRef.current.slideTo(index); // Свайпаем к слайду с нужным индексом
            }
        }
    }, [categoryTabsId, categories]);


    return (
        <div className="category-tabs">
            <Swiper
                spaceBetween={8}
                slidesPerView="auto"
                loop={false}
                freeMode={true}
                centeredSlides={false}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                    {
                        categories && categories.map((category) => {
                            return (
                                <SwiperSlide key={category.id}>
                                    <button 
                                        className={categoryTabsId !== category.id ? "category-tabs__item" : "category-tabs__item active"}
                                        onClick={() => handleTabsClick(category.id)}
                                        id={category.id.toString()}
                                    >
                                        {category.name}
                                    </button>
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>
        </div>
    )
}

export default CategoryTabs;