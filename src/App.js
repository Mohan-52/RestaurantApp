import {useState, useEffect} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import CartContex from './context/CartContext'
import Cart from './components/Cart'
import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const App = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [tabList, setTabList] = useState([])
  const [activeTabId, setActiveTabId] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [cartList, setCartList] = useState([])

  async function getRestaurantMenu() {
    setApiStatus(apiStatusConstants.inProgress)
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      const detailsObj = data[0]

      const restDetails = {
        restaurantName: detailsObj.restaurant_name,
        restaurantImage: detailsObj.restaurant_image,
        restaurantId: detailsObj.restaurant_id,
        branchName: detailsObj.branch_name,
      }

      const updatedTabs = detailsObj.table_menu_list.map(eachTab => ({
        categoryDishes: eachTab.category_dishes.map(dish => ({
          addonCat: dish.addonCat,
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          dishCalories: dish.dish_calories,
          dishCurrency: dish.dish_currency,
          dishDescription: dish.dish_description,
          dishId: dish.dish_id,
          dishImage: dish.dish_image,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          nextUrl: dish.nexturl,
          quantity: 0,
        })),
        menuCategory: eachTab.menu_category,
        menuCategoryId: eachTab.menu_category_id,
        menuCategoryImage: eachTab.menu_category_image,
        nexturl: eachTab.nexturl,
      }))

      setRestaurantDetails(restDetails)
      setTabList(updatedTabs)
      setActiveTabId(updatedTabs[0].menuCategoryId)
      setApiStatus(apiStatusConstants.success)
    } catch (err) {
      console.error(err)
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    getRestaurantMenu()
  }, [])

  const removeAllCartItems = () => setCartList([])

  const addCartItem = dish => {
    setCartList(prevState => {
      const isDishExist = prevState.some(
        eachDish => eachDish.dishId === dish.dishId,
      )

      if (isDishExist) {
        return prevState.map(eachDish =>
          eachDish.id === dish.id
            ? {...eachDish, quantity: eachDish.quantity + dish.quantity}
            : eachDish,
        )
      }
      return [...prevState, dish]
    })
  }
  const removeCartItem = dishId => {
    setCartList(prevState =>
      prevState.filter(eachDish => eachDish.id !== dishId),
    )
  }

  const incrementCartItemQuantity = dishId => {
    setTabList(prevTabList =>
      prevTabList.map(eachTab => {
        if (eachTab.menuCategoryId === activeTabId) {
          return {
            ...eachTab,
            categoryDishes: eachTab.categoryDishes.map(eachDish =>
              eachDish.dishId === dishId
                ? {...eachDish, quantity: eachDish.quantity + 1}
                : eachDish,
            ),
          }
        }
        return eachTab
      }),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setTabList(prevState =>
      prevState.map(eachTab => {
        if (eachTab.menuCategoryId === activeTabId) {
          return {
            ...eachTab,
            categoryDishes: eachTab.categoryDishes.map(eachDish => {
              if (eachDish.dishId === dishId) {
                return eachDish.quantity > 0
                  ? {...eachDish, quantity: eachDish.quantity - 1}
                  : eachDish
              }
              return eachDish
            }),
          }
        }
        return eachTab
      }),
    )
  }

  const changeTabs = id => {
    const newTab = tabList.find(eachTab => eachTab.menuCategoryId === id)
    setActiveTabId(newTab.menuCategoryId)
  }

  const successView = () => (
    <CartContex.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        changeTabs,
        restaurantDetails,
        tabList,
        activeTabId,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContex.Provider>
  )

  const loadingView = () => <p>Loading...</p>
  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return loadingView()
      case apiStatusConstants.success:
        return successView()
      default:
        return null
    }
  }

  return <>{renderViews()}</>
}

export default App
