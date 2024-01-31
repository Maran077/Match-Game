import './index.css'

const FruitTab = ({tab, activeTab, changeTab}) => {
  const {displayText, tabId} = tab
  return (
    <li className="fruit-tab">
      <button
        onClick={() => changeTab(tabId)}
        className={activeTab === tabId ? 'active-tab' : 'tab'}
      >
        {displayText}
      </button>
    </li>
  )
}

export default FruitTab
