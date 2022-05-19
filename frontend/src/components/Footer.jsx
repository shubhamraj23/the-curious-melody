import { MdEmail, MdWeb, MdMeetingRoom } from "react-icons/md";
import { ImLocation } from "react-icons/im";

const Footer = () => {
  return (
    <div className="bg-emerald-300">
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="px-4">
            <div className="pb-2">
              <p className="font-semibold text-base md:text-lg text-white">Contact Details</p>
            </div>

            <div className="grid grid-cols-6 mb-2">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <ImLocation className="text-lg text-black mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <p className="text-sm md:text-base text-black">
                  #415, Padmavathy Paradise, <br />
                  BEML Layout, Brookefield, <br />
                  Bangalore, 560037
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 my-2">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <MdEmail className="text-lg text-black mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <p className="text-sm md:text-base text-black">
                  shubhamraj465@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="pb-2">
              <p className="font-semibold text-base md:text-lg text-white">Other Projects to check out</p>
            </div>

            <div className="grid grid-cols-6 mb-2">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <MdWeb className="text-lg text-black mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <a href="https://shubhamraj23.github.io/personal-portfolio" target="_blank" rel="noreferrer">
                  <p className="text-sm md:text-base text-green-900 font-semibold">
                    Personal Portfolio
                  </p>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-6 my-2">
              <div className="col-span-1">
                <div className="flex align-middle">
                  <MdMeetingRoom className="text-lg text-black mx-auto" />
                </div>
              </div>

              <div className="col-span-5">
                <a href="https://shubhamraj23.github.io/escape-room" target="_blank" rel="noreferrer">
                  <p className="text-sm md:text-base text-green-900 font-semibold">
                    Virtual Escape Room
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer