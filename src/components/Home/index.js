import Header from '../Header'
import TabItem from '../TabItem'
import DishItem from '../DishItem'
import CartContex from '../../context/CartContext'
import './index.css'

const Home = () => (
  <CartContex.Consumer>
    {value => {
      const {tabList, activeTabId, restaurantDetails, changeTabs} = value
      const activeTabData = tabList.find(
        eachTab => eachTab.menuCategoryId === activeTabId,
      )
      const filteredDishes = activeTabData ? activeTabData.categoryDishes : []

      return (
        <>
          <Header resturantDetails={restaurantDetails} />
          <ul className="tabs-container">
            {tabList.map(eachTab => (
              <TabItem
                key={eachTab.menuCategoryId}
                tabDetails={eachTab}
                changeTabs={changeTabs}
                isActive={activeTabId === eachTab.menuCategoryId}
              />
            ))}
          </ul>
          <ul className="dishes-container">
            {filteredDishes.map(eachDish => (
              <DishItem key={eachDish.dishId} dishDetails={eachDish} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContex.Consumer>
)

export default Home
