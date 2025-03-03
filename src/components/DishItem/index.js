import {useState} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const vegImg = () => (
  <img
    src="https://i.postimg.cc/YqYL4tgy/veg.png"
    alt="veg-img"
    className="veg-img"
  />
)

const nonVegImg = () => (
  <img
    src="https://i.postimg.cc/rsJmJwJ8/nnveg.png"
    alt="non-veg"
    className="non-veg-img"
  />
)

const DishItem = props => {
  const [quantity, setQuant] = useState(0)
  const {dishDetails} = props
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

  const handleIncrement = () => {
    setQuant(prevState => prevState + 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuant(prevState => prevState - 1)
    }
  }

  const cartAddOrRemove = () => (
    <div className="add-remove-con">
      <button className="btn" onClick={handleDecrement} type="button">
        -
      </button>
      {quantity}
      <button className="btn" onClick={handleIncrement} type="button">
        +
      </button>
    </div>
  )

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const handleAddtoCart = () => {
          addCartItem({...dishDetails, quantity})
          setQuant(0)
        }

        return (
          <li className="dish-card">
            <div className="dish-details">
              {dishType === 2 ? vegImg() : nonVegImg()}
              <div>
                <p className="dishName"> {dishName}</p>
                <p>
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? cartAddOrRemove() : 'Not available'}
                {quantity > 0 && (
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={handleAddtoCart}
                  >
                    Add to cart
                  </button>
                )}
                {addonCat.length !== 0 && (
                  <p className="customization-para">Customizations available</p>
                )}
              </div>
            </div>
            <p className="calories-p">{dishCalories} calories</p>
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
