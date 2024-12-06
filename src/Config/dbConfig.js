import { MongoClient } from "mongodb";

export default async function conectarAoBanco(mongodbUrl){
    let mongoClient;
    try {
        mongoClient = new MongoClient(mongodbUrl)
        console.log('Conectando ao Cluster do Banco');
        await mongoClient.connect();
        console.log('Conectado ao  Banco ✅');
        return mongoClient;
    } catch (error) {
        console.error('Falha ao Conectar com o banco ❌',error)
        process.exit()
    }
}  