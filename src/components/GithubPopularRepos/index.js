import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'
// Write your code here
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeTab: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const data1 = data.popular_repos

      const updatedData = data1.map(each => ({
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        id: each.id,
      }))

      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onTabChange = id => {
    this.setState(
      {
        activeTab: id,
      },
      this.getReposList,
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <p className="text">failure View</p>
    </div>
  )

  renderReposItem = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(each => (
          <RepositoryItem item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderReposItem()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="app-container">
        <div className="main-container">
          <h1 className="heading">Popular</h1>
          <ul className="header">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                item={each}
                key={each.id}
                onTabChange={this.onTabChange}
                activeTab={activeTab}
              />
            ))}
          </ul>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
