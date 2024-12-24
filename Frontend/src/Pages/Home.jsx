import {useForm} from 'react-hook-form'

import React,{useState,useEffect} from 'react'
import axios from 'axios';

const Home = () => {
    // const {register,handleSubmit} = useForm();
    const [formdata,setFormData] = useState({
        title:"",
        description:"",
        videoUrl:"",
        tags:"",
        size:""
    })
    const [videoPreviewURL,setVideoPreviewURL] = useState('')

    const inputHandler = (e) =>{
        // const {name,value} = e.target.value
        setFormData({...formdata, [e.target.name] : e.target.value})
    }
    const handleFileChange = (e) =>{
        if (e.target.files[0]){
            const file = e.target.files[0];
            const newVideoUrl = URL.createObjectURL(file);
            setVideoPreviewURL(newVideoUrl);
            setFormData({...formdata,videoUrl:newVideoUrl})
        }
    }

    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        // setFormData({...formdata,videoUrl:videoPreviewURL})
        try{
            const response = await axios.post('http://localhost:8000/videos',formdata, {
                headers: {
                   
                  "x-token": localStorage.getItem("token"),
                },
              })
            console.log('Response:', response.data);
            alert('Video uploaded successfully!');
        }catch(err){
            console.error('Error uploading video:', err);
            alert('Failed to upload video.');

        }
    }

  return (
    <div>
        <h1>Upload video</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input  name="title" placeholder="Enter the title" onChange={inputHandler} required/>
            </div>
            <div>
                <label>description</label>
                <input name="description" placeholder="description" onChange={inputHandler} required/>
            </div>
            <div>
                <label>upload video file</label>
                <input  type="file" accept="video/*" placeholder="description"
                onChange={handleFileChange} required   name="videoUrl" 
                />
                {videoPreviewURL && (
                <div>
                    <h3>Video Preview:</h3>
                    <video controls width="500" src={videoPreviewURL}></video>
                </div>
            )}
            </div>
            <div>
                <label>tags</label>
                <input name="tags" type="text" placeholder="Enter the tags with comma separated" onChange={inputHandler} required/>
            </div>
            <div>
                <label>Size</label>
                <input name="size" type="number" placeholder="size of the file" onChange={inputHandler} required/>
            </div>
            <div><button type="submit">Submit</button></div>
            
            
            
            
        </form>
    </div>
  )
}

export default Home