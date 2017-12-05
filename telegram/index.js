const TelegramBot = require('node-telegram-bot-api');
const {token} = require('../core/config')
const Model = require('../model')

const bot = new TelegramBot(token,{polling:true})

const listNyala = ["/on","on","nyala","nyalain","hidup","hidupin","true","uripkeun","iripno","nyalakan","nyalakeun","ikuti","follow","subscribe"]
const listMati = ["/off","off","mati","false","matikan","matiin","pateni","matikeun","senyap","diem","batal","unfollow","unsubscribe"]
const listStart = [
    "Hey !",
    "Hi",
    "Apa Kabar ?",
    "Selamat datang ..",
    "Bonjour"
]
const listGkNgerti = [
    "hiks hiks aku gk ngerti maksutmu :(",
    "mapin aku gk bisa jawab",
    "aku belum bisa apa-apa,hiks",
    "apa ?",
    "gk ngeti :(",
    "gk paham :(",
    "maapkan lah diriku yang tidak memahami perkataanmu,wkwk",
    "aduh apa ini",
    "aku gk paham artinya",
    "artinya apa itu ?",
    "gimana gimana ?",
    "yaaah aku belum bisa jawab",
    "nanti aku googling dulu",
    "bentar-bentar",
    "tar ya,mau ke wc pup dulu",
    "bentar mamaku manggil aku",
    "aku gk paham say....",
    "aku belum paham say",
    "E&",
    "Terbaik!",
    "Aku shopping dulu yes",
    "Okeeyyy~~~~",
    "Parah si haha",
    "Bukan siii ye",
    "Ga sama sekali sih",
    "Semuanya",
    "Hihhhh",
    "Jadi seperti yang saya jelaskan kemarin....,",
    "Yoiii",
    "Nah itu.",
    "Sumpeh?",
    "Hahah",
    "Ehhhh",
    "Begitu loh",
    "Terbaik",
    "Ampun dah -_-"
]

const listMulai = ["/start","mulai","start"]
const listStatus = ["/status","status"]



bot.on('message',(message)=>{
    try{
        bot.sendChatAction(message.from.id,"typing")
        if (listMulai.includes(message.text.toLowerCase())){
            return bot.sendMessage(message.from.id,listStart[Math.floor(Math.random()*listStart.length)] + message.from.first_name)
        }
        else if(listStatus.includes(message.text.toLowerCase())){
            Model.User.findOne({telegram_id:message.from.id},'notification',(err,result)=>{
              if(err){
                  return bot.sendMessage(message.from.id,"error: " + err.message)
              }
              if(result){
                  return bot.sendMessage(message.from.id,result.notification.toString())
              }
              return bot.sendMessage(message.from.id,"false")
            })
        }
        else if(listNyala.includes(message.text.toLowerCase())){
           updateStatus(message,true)
        }
        else if (listMati.includes(message.text.toLowerCase())){
            updateStatus(message,false)
        }else{
            return bot.sendMessage(message.from.id,listGkNgerti[Math.floor(Math.random()*listGkNgerti.length)])
        }
    }catch (er){
        console.log('error found',er.message)
    }
});

const updateStatus = (message,status)=>{
    let name = `${message.from.first_name} ${message.from.last_name}`
    Model.User.findOneAndUpdate({telegram_id:message.from.id},{name:name,notification:status},(err,result)=>{
        if(err){
            return bot.sendMessage(message.from.id,"error: " + err.message)
        }
        if(result){
            return bot.sendMessage(message.from.id,`Notifikasi ${message.text}`)
        }
        else{
            Model.User.create({telegram_id:message.from.id,name:name,notification:true},(err,result)=>{
                if(err){
                    return bot.sendMessage(message.from.id,"error: " + err.message)
                }else{
                    return bot.sendMessage(message.from.id,`Notifikasi ${message.text}`)
                }
            })
        }
    })
}
