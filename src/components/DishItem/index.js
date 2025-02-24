import {useState} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const vegImg = 'https://ibb.co/B56gb517'

const nonVegImg = 'https://ibb.co/fGkHsZgg'

const DishItem = props => {
  const [eachQuant, setQuant] = useState(0)
  const {
    dishDetails,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = props
  const {
    addonCat,
    dishName,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishPrice,
    dishType,
    dishId,
    quantity,
  } = dishDetails

  const handleIncrement = () => {
    incrementCartItemQuantity(dishId)
    setQuant(prevState => prevState + 1)
  }

  const handleDecrement = () => {
    decrementCartItemQuantity(dishId)
    if (setQuant > 0) {
      setQuant(prevState => prevState - 1)
    }
  }

  const cartAddOrRemove = () => (
    <div className="add-remove-con">
      <button className="btn" onClick={handleDecrement} type="button">
        -
      </button>
      {eachQuant}
      <button className="btn" onClick={handleIncrement} type="button">
        +
      </button>
    </div>
  )

  const verOrNonVegUrl = dishType === 2 ? vegImg : nonVegImg

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const handleAddtoCart = () => {
          addCartItem(dishDetails)
          setQuant(0)
        }

        return (
          <li className="dish-card">
            <img src={verOrNonVegUrl} alt="veg-or-non-img" />
            <div className="dish-details">
              <p>{dishName}</p>
              <p>
                {dishCurrency} {dishPrice}
              </p>
              <p>{dishDescription}</p>
              {dishAvailability ? cartAddOrRemove() : 'Not available'}
              {quantity > 0 && (
                <button type="button" onClick={handleAddtoCart}>
                  Add to cart
                </button>
              )}
              {addonCat.length !== 0 && <p>Customizations available</p>}
            </div>
            <p>{dishCalories} calories</p>
            <div>
              <img src={dishImage} alt="dishImg" className="dishImg" />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
