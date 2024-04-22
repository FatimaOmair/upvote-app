import connectDB from '../../DB/connection.js';
import messageRouter from './../modules/message/message.router.js'
import authRouter from './auth/auth.router.js'
import userRouter from './user/user.router.js'
import postRouter from './post/post.router.js'
const initApp=(app,express)=>{
    app.use(express.json());
    connectDB();
    app.use('/message',messageRouter)
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/post',postRouter)

    app.use((err,req,res,next)=>{
        return res.json({message:err.message})
    } )
}

export default initApp;