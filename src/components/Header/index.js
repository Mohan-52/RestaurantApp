import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {resturantDetails, cartQuantiy} = props
  const {restaurantName} = resturantDetails
  return (
    <nav className="nav-bar">
      <h1>{restaurantName}</h1>
      <div className="orders-icons-con">
        <p className="my-order-para">My Orders</p>
        <div className="cart-container">
          <IoCartOutline className="cart-icon" />
          <p className="cart-quantity">{cartQuantiy}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
