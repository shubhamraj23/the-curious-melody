import { MdEmail, MdOutlineMyLocation, MdWeb, MdMeetingRoom } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-emerald-300">
      <div className="py-4">
        <div className="flex">
          <div className="w-2/3 md:w-1/2">
            <div className="px-2">
              <div>
                <p className="mx-auto font-semibold text-center text-base md:text-lg text-white baseline">Contact</p>
              </div>

              <div className="">
                <div className="flex">
                  <div className="mx-auto">
                    <div className="py-2">
                      <MdOutlineMyLocation className="text-lg text-white mx-auto" />
                    </div>

                    <div className="">
                      <p className="text-sm md:text-base text-black">
                        #415, Padmavathy Paradise, <br />
                        BEML Layout, Brookefield, <br />
                        Bangalore, 560037
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mx-auto">
                    <div className="py-2">
                      <MdEmail className="text-lg text-white mx-auto" />
                    </div>

                    <div className="">
                      <p className="text-sm md:text-base text-black">
                        shubhamraj465@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/3 md:w-1/2">
            <div className="px-2">
              <div>
                <p className="mx-auto font-semibold text-center text-base md:text-lg text-white baseline">Other Projects</p>
              </div>

              <div className="">
                <div className="flex">
                  <div className="mx-auto">
                    <div className="py-2">
                      <MdWeb className="text-lg text-white mx-auto" />
                    </div>

                    <div className="">
                      <a href="https://shubhamraj23.github.io/personal-portfolio" target="_blank" rel="noreferrer">
                        <p className="text-sm md:text-base text-green-900 font-semibold text-center">
                          Personal Portfolio
                        </p>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mx-auto">
                    <div className="py-2">
                      <MdMeetingRoom className="text-lg text-white mx-auto" />
                    </div>

                    <div className="">
                      <a href="https://shubhamraj23.github.io/escape-room" target="_blank" rel="noreferrer">
                        <p className="text-sm md:text-base text-green-900 font-semibold text-center">
                          Virtual Escape Room
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer