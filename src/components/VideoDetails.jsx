import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillCheckCircleFill } from "react-icons/bs"
import { AiOutlineLike } from "react-icons/ai"
import { abbreviateNumber } from "js-abbreviation-number"
import { fetchDataFromApi } from '../utils/api'
import useContextApi from "../context/ContextApi"
import SuggestionVideo from './SuggestionVideo'
import videoData from "../../video.json";
import related from "../../related-content.json"
import ReactPlayer from 'react-player'

const VideoDetails = () => {
  const { setLoading } = useContextApi()
  const { id } = useParams()
  const [video, setVideo] = useState(videoData)
  const [relatedVideos, setRelatedVideos] = useState(related.contents)

  console.log(video)
  console.log(relatedVideos)
  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails()
    fetchRelatedVideos()
  }, [id])

  const fetchVideoDetails = () => {
    setLoading(true)
    fetchDataFromApi(`video/details/?id=${id}`)
      .then((e) => {
        setVideo(e)
        setLoading(false)
      })
  }

  const fetchRelatedVideos = () => {
    setLoading(true)
    fetchDataFromApi(`video/related-contents/?id=${id}`)
      .then((e) => {
        setRelatedVideos(e.contents)
        setLoading(false)
      })
  }


  return (
    <div className='flex justify-center bg-black flex-row h-[calc(100%-56px)] '>
      <div className='w-full max-w-[1280px] flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-500px)] px-4 py-3 lg:py-6 overflow-y-auto'>
          <div className='h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-5 mr-[-16px] lg:mr-0 rounded-sm overflow-hidden'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width={"100%"}
              height={"100%"}
              style={{ backgroundColor: "black" }}
            />
          </div>

          <div className='text-white font-bold text-sm md:text-xl mt-4 h-12 line-clamp-2 lg:ml-5'>
            {video?.title}
          </div>

          <div className='flex justify-between flex-col mt-4 md:flex-row lg:ml-5'>
            <div className='flex'>
              <div className='flex items-start'>
                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                  <img className='h-full w-full object-cover' src={video?.author?.avatar?.[0]?.url} alt="" />
                </div>
              </div>

              <div className='flex flex-col ml-3'>
                <div className='text-white flex items-center font-semibold '>
                  {
                    video?.author?.title
                  }
                  {
                    video?.author?.badges[0]?.type == "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1' />
                    )
                  }
                </div>

                <div className='text-white/[0.7] text-sm'>
                  {video?.author?.stats?.subscribersText}
                </div>

              </div>
            </div>

            <div className='text-white flex mt-4 md:mt-0'>
              <div className='flex items-center justify-center h-11 px-6 cursor-pointer rounded-3xl bg-white/[0.15]'>
                <AiOutlineLike className='text-xl text-white mr-2' />
                <span>{`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}</span>
              </div>
              <div className='flex items-center justify-center h-11 px-6 cursor-pointer rounded-3xl bg-white/[0.15] ml-4'>
                {/* <AiOutlineLike className='text-xl text-white mr-2' /> */}
                <span>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
              </div>
            </div>


          </div>
        </div>

        <div className='flex flex-col py-6 px-4 overflow-y-auto lg:w-[300px] xl:w-[400px]' id='hide-scrollbar'>
          {
            relatedVideos?.map((item, index) => {
              if (item?.type != "video") return false
              return (
                <SuggestionVideo key={index} video={item?.video} />
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default VideoDetails
