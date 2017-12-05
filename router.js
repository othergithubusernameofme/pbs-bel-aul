
const Controller = require('./controller/BelController')

module.exports = {
    configure:(server)=>{
        server.get('/',(req,res)=>{
            res.send({})
        })
        server.get('update',Controller.update)
    }
}