import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Videos = () => {
  const [data,setData] = useState([])

  useEffect(()=>{
    const fetchingData = async() =>{
          try{
            const response  =  await axios.get('http://localhost:8000/getVideos')
            console.log(response.data)
            setData(response.data)
          }catch(err){
            console.log(err)
            
          }

    }
    fetchingData()

  },[setData])

  return (
    <div>
      <h1>video Management Application</h1>
      {data.length>0 && data.map((eachVideo,index)=>(
        <div key={index}>
          <video src={eachVideo.videoUrl} controls autoPlay></video>
          <div style={{padding:"0px",margin:"0px",display:"flex",flexDirection:"column"}}>
          <h3>{eachVideo.title}</h3>
          <p>{eachVideo.description}</p>
          <p>{eachVideo.tags}</p>
          <p>{eachVideo.size}</p>
          </div>
        </div>

      ))}
    </div>
  )
}

export default Videos