import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoute from './routes/productsRoute';

const app = express();
const urlMongo = "mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/";
const _PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoute);

mongoose.connect(urlMongo)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error conectando a MongoDB:', error));

app.listen(_PORT, () => console.log(`Server running on port localhost:${_PORT}`));