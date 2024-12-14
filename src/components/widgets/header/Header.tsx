'use client'

// react-dependencies
import { FC, useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

// Zustand
import useHeaderStore from "@/store/headerStore"

// MUI-dependencies
import Skeleton from '@mui/material/Skeleton';

// Components
import { MenuButton } from "@/ui/MenuButton/MenuButton"
// import { SearchInput } from "@/ui/SearchInput/SearchInput"

// project's styles/img/icons
import BackIcon from '@/assets/icons/back-icon.svg'
import './header.scss'


const Header:FC = ():JSX.Element => {

    const {leftIcon, title, showSearchIcon, loadingState} = useHeaderStore((state) => state)

    const router = useRouter()
    const backCallback = () => {
        router.back()
    }

    return (

        <header className="header">

            {
                loadingState
                                ?
                <Skeleton animation="wave" width={'100%'} height={40} />
                                :
                <div className="header__body">

                    {
                        leftIcon === 'menu'
                                            ?
                        <MenuButton/>
                                            :
                        <button className="back-icon" onClick={() => backCallback()}>
                            <BackIcon/>
                        </button>
                    }

                    <h1 className="header__title">{title}</h1>
{/* 
                    {
                        showSearchIcon 
                                        ?
                        <SearchInput/>
                                        :
                        ""
                    } */}

                </div>
                
            }

        </header>
    )
}

export default Header;
