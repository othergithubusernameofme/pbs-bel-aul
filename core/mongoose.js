const mongoose  = require('mongoose')
const {db} = require('./config')
const router  = require('../router')

module.exports = {
    configure:(server)=>{
        mongoose.connect(db.dbPath,{  useMongoClient: true,user:db.db_options.user,pass:db.db_options.pass});
        const DB = mongoose.connection
        DB.on('error',function (err) {
            console.log('MongoDB Error ');
            console.log(err.message);
            process.exit(1);
        });
        DB.on('open',function callback() {
            console.log('MongoDB is ready..');
            router.configure(server)
            require('../telegram')
        });

        DB.on('disconnected',function(){
            console.log('MongoDB disconnected.');
            mongoose.connect(db.dbPath,{  useMongoClient: true,user:db.db_options.user,pass:db.db_options.pass});
        });

        DB.on('reconnected',function(){
            console.log('mongo db on reconnected');
        });
    }
}