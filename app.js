const express = require("express");
const app = express();
require('./db/conn');

const PORT = 3003;
app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));

app.listen(PORT,() =>{
    console.log(`server is running port no ${PORT}`)
})