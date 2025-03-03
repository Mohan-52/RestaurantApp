import './index.css'

const TabItem = props => {
  const {tabDetails, changeTabs, isActive} = props
  const {menuCategory, menuCategoryId} = tabDetails

  const tabClsName = isActive && 'active-tab'

  return (
    <li>
      <button
        type="button"
        className={`menu-btn ${tabClsName}`}
        onClick={() => changeTabs(menuCategoryId)}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
