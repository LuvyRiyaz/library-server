const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// const { PORT, MONGODB_URI } = require('./src/config');
const booksRoutes = require('./src/routes/bookRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes')
const issueRoutes = require('./src/routes/issueRoutes')
const overviewRoutes = require('./src/routes/overviewRoutes');
const authRoutes = require ('./src/routes/authRoutes')

// const returnRoutes = require('./src/routes/returnedRoutes')
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/books', booksRoutes);
app.use('/employees',employeeRoutes)
app.use('/issues', issueRoutes);
app.use('/api', overviewRoutes);
app.use('/auth', authRoutes)

// app.use('/returned',booksRoutes)



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
