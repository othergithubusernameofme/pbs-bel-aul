const restify = require('restify')
const mongoose = require('./core/mongoose')
const {port} = require('./core/config')


let server = restify.createServer({
    name: "aulbel",
    version: "0.0.1"
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.listen(process.env.port || port,(err)=>{
    if(err){
        console.log('error:',err.message);
        process.exit(1);
    }
    console.log('server listening on port',process.env.PORT || port);
    mongoose.configure(server);
});



process.on('uncaughtException',(err)=> {
    if(err){
        console.log("AulBelOrror",err);
    }
});