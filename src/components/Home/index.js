import {Component} from 'react'
import Header from '../Header'
import TabItem from '../TabItem'
import DishItem from '../DishItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    resturantDetails: {},
    tabList: [],
    activeTab: [],
    apiStatus: apiStatusConstants.initial,
    cartQuantiy: 0,
  }

  componentDidMount() {
    this.getRestaurantMenu()
  }

  getRestaurantMenu = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      const detailsObj = data[0]
      const resturantDetails = {
        restaurantName: detailsObj.restaurant_name,
        restaurantImage: detailsObj.restaurant_image,
        restaurantId: detailsObj.restaurant_id,
        branchName: detailsObj.branch_name,
      }

      const tabs = detailsObj.table_menu_list
      const updatedList = tabs.map(eachTab => ({
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
        })),
        menuCategory: eachTab.menu_category,
        menuCategoryId: eachTab.menu_category_id,
        menuCategoryImage: eachTab.menu_category_image,
        nexturl: eachTab.nexturl,
      }))

      this.setState({
        resturantDetails,
        tabList: updatedList,
        activeTab: updatedList[0],
        apiStatus: apiStatusConstants.success,
      })
    } catch (err) {
      console.log(err)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  incrementCart = () => {
    this.setState(prevState => ({
      cartQuantiy: prevState.cartQuantiy + 1,
    }))
  }

  decrementCart = () => {
    this.setState(prevState => ({
      cartQuantiy: prevState.cartQuantiy - 1,
    }))
  }

  changeTabs = id => {
    const {tabList} = this.state

    const newTab = tabList.find(eachTab => eachTab.menuCategoryId === id)
    this.setState({activeTab: newTab, cartQuantiy: 0})
  }

  loadingView = () => <p>Loding...</p>

  succesView = () => {
    const {resturantDetails, tabList, activeTab, cartQuantiy} = this.state

    return (
      <>
        <Header resturantDetails={resturantDetails} cartQuantiy={cartQuantiy} />

        <ul className="tabs-container">
          {tabList.map(eachTab => (
            <TabItem
              tabDetails={eachTab}
              key={eachTab.menuCategoryId}
              changeTabs={this.changeTabs}
              isActive={activeTab.menuCategoryId === eachTab.menuCategoryId}
            />
          ))}
        </ul>

        <ul className="dishes-container">
          {activeTab.categoryDishes.map(eachDish => (
            <DishItem
              key={eachDish.dishId}
              dishDetails={eachDish}
              decrementCart={this.decrementCart}
              incrementCart={this.incrementCart}
            />
          ))}
        </ul>
      </>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()

      case apiStatusConstants.success:
        return this.succesView()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderViews()}</>
  }
}

export default Home
