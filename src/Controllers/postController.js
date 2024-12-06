import {Todos,criarPost,atualizaPost}  from "../model/postModel.js"
import fs from 'fs';
import { extname,resolve } from "node:path";

import gerarDescricaoComGemini from '../services/serviceGmini.js'



class postController{
 async store(request, response){
    const novoPost = request.body
    try {
        const postCriado = await criarPost(novoPost)
        response.status(200).json(postCriado)
    } catch (error) {
        console.error(error.message)
        response.status(500).json("Erro:Falha na requisisçaõ")

    }
 }
 async uploadImagen(request, response){
    const novoPost = {
        ...request.body,
        descricao: "",
        imgUrl: request.file.originalname, 
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost)
        const newFilePath = resolve('uploads', `${postCriado.insertedId}${extname(request.file.originalname)}`);
        fs.renameSync(request.file.path, newFilePath)

        response.status(200).json(postCriado)
        
    } catch (error) {
        console.error(error.message)
        response.status(500).json("Erro:Falha ao enviar a Foto")
    }
 }
async index(request, response){
       const posts  = await Todos()
        return response.status(200).json(posts)
    }
async buscarid(request,response){
            const post  = await Todos()
            const index = iDUnic(request.params.id)
            return response.json(post[index])
    }

async atualizaNewPost(request,response) {
    const id = request.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpeg`

    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpeg`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            descricao: descricao,
            imgUrl: urlImagem, 
            alt: request.body.alt
        }
        const postCriado = await atualizaPost(id, post)
        response.status(200).json(postCriado)
    } catch (error) {
        console.error(error.message)
        response.status(500).json("Erro:Falha na requisisçaõ ao atualizaa foto")

    }
    }
}

export default new postController()