import commentModel from "../../../DB/model/comment.model.js"
import cloudinary from "../../utils/cloudinary.js"

export const createComment = async (req, res, next) => {
    try {
        req.body.userId = req.user._id; // Assuming user ID is available in req.user
        req.body.postId = req.params.id;

        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `comment/${req.body.postId}` });
            req.body.image = { secure_url, public_id };
        }

        const comment = await commentModel.create(req.body);
        return res.json({ message: "Success", comment });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};