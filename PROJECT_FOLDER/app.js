require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');

const employeeRoute = require('./route/employeeRoute')
const reportRoute = require('./route/reportRoute')
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

// all routes will be here
app.use('/api/v1/employee/', employeeRoute);
app.use('/api/v1/report/', reportRoute);

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});
