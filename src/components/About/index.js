import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
}

class About extends Component {
  state = {faqsData: [], activeStatus: statusConstants.initial}

  componentDidMount() {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    this.setState({activeStatus: statusConstants.inProgress})

    const aboutUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(aboutUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.getSuccessView(data)
      this.setState({activeStatus: statusConstants.success})
    }
  }

  getSuccessView = data => {
    const updatedData = data.faq
    console.log(updatedData)
    this.setState({faqsData: updatedData})
  }

  renderSuccessView = () => {
    const {faqsData} = this.state

    return (
      <>
        <Header />
        <h1 className="about-heading">About</h1>
        <p className="last-update">Last update on </p>
        <p className="distribution-ready-para">
          COVID-19 vaccines be ready for distribution
        </p>

        <ul className="faqs-list-container" testid="faqsUnorderedList">
          {faqsData.map(eachFaq => (
            <li key={eachFaq.qno}>
              <p className="question">{eachFaq.question}</p>
              <p className="answer">{eachFaq.answer}</p>
            </li>
          ))}
        </ul>

        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="aboutRouteLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="about-container">{this.renderViews()}</div>
  }
}

export default About
