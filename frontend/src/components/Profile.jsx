import { Link } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsTelephoneFill } from "react-icons/bs";
import { ImLocation } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Logo from '../media/profile-image.jpg';

const Profile = () => {
  const [centerHeight, setCenterHeight] = useState('60vh')

  // Set the height of the center div to ensure that the content at least fits the height of the screen.
  useEffect(() => {
    const height = window.innerHeight
    const headerHeight = document.getElementById('top-back').offsetHeight
    const footerHeight = document.getElementById('footer').offsetHeight
    const minHeight = height - headerHeight - footerHeight
    setCenterHeight(`${minHeight}px`)
  }, [])

  return (
    <div>
      <div className="bg-color-1 relative" id="top-back">
        <div className="py-4 pl-10 w-fit">
          <Link to='/'>
            <AiOutlineLeft className="text-color-2 absolute left-4 top-5" />
            <p className="text-color-2 font-semibold">BACK</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-color-4" style={{minHeight: `${centerHeight}`}}>
        <div className="grid-span-1 mt-10">
          <img src={Logo} className="mx-auto w-1/2 lg:w-1/3 rounded-full mb-4 profile-pic-border" alt="The Author" />
          <p className="spirax text-center text-base lg:text-xl font-semibold mb-4">Shubham Raj Pandit</p>
          <p className="roboto text-center text-sm lg:text-lg">Look beneath the obvious</p>
          <p className="roboto text-center text-sm lg:text-lg">There is always something bigger hidden</p>
        </div>

        <div className="grid-span-1">
          <div className="px-4 mt-6 lg:mt-10 mb-8">
            <div className="pb-2">
              <p className="font-semibold text-base lg:text-lg text-black">Contact Details</p>
            </div>

            <div className="grid grid-cols-6 my-1 lg:my-5">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <ImLocation className="text-2xl text-color-2 mx-auto mt-5" />
                </div>
              </div>

              <div className="col-span-5">
                <p className="text-sm lg:text-base text-black font-semibold">
                  #415, Padmavathy Paradise, <br />
                  BEML Layout, Brookefield, <br />
                  Bangalore, 560037
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 my-3 lg:my-7">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <MdEmail className="text-xl text-color-2 mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <p className="text-sm lg:text-base text-black font-semibold">
                  shubhamraj465@gmail.com
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 my-3 lg:my-7">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <BsTelephoneFill className="text-xl text-color-2 mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <p className="text-sm lg:text-base text-black font-semibold">
                  +91-9589508180
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile