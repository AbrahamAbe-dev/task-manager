const express = require('express');
const tasks = require('./routes/taskRoute');
const db = require('./database/db');
const dotenv = require('dotenv');
const app = express();



dotenv.config();



// Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);





// Database Sync
db.sync()
    .then(() => {
        console.log("✅ Database synced");
    })
    .catch((err) => {
        console.error("❌ Database sync failed:", err);
    });




const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Server is running on port ${port}...`)
);