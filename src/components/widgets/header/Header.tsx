'use client'

// react-dependencies
import { FC, useState } from "react"

// Zustand

// MUI-dependencies

// Components
import { MenuButton } from "@/ui/MenuButton/MenuButton"
import { SearchInput } from "@/ui/SearchInput/SearchInput"

// project's styles/img/icons
import './header.scss'


const Header:FC = ():JSX.Element => {



    return (

        <header className="header">

            <div className="header__body">

                <MenuButton/>

                <div className="header__title">
                    <h1>Всё меню</h1>
                    <p>Cтол #7</p>
                </div>

                <SearchInput/>

            </div>

        </header>
    )
}

export default Header;
