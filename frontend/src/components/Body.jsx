import { useState, useEffect } from "react"

const Body = () => {
  const [view, setView] = useState('post')
  const [postDiv, setPostDiv] = useState('home-button-border pointer-events-none')
  const [postText, setPostText] = useState('text-color-3')
  const [collectionDiv, setCollectionDiv] = useState('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
  const [collectionText, setCollectionText] = useState('')

  useEffect(() => {
    if (view === 'post'){
      setPostDiv('home-button-border pointer-events-none')
      setPostText('text-color-3')
      setCollectionDiv('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
      setCollectionText('')
    }
    else {
      setPostDiv('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
      setPostText('')
      setCollectionDiv('home-button-border pointer-events-none')
      setCollectionText('text-color-3')
    }
  }, [view])

  const changeView = () => {
    if (view === 'post') {
      setView('collection')
    }
    else {
      setView('post')
    }
  }

  return (
    <div className="bg-color-4">
      <div className="grid grid-cols-2">
        <div className={`grid-span-1 py-4 w-fit mx-auto px-4 md:px-10 ${postDiv}`} onClick={changeView}>
          <p className={`text-center font-bold ${postText}`}>Recent Posts</p>
        </div>

        <div className={`grid-span-1 py-4 w-fit mx-auto px-4 md:px-10 ${collectionDiv}`} onClick={changeView}>
          <p className={`text-center font-bold ${collectionText}`}>Recent Collections</p>
        </div>
      </div>
    </div>
  )
}

export default Body
