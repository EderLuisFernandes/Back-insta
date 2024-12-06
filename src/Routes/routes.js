import { Router } from "express";
import multer from "multer";
import postController from "../Controllers/postController.js";
import  storage  from "../Config/multer.js";



const upload = multer({dest:"./uploads",storage})
const routes = Router()

routes.get('/',postController.index)

routes.post('/post', postController.store)

routes.post('/upload', upload.single('file'), postController.uploadImagen)

routes.put('/upload/:id', upload.single('file'),postController.atualizaNewPost)



export default routes 