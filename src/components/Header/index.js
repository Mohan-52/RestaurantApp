import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {resturantDetails} = props
  const {restaurantName} = resturantDetails

  const handleLogOut = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.push('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="nav-bar">
            <Link to="/" className="styled-link">
              <h1 className="restaurant-name">{restaurantName}</h1>
            </Link>

            <div className="orders-icons-con">
              <p className="my-order-para">My Orders</p>
              <Link to="/cart">
                <button
                  type="button"
                  className="cart-container"
                  data-testid="cart"
                >
                  <IoCartOutline className="cart-icon" />
                </button>
                <p className="cart-quantity">{cartList.length}</p>
              </Link>
              <button
                type="button"
                onClick={handleLogOut}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
