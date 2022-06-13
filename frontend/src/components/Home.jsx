import logo from '../media/logo.jpg'

const Home = () => {
  return (
    <div>
      <div className="bg-shade-1">
        <div className="flex items-center justify-center h-screen w-1/3 md:w-1/4">
          <img src={logo} alt="The Curious Melody Logo" />
        </div>
      </div>
    </div>
  )
}

export default Home
