// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, onTabChange, activeTab} = props
  const {language, id} = item
  const className = activeTab === id ? 'active' : ''
  const getId = () => {
    onTabChange(id)
  }

  return (
    <button type="button" className={`button ${className}`} onClick={getId}>
      <li className="item">{language}</li>
    </button>
  )
}

export default LanguageFilterItem
