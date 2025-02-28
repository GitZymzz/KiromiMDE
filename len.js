 /*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

*/

const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')

global.grup = 'https://chat.whatsapp.com/J49XXjgsMhiDI2uDwnKldK'
global.ig = '-'
global.thumb = fs.readFileSync("./data/image/thumb.jpg")
global.email = 'Fake01@gmail.com'
global.region = 'Indonesia'

global.owner = ['6289673462138']
global.ownername = 'KayzuMd'

global.keyopenai = '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'
global.ibeng = 'Yl4h5x9wiA'

global.domain = 'https://kayzuganzz.cloudhost.store' // Hapus Tanda / Diakhir Link Domain Kalian
global.apikey = 'ptla_auOgGt4iGt2iq2dDowpBlDr6k6P47jOzjqrA6U6jwNT' // Plta
global.capikey = 'ptlc_M6hS1jEneZEs3sQq9wOJn5oGiQ2s3odjWVR2wt41FTD' // Pltc
global.eggsnya = '15' // Sesuaikan Lokasi Egg
global.location = '1'

global.lenwymenu = 'LenwyORI' // Gausah Diganti Biar Gak Error
global.lenwypro = 'Button' // Biarkan Saja
global.botname = 'KayzuOFFC'
global.packname = 'Kayzu'
global.author = `YouTube: KayzuMD\nBot: 0896-7346-2138`
global.prefa = ['','!','.',',']
global.sessionName = 'session'
global.anticall = true

global.mess = {
    success: '*Selesai*',
    admin: '*Fitur Khusus Admin Group!*',
    botAdmin: '*Fitur Ini Hanya Bisa Digunakan Ketika Bot Menjadi Admin Group!*',
    owner: '*Fitur Khusus Owner!*',
    prem: '*Fitur Khusus Premium!*',
    group: '*Fitur Ini Hanya Bisa Digunakan Di Group Chat!*',
    wait: '📦 *Memproses...*',
    error: '*Kayaknya Ada Error, Coba Lagi Di Lain Waktu*',
    link: '*Itu Bukan Link Yang Benar*',
    
    // Fitur Store & Report
    owner2: '6289673462138',
    qris: 'https://pomf2.lain.la/f/kts5hxqv.jpg',
    format: '🔰 *Pembayaran*\n💸 *All Payment Bisa Scan Qr Diatas*\n\n📃 *Metode Lain*\n🏷️ *Ovo : 629673462138*\n🏷️ *Dana : 085274156161*\n🏷️ *Gopay : 08979847953*\n\n*Harap Sertakan Bukti Transfer.Tidak Ada Bukti Transfer Tidak Akan Diproses,Terimakasih ☕*',
}

global.LenwySet = {
    free: 70,
    coin: 100,
    stamina: 30,
    kekuatan: 100,
    tahan: 80
}

global.multiplier = 1000

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.green(`📑  Update : ${__filename}`))
delete require.cache[file]
require(file)
})