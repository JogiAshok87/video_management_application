const  express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const registerSchema  = require('./Models/Register')
const video = require('./Models/Videos')
const app = express()
app.use(express.json())

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('MongoDB is connected Successfully')
})
.catch((err=>{
    console.log(`Connection error ${err}`)
}))


app.post('/register',async(req,res)=>{
    const {name,password,confirmPassword,gmail} = req.body 
    // console.log(name,password,confirmPassword,gmail)
    try{
        const exist = await registerSchema.findOne({gmail})

    if(exist){
        return res.status(400).json('User Already registered')
    }

    if (password!=confirmPassword){
       return  res.status(400).json('password and confirmPassword should same')
    }
    let newUser = new registerSchema({name,password,confirmPassword,gmail})
    await newUser.save()

    const payload = {
        user: {id : newUser.id}
    }
    jwt.sign(payload,process.env.SECREATE_KEY,{expiresIn:"50 hours"},(err,token)=>{
        if (err) throw err
        return res.status(200).json(token)
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }


})

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await registerSchema.findOne({email})
        if (!exist){
            return res.status(400).send("User Not Exist")
        }
            
        
        if(exist.password != password){
            return res.status(400).send('Password Invalid')

           
        }
        let payload={
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,"jwtPassword",{expiresIn:360000000},
            (err,token)=>{
              if(err) throw err
              return res.json({token})
            }
        )


    }catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }
})

app.post("/videos",async(req,res)=>{
    const {title,description,videoURL,tags,size} = req.body;
    try{
        const newVideo = new video({title,description,videoURL,tags,size})
        await newVideo.save()
        res.status(201).json(newVideo)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
})

app.get("/",async(req,res)=>{
    try{
        const videos = await video.find()
        res.status(200).json(videos);
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
})

const PORT = 8000
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})
