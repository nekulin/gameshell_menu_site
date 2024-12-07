'use client'

// react-dependencies
import { FC, useState, useRef } from "react";
import Link from "next/link";

// Server

// Types (Zod + TS)

// MUI-dependencies
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";

// styles
import SearchIcon from '@/assets/icons/search-icon.svg'
import './searchInput.scss'

// interface


export const SearchInput: FC = (): JSX.Element => {


  return (
    <button className="search-btn">
      <SearchIcon/>
    </button>
  );
}
