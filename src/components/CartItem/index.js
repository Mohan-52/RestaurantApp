const CartItem = props => {
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
    quantity,
  } = dishDetails

  return (
    <li>
      <img src={dishImage} alt={dishName} className="dishImg" />
      <p>{dishName}</p>
    </li>
  )
}

export default CartItem
