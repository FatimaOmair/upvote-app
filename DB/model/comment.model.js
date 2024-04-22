import { Schema, Types, model } from "mongoose";
import mongoose from "mongoose"; // Import mongoose properly

const commentSchema = new Schema({
  txt: {
    type: String, // Corrected the syntax
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
  postId:{
    type: Types.ObjectId,
    ref: 'post',
    required: true
  }

}, {
  timestamps: true // Corrected the property name
});

const commentModel = model('comment', commentSchema);
export default commentModel;