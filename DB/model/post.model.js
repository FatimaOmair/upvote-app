import { Schema, Types, model } from "mongoose";
import mongoose from "mongoose"; // Import mongoose properly

const postSchema = new Schema({
  title: {
    type: String, // Corrected the syntax
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: Object
  },
  userId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true
  },
  like: [{
    type: Types.ObjectId,
    ref: 'user'
  }],
  unlike: [{
    type: Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: true // Corrected the property name
});

const postModel = model('post', postSchema);
export default postModel;
