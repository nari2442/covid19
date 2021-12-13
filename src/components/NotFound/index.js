import './index.css'

const NotFound = props => {
  const clickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dxv46yb6u/image/upload/v1638877261/Vector_5_uprztn.png"
        alt="not-found-pic"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" onClick={clickHome} className="home-btn">
        Home
      </button>
    </div>
  )
}
export default NotFound
