'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
  priceWithoutDiscount?: number;
  image: {
    asset: {
      url: string;
    };
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (product: CartItem) => void;
  removeItemFromCart: (productId: string) => void;
  incrementCart: (productId: string) => void;
  decrementCart: (productId: string) => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.productId);
      
      if (existingItemIndex !== -1) {
        const updatedItems = prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + product.quantity;
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        return updatedItems;
      } else {
        return [...prevItems, product];
      }
    });
  }

  const removeItemFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  const incrementCart = (productId: string) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementCart = (productId: string) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, incrementCart, decrementCart, getCartCount, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
