const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String,required:true },
    videoUrl:{type:String,required:true },
    tags: {type:[String],required:true},
    size: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Videos', videoSchema);
