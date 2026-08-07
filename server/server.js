require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { errorHandler } = require('./middleware/errorMiddleware');


const app = express();


// Middleware

app.use(express.json());

app.use(cors());




// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log('MongoDB Connected');

})

.catch(err => {

    console.log(err);

});






// =====================
// API Routes
// =====================


app.use(
    '/api/auth',
    require('./routes/authRoutes')
);



app.use(
    '/api/employees',
    require('./routes/employeeRoutes')
);



app.use(
    '/api/visitors',
    require('./routes/visitorRoutes')
);



app.use(
    '/api/reports',
    require('./routes/reportRoutes')
);



app.use(
    '/api/activities',
    require('./routes/activityRoutes')
);



// User Management

app.use(
    '/api/users',
    require('./routes/userRoutes')
);



// Dashboard

app.use(
    '/api/dashboard',
    require('./routes/dashboardRoutes')
);







// Error Handler

app.use(errorHandler);







const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});