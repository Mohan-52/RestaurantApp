import './index.css'

const TabItem = props => {
  const {tabDetails, changeTabs, isActive} = props
  const {menuCategory, menuCategoryId} = tabDetails

  const tabClsName = isActive && 'active-tab'

  return (
    <li>
      <button
        className={`menu-btn ${tabClsName}`}
        type="button"
        onClick={() => changeTabs(menuCategoryId)}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
