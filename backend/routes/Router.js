const app = require('express')();

// Routes
const UserRoutes = require('./UserRoutes');
const PubliRoutes = require('./PubliRoutes');

app.use('/api/user', UserRoutes);
app.use('/api/publi', PubliRoutes);

// Test
app.get('/', (req,res)=>{
    res.send('OK!!!')
})

module.exports = app;