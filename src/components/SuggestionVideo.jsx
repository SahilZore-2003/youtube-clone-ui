import React from 'react'
import { Link } from "react-router-dom"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { abbreviateNumber } from "js-abbreviation-number"
import VideoLength from '../shared/VideoLength'


const SuggestionVideo = ({ video }) => {

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className='flex mb-3 '>
        <div className='relative overflow-hidden h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-[32px] lg:min-w-[128px] xl-w-[40] xl:min-w-[168px] rounded-xl bg-slate-800'>
          <img className='h-full w-full object-cover' src={video?.thumbnails[0]?.url} alt="" />
          {
            video.lengthSeconds && (
              <VideoLength time={video.lengthSeconds} />
            )
          }
        </div>
        <div className='flex text-white mt-3'>
          <div className='flex flex-col ml-3 overflow-hidden'>
            <span className='text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white'>
              {video?.title}
            </span>
            <span className='text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center '>
              {
                video?.author?.title
              }
              {
                video?.author?.badges[0]?.type == "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1' />
                )
              }
            </span>
            <div className='flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden'>
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className='flex text-[24px] leading-none relative top-[-10px] font-bold text-white/[0.7] mx-1'>
                .
              </span>
              <span className='truncate'>
                {video?.publishedTimeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SuggestionVideo
