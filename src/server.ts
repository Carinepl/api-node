import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
