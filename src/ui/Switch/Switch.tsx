'use client'

// react-dependencies
import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';

// Zustand
import useCartStore from '@/store/cartStore';

// MUI
import Switch, { SwitchProps } from '@mui/material/Switch';


const CustomSwitch = ({text, switchKey} : {text: string, switchKey: string}) => {

    const { cartSwitches, setCartSwitches } = useCartStore(state => state);
    const handleChange = (event:any) => {
        setCartSwitches(switchKey, event.target.checked);
    };


    const CustomSwitch = styled((props: SwitchProps) => (
        <Switch 
            focusVisibleClassName=".Mui-focusVisible" 
            disableRipple {...props} 
            checked={cartSwitches[switchKey]}
            onChange={handleChange}
            sx={{transition: 'all .3s ease'}}
        />

      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        transition: "all .3s ease",
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#FF0026',
              opacity: 1,
              border: 0,
              ...theme.applyStyles('dark', {
                backgroundColor: '#FF0026',
              }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[600],
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
              opacity: 0.3,
            }),
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
          ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
          }),
        },
      }));


    return (
        <div className="switch">
            <p>{text}</p>
            <CustomSwitch/>
        </div>
    )
}

export default CustomSwitch;