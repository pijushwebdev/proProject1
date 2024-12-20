import express, { Application,} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/ErrorHandlers/globalErrorHandler';
import notFound from './app/utils/notFound';
import router from './app/Routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// application routes  // that call Routes/index.ts file
app.use('/api/v1/', router)


app.get('/', (req, res) => {
  res.send('University Home!')
})


// handle unknown route 
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;