'use client';
import React from 'react';
import { useCart } from '@/components/CartContext';
import { urlFor } from '@/sanity/lib/sanity';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
  const { cartItems, getTotalPrice, removeItemFromCart, incrementCart, decrementCart, clearCart } = useCart();

  const handleRemove = (productId: string) => {
    removeItemFromCart(productId);
  };

  const handleIncrement = (productId: string) => {
    incrementCart(productId);
  };

  const handleDecrement = (productId: string) => {
    decrementCart(productId);
  };

  const handlePlaceOrder = () => {
    clearCart();
  };

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8 lg:mb-12">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-sm sm:text-base md:text-lg text-gray-500">
          <p className="font-bold text-xl sm:text-2xl">
            Your cart is empty. Explore our{' '}
            <Link href="/" className="text-blue-600 underline">
              products
            </Link>{' '}
            to start shopping.
          </p>
        </div>
      ) : (
        <div className="max-w-full sm:max-w-5xl lg:max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Cart Items */}
          {cartItems.map(item => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center space-x-4 sm:space-x-6">
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="object-cover rounded-lg border border-gray-200 shadow-md"
                />
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-0">High-quality product to meet your needs.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={() => handleDecrement(item.productId)}
                  className="px-3 py-2 text-xl sm:text-2xl font-bold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  -
                </button>
                <span className="text-lg sm:text-xl font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.productId)}
                  className="px-3 py-2 text-xl sm:text-2xl font-bold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  +
                </button>
                <span className="text-lg sm:text-xl font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-white rounded-xl shadow-lg mt-6 sm:mt-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Total: ${getTotalPrice().toFixed(2)}</h3>
            <div className="space-y-4 sm:space-x-4 sm:space-y-0">
              <Link href="/" passHref>
                <Button
                  className="mt-4 w-full sm:w-auto bg-gray-800 text-white hover:bg-gray-700 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link href={'/orderPlaced'} passHref>
                <Button
                  onClick={handlePlaceOrder}
                  className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Place Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
