import React, { useState, useEffect } from 'react'
import useContextApi from '../context/ContextApi'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from "../utils/api"
import data from "../../related-content.json"
import LeftNav from './LeftNav'
import SearchResultVideo from "../components/SearchResultVideo"


const SearchResult = () => {
  const { searchQuery } = useParams()
  const [result, setResult] = useState()
  const { setLoading } = useContextApi()

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h")
    fetchSearchResult()
  }, [searchQuery]);

  const fetchSearchResult = () => {
    setLoading(true)
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents)
      setLoading(false)
    })
  }

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav />
      <div className='grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black' id='hide-scrollbar'>
        <div className='grid grid-cols-1 gap-2 p-5'>
          {
            result?.map((item, index) => {
              if (item?.type != "video") return false
              return (
                <SearchResultVideo key={item?.video?.videoId} video={item?.video} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchResult
