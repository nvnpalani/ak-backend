require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/contactDB';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, service, message } = req.body;
    
    if (!name || !phone || !service) {
      return res.status(400).json({ error: 'Name, phone, and service are required' });
    }

    const newContact = new Contact({ name, phone, service, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Contact details saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact details' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
