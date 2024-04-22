import commentModel from '../../../DB/model/comment.model.js';
import postModel from '../../../DB/model/post.model.js'
import cloudinary from './../../utils/cloudinary.js'

export const getPosts = async (req, res, next) => {
    try {
        const posts = await postModel.find({}).populate([
            {
            path: 'userId',
            select: 'userName -_id'
              },
              {
                path:'like',
                select:'userName'
              },
              {
                path:'unlike',
                select:'userName'
              }
            ]);
            const postLists=[]
            for(const post of posts ){
                const comment =await commentModel.find({postId:post._id})
                postLists.push({post,comment})
            }
        return res.json({ message: "Success", posts:postLists });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


export const createPost = async (req, res, next) => {
    
    try {
        const { title, body } = req.body;
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: 'post' });
        const post = await postModel.create({
            title,
            body,
            image: { secure_url, public_id },
            userId: req.user._id 
        });

        if (!post) {
            throw new Error('Cannot create post');
        }

        return res.status(201).json({ message: "Success", post });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


export const like =async(req,res,next) => {
    const userId=req.user._id
    const {id}=req.params

    const post= await postModel.findByIdAndUpdate(id,
        {$addToSet:{
            like:userId,
        },
        $pull:{
            unlike:userId
        }
    },{
        new:true,
    }) 
    if(!post){
        return next(new Error('Couldn\'t find the post'));
    }

    return res.json({message:"success",post})
}

export const unlike =async(req,res,next) => {
    const userId=req.user._id
    const {id}=req.params

    const post= await postModel.findByIdAndUpdate(id,
        {$addToSet:{
            unlike:userId,
        },
        $pull:{
            like:userId
        }
    },{
        new:true,
    }) 
    if(!post){
        return next(new Error('Couldn\'t find the post'));
    }

    return res.json({message:"success",post})
}

