import express,{ Express , Request, Response} from 'express';
import { PORT } from './secrets';
import routeRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';

export const prisma = new PrismaClient();
const app:Express = express();
app.use(express.json())
app.use('/api', routeRouter);
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`
     ====================================
        Server running on port ${PORT} 😁
     ====================================`);
});