// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = item

  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p className="issue">{starsCount}</p>
      </div>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p className="issue">{forksCount}</p>
      </div>
      <div className="issue-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p className="issue">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
