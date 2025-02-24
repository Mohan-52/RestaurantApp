import React from 'react'

const CartContext = React.createContext({
  tabList: [],
  restaurantDetails: {},
  activeTabId: '',
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  changeTabs: () => {},
})

export default CartContext
