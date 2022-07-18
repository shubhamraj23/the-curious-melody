import { MdWeb, MdMeetingRoom } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="bg-color-1" id="footer">
      <div className="py-4">
        <div className="px-4">
          <div className="pb-2">
            <p className="font-semibold text-base md:text-lg text-color-3">Other Projects to check out</p>
          </div>

          <div className="grid grid-cols-6 md:grid-cols-12 mb-2">
            <div className="col-span-1">
              <div className="flex align-middle">
                <MdWeb className="text-lg text-color-2 mx-auto" />
              </div>
            </div>

            <div className="col-span-5">
              <a href="https://shubhamraj23.github.io/personal-portfolio" target="_blank" rel="noreferrer">
                <p className="text-sm md:text-base text-color-2 font-semibold hover:text-white">
                  Personal Portfolio
                </p>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-6 md:grid-cols-12 my-2">
            <div className="col-span-1">
              <div className="flex align-middle">
                <MdMeetingRoom className="text-lg text-color-2 mx-auto" />
              </div>
            </div>

            <div className="col-span-5">
              <a href="https://shubhamraj23.github.io/escape-room" target="_blank" rel="noreferrer">
                <p className="text-sm md:text-base text-color-2 font-semibold hover:text-white">
                  The Lost City of Alexandra
                </p>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm text-white">&#169; Shubham Raj Pandit</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer