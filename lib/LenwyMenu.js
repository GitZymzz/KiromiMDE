 /*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

*/

const chalk = require('chalk')
const fs = require('fs')

global.LenwyORI = (prefix) => {
return `
┈──────────────────────⏣
           ⏤͟͟͞͞ᵡ    *M E N U   B O T*   ᵡ͟͟͞͞⏤
┈──────────────────────⏣
   ⏣ • Aimenu  
   ⏣  •Animemenu
   ⏣ • Antimenu  
   ⏣ • Asupan  
   ⏣ • Beritamenu  
   ⏣ • Credit
   ⏣ • Convertmenu  
   ⏣ • Dowloadmenu  
   ⏣ • Ephoto
   ⏣ • Favmenu  
   ⏣ • Funmenu  
   ⏣ • Gamemenu  
   ⏣ • Generateimageai  
   ⏣ • Groupmenu    
   ⏣ • Nonton
   ⏣ • Ownermenu    
   ⏣ • Premiummenu  
   ⏣ • Pushmenu  
   ⏣ • Quotesmenu  
   ⏣ • Randomimage  
   ⏣ • Randomanime
   ⏣ • Randommenu  
   ⏣ • Rules  
   ⏣ • Rpg
   ⏣ • Store  
   ⏣ • Sertifikat
   ⏣ • Searchmenu  
   ⏣ • Weebsmenu  
   ⏣ • Islamimenu

    ⏤͟͟͞͞ᵡ   *E X P L O R E   T H E   P O W E R*   ᵡ͟͟͞͞⏤
            ᵡ͟͟͞͞   *B Y   ＫＩＲＯＭＩＭＤ*  ᵡ͟͟͞͞
`}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})