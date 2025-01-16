import express,{ Express , Request, Response} from 'express';
import { PORT } from './secrets';
import routeRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/error';
import { SignUpSchema } from './schema/users';

const app:Express = express();
app.use(express.json())
app.use('/api', routeRouter);
export const prisma = new PrismaClient({
   log:['query']
})
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`
     ====================================
        Server running on port ${PORT} 😁
     ====================================`);
});