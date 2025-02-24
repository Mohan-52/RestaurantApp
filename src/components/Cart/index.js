import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'

const Cart = () => {
  const emptyCartView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty-cart"
    />
  )

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantDetails, removeAllCartItems} = value

        const showCart = () => (
          <>
            <button onClick={() => removeAllCartItems()}>Remove All</button>
            <ul>
              {cartList.map(eachDish => (
                <CartItem dishDetails={eachDish} key={eachDish.dishId} />
              ))}
            </ul>
          </>
        )
        return (
          <>
            <Header resturantDetails={restaurantDetails} />
            {cartList.length === 0 ? emptyCartView() : showCart()}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
