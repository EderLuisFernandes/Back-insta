import express from 'express'
import routes from './src/Routes/Routes.js';
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.static("uploads"));
app.use(routes)

const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log(`Servidor rodando na porta ${Port}`));

