import React from 'react'

const Ads = ({ image }) => {
  return (
    <div className="m-2 flex items-center justify-center bg-[url('https://ourpart.mydsact.org/wp-content/uploads/2017/10/ad-placeholder.jpg')] bg-contain bg-center shadow-md">
      <div className='flex h-72 max-h-80'>
        {image && <img src={image} />}
      </div>
    </div>
  )
}

export default Ads
