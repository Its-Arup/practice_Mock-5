const mongoose = require('mongoose');
require("dotenv").config();

const Server_Connections = mongoose.connect(process.env.SERVER)

module.exports ={
    Server_Connections
}
