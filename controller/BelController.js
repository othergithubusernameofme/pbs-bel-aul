const Model = require('../model')
const TelegramBot = require('node-telegram-bot-api')
const {token} = require('../core/config')

const bot = new TelegramBot(token,{polling:false})

const listLewat = [
    "stttt... diem...ada yang lewat",
    "sepertinya ada yang lewat",
    "perasaan ada yang lewat",
    "kayaknya ada yang lewat barusan",
    "aku mendeteksi sesuatu...",
    "rasa-rasa anda sesuatu",
    "apaan tuh di depan ?",
    "cek di depan deh,kaya ada yang lewat",
    "hati-hati ada yang lewat barusan",
    "waspada, aku mendeteksi sesuatu",
    "ada yang lewat ya barusan ?"
]

const listBel= [
    "Tok Tok Tok ,Tok Tok Tok",
    "Ada bel woy!!!",
    "Ada tamu bosku!",
    "STOP ! Ada tamu!",
    "Bel telah di pencet",
    "woy woy woy woy, ada orang woy",
    "Seseorang menekan tombol!",
    "Bel Berbunyi!!!",
    "Sayang ada tamu sayang wkwk",
    "Sesorang menunggumu di luar!",
    "Bukain pintu! ada orang!",
    "ning nung,ning nung,ning nung"
]

class BelController{

    static sendNotif(type,{have,message}){
        Model.User.find({notification:true},(err,result)=>{
            if(!err){
                result.forEach((item)=>{
                    if(have){
                        bot.sendMessage(item.telegram_id,message)
                    }else{
                        switch (type){
                            case "lewat":
                                bot.sendMessage(item.telegram_id,listLewat[Math.floor(Math.random()*listLewat.length)])
                                break;
                            case "bel":
                                bot.sendMessage(item.telegram_id,listBel[Math.floor(Math.random()*listBel.length)])
                                break;
                            default:
                                bot.sendMessage(item.telegram_id,"Tes tes tes,halo")
                        }
                    }
                })
            }
        })
    }


     static update(req, res){
        if(req.query.hasOwnProperty('type')){
            let body = {
                have:false,
                message:""
            }
            if(req.query.hasOwnProperty('message')){
                body = {
                    have:true,
                    message:req.query.message
                }
            }
            BelController.sendNotif(req.query.type.toLowerCase(),body)
        }
        res.send({})
    }
}

module.exports = BelController