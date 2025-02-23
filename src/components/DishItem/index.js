import {useState} from 'react'

import './index.css'

const vegImg = 'https://ibb.co/B56gb517'

const nonVegImg = 'https://ibb.co/fGkHsZgg'

const DishItem = props => {
  const {dishDetails, decrementCart, incrementCart} = props
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
  } = dishDetails

  const [eachQuantity, setQuantity] = useState(0)

  const handleIncrement = () => {
    setQuantity(prevState => prevState + 1)
    incrementCart()
  }

  const handleDecrement = () => {
    if (eachQuantity > 0) {
      setQuantity(prevState => prevState - 1)
      decrementCart()
    }
  }

  const cartAddOrRemove = () => {
    return (
      <div className="add-remove-con">
        <button className="btn" onClick={handleDecrement}>
          -
        </button>
        {eachQuantity}
        <button className="btn" onClick={handleIncrement}>
          +
        </button>
      </div>
    )
  }

  const verOrNonVegUrl = dishType === 2 ? vegImg : nonVegImg

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
        {addonCat.length !== 0 && <p>Customizations available</p>}
      </div>
      <p>{dishCalories} calories</p>
      <div>
        <img src={dishImage} alt="dishImg" className="dishImg" />
      </div>
    </li>
  )
}

export default DishItem
