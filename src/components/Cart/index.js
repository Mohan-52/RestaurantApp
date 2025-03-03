import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const Cart = props => {
  const {history} = props

  const emptyCartView = () => (
    <div className="empty-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty-cart"
        className="empty-img"
      />
      <p className="no-p">No items in the cart.</p>
      <button
        type="button"
        onClick={() => history.push('/')}
        className="shop-btn"
      >
        Shop
      </button>
    </div>
  )

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantDetails, removeAllCartItems} = value

        const showCart = () => (
          <div className="cart-conatiner">
            <button
              type="button"
              className="remove-all-btn"
              onClick={() => removeAllCartItems()}
            >
              Remove All
            </button>
            <ul>
              {cartList.map(eachDish => (
                <CartItem dishDetails={eachDish} key={eachDish.dishId} />
              ))}
            </ul>
          </div>
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
