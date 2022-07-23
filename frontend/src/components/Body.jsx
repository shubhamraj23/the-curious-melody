import axios from 'axios';
import { useState, useEffect } from 'react';
import Filters from './Filters';
import PostHeader from './PostHeader';
import CollectionHeader from './CollectionHeader';
import Spinner from '../media/spinner.gif';

const Body = () => {
  // Set the view to one of post or collection.
  const [view, setView] = useState('post')

  // Format the border and text of active and inactive tabs.
  const [postDiv, setPostDiv] = useState('home-button-border pointer-events-none')
  const [postText, setPostText] = useState('text-color-3')
  const [collectionDiv, setCollectionDiv] = useState('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
  const [collectionText, setCollectionText] = useState('')
  
  // Loading, error, fetch status and data.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [postFetchStatus, setPostFetchStatus] = useState(false)
  const [collectionFetchStatus, setCollectionFetchStatus] = useState(false)
  const [postData, setPostData] = useState()
  const [collectionData, setCollectionData] = useState()

  // The filters used for the posts.
  const [type, setType] = useState('all')
  const [lang, setLang] = useState('all')

  // Triger the fetching and change the states when the view changes.
  useEffect(() => {
    if (view === 'post'){
      // Make structural changes before fetching.
      setPostDiv('home-button-border pointer-events-none')
      setPostText('text-color-3')
      setCollectionDiv('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
      setCollectionText('')
      setLoading(false)
      setError(false)

      if (!postFetchStatus) {   // Fetch only if it hasn't been fetched successfully before.
        fetchPosts()
      }
    }
    else {
      // Make structural changes before fetching.
      setPostDiv('hover:cursor-pointer hover:home-button-hover-border hover:text-color-2')
      setPostText('')
      setCollectionDiv('home-button-border pointer-events-none')
      setCollectionText('text-color-3')
      setLoading(false)
      setError(false)

      if (!collectionFetchStatus) {    // Fetch only if it hasn't been fetched successfully before.
        fetchCollections()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  // Fetch the data whenever the filters change.
  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, lang])

  // Function to trigger the change between posts and collections.
  const changeView = () => {
    if (view === 'post') {
      setView('collection')
    }
    else {
      setView('post')
    }
  }

  // Fetch the posts from the backend and set the other states.
  const fetchPosts = async () => {
    try {
      setLoading(true)

      let data = undefined
      if (type === 'all' && lang === 'all') {
        data = await axios.get('/recentPosts')
      }
      else if (type === 'all') {
        data = await axios.get(`/recentPosts?lang=${lang}`)
      }
      else if (lang === 'all') {
        data = await axios.get(`/recentPosts?type=${type}`)
      }
      else {
        data = await axios.get(`/recentPosts?type=${type}&lang=${lang}`)
      }

      if (data.status !== 200) {
        throw new Error()
      }
      setPostData(data.data)
      setPostFetchStatus(true)
      setLoading(false)
      setError(false)
    }
    catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  // Fetch the collections from the backend.
  const fetchCollections = async () => {
    try {
      setLoading(true)
      const data = await axios.get('/recentCollections')
      if (data.status !== 200) {
        throw new Error()
      }
      setCollectionData(data.data)
      setCollectionFetchStatus(true)
      setLoading(false)
      setError(false)
    }
    catch (e) {
      setLoading(false)
      setError(true)
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

      {/* Display only if the view is set to post */}
      {view === 'post' && postData && !loading &&
        <div className="py-4 mx-4 md:mx-20">
          <Filters type={type} setType={setType} lang={lang} setLang={setLang} />

          <div>
            {postData.map((item) => {
              return <PostHeader item={item} />
            })}
          </div>
        </div>
      }

      {/* Display only if the view is set to collection */}
      {view === 'collection' && collectionData &&
        <div>
          {collectionData.map((item) => {
            return <CollectionHeader item={item} />
          })}
        </div>
      }

      {/* Display only when loading is true. */}
      {loading && 
        <div className="py-4">
          <img src={Spinner} className="mx-auto" alt="Loading" />
        </div>
      }

      {/* Display only when error is true. */}
      {error &&
        <div className="py-10 px-4">
          <p className="text-center">Something unexpected happened. Please try again after a while.</p>
        </div>
      }

    </div>
  )
}

export default Body