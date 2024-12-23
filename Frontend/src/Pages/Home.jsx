import {useForm} from 'react-hook-form'

import React from 'react'

const Home = () => {
    const {register,handleSubmit} = useForm();
    const onSubmit = (data) =>console.log(data)

  return (
    <div>
        <h1>Upload video</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title</label>
                <input {...register('title')} placeholder="Enter the title"/>
            </div>
            <div>
                <label>description</label>
                <input {...register('description')} placeholder="description"/>
            </div>
            <div>
                <label>upload video file</label>
                <input {...register('videoFile')} type="file" placeholder="description"/>
            </div>
            <div>
                <label>tags</label>
                <input {...register('tags')} type="text" placeholder="Enter the tags with comma separated"/>
            </div>
            <div>
                <label>Size</label>
                <input {...register('size')} type="number" placeholder="size of the file"/>
            </div>
            <div><button type="submit">Submit</button></div>

            
            
            
        </form>
    </div>
  )
}

export default Home