import { useState, useEffect } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { GoCheck } from "react-icons/go";

const Filters = () => {
  // Type Dropdowns
  const [typeDropdown, setTypeDropdown] = useState('down')
  const [typeHeight, setTypeHeight] = useState('0px')
  const [typeWidth, setTypeWidth] = useState('auto')
  const [type, setType] = useState('all')

  // lang Dropdowns
  const [langDropdown, setLangDropdown] = useState('down')
  const [langHeight, setLangHeight] = useState('0px')
  const [langWidth, setLangWidth] = useState('auto')
  const [lang, setLang] = useState('all')

  // Set the width of the dropdowns
  useEffect(() => {
    const typeDropWidth = document.getElementById('type-dropdown').offsetWidth
    const langDropWidth = document.getElementById('lang-dropdown').offsetWidth

    setTypeWidth(`${typeDropWidth}px`)
    setLangWidth(`${langDropWidth}px`)
  }, [])

  // Trigger when type drop down is clicked.
  useEffect(() => {
    (typeDropdown === 'down') ? setTypeHeight('0px') : setTypeHeight('auto')
  }, [typeDropdown])

  // Trigger when lang drop down is clicked.
  useEffect(() => {
    (langDropdown === 'down') ? setLangHeight('0px') : setLangHeight('auto')
  }, [langDropdown])

  // Make changes when the type filter changes.
  useEffect(() => {
    setTypeDropdown('down')
  }, [type])

  // Make changes when the lang filter changes.
  useEffect(() => {
    setLangDropdown('down')
  }, [lang])

  // Function to change the state of type dropdown.
  const changeTypeDropdown = () => {
    (typeDropdown === 'up') ? setTypeDropdown('down') : setTypeDropdown('up')
    setLangDropdown('down')
  }

  // Function to change the state of lang dropdown.
  const changeLangDropdown = () => {
    (langDropdown === 'up') ? setLangDropdown('down') : setLangDropdown('up')
    setTypeDropdown('down')
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      <div className="grid-span-1 relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full md:w-fit justify-center mx-auto rounded-md border border-gray-300 shadow-sm px-4 md:px-10 py-2 bg-white text-sm font-medium text-black focus:outline-none"
            id="type-dropdown"
            onClick={changeTypeDropdown}
            >
            Type of Posts
            <AiFillCaretDown className={`-mr-1 ml-2 h-5 w-5 ${(typeDropdown === 'up' && 'hidden')}`} />
            <AiFillCaretUp className={`-mr-1 ml-2 h-5 w-5 ${(typeDropdown === 'down' && 'hidden')}`} />
          </button>
        </div>

        <div class="absolute left-0 mt-2 rounded-md shadow-lg bg-white focus:outline-none overflow-hidden" style={{height: `${typeHeight}`}}>
          <div class="py-1" style={{width: `${typeWidth}`}}>
            <div className="relative">
              <p 
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(type !== 'all') && 'cursor-pointer'}`}
                onClick={() => setType('all')}
                >
                All
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(type !== 'all') && 'hidden'}`} />
            </div>
            
            <div className="relative">
              <p
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(type !== 'articles') && 'cursor-pointer'}`}
                onClick={() => setType('articles')}
                >
                Articles
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(type !== 'articles') && 'hidden'}`} />
            </div>

            <div className="relative">
              <p
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(type !== 'poems') && 'cursor-pointer'}`}
                onClick={() => setType('poems')}
                >
                Poems
                </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(type !== 'poems') && 'hidden'}`} />
            </div>

            <div className="relative">
              <p 
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(type !== 'stories') && 'cursor-pointer'}`}
                onClick={() => setType('stories')}
                >
                Stories
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(type !== 'stories') && 'hidden'}`} />
            </div>

            <div className="relative">
              <p 
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(type !== 'microtales') && 'cursor-pointer'}`}
                onClick={() => setType('microtales')}
                >
                Microtales
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(type !== 'microtales') && 'hidden'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-span-1 relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full md:w-fit justify-center mx-auto rounded-md border border-gray-300 shadow-sm px-4 md:px-10 py-2 bg-white text-sm font-medium text-black focus:outline-none"
            id="lang-dropdown"
            onClick={changeLangDropdown}
            >
            Language
            <AiFillCaretDown className={`-mr-1 ml-2 h-5 w-5 ${(langDropdown === 'up' && 'hidden')}`} />
            <AiFillCaretUp className={`-mr-1 ml-2 h-5 w-5 ${(langDropdown === 'down' && 'hidden')}`} />
          </button>
        </div>

        <div class="absolute left-0 mt-2 rounded-md shadow-lg bg-white focus:outline-none overflow-hidden" style={{height: `${langHeight}`}}>
          <div class="py-1" style={{width: `${langWidth}`}}>
            <div className="relative">
              <p 
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(lang !== 'all') && 'cursor-pointer'}`}
                onClick={() => setLang('all')}
                >
                All
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(lang !== 'all') && 'hidden'}`} />
            </div>

            <div className="relative">
              <p
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(lang !== 'English') && 'cursor-pointer'}`}
                onClick={() => setLang('english')}
                >
                English
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(lang !== 'english') && 'hidden'}`} />
            </div>

            <div className="relative">
              <p 
                class={`text-gray-800 block px-4 py-2 text-sm hover:bg-color-5 ${(lang !== 'hindi') && 'cursor-pointer'}`}
                onClick={() => setLang('hindi')}
                >
                Hindi
              </p>
              <GoCheck className={`absolute right-4 bottom-0 h-9 ${(lang !== 'hindi') && 'hidden'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-span-1 col-start-2 md:col-start-3">
        <button
          type="button"
          className="inline-flex w-full md:w-fit justify-center mx-auto rounded-md border border-gray-300 shadow-sm px-4 md:px-10 py-2 bg-color-5 text-sm font-medium text-black focus:outline-none reset-button"
          onClick={() => {setType('all'); setLang('all')}}
          >
        RESET ALL
        </button>
      </div>
    </div>
  )
}

export default Filters