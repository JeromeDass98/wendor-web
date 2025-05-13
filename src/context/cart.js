'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const getQuantity = itemId => {
    const item = cart?.products?.find(i => i.id === itemId);
    return item?.quantity || 0;
  }

  return (
    <CartContext.Provider value={{ cart, getQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
