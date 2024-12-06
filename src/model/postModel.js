import { ObjectId } from "mongodb"
import conectarAoBanco from "../Config/dbConfig.js"
const conexao = await conectarAoBanco(process.env.MONGO_URL || 'mongodb+srv://srfernandesdev:FsBCWwIy0muyJuH1@cluster0.9rldt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

export  async function Todos() {
    const db = conexao.db('intagran_bit')
    const colecao = db.collection('posts')
    return colecao.find().toArray() 
}

export async function criarPost(novoPost) {
    const db = conexao.db('intagran_bit')
    const colecao = db.collection('posts')
    return colecao.insertOne(novoPost)
}

export async function atualizaPost(id, novopost) {
    const db = conexao.db('intagran_bit')
    const colecao = db.collection('posts')
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novopost})
}