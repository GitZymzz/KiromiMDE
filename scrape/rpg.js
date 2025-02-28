const fs = require('fs');

const dbPath = './database/userRpg.json';

// Cek apakah database ada, kalau gak ada buat baru
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
}

function isRpgRegistered(sender) {
    let userRpg = JSON.parse(fs.readFileSync(dbPath));
    return userRpg.some(user => user.id === sender);
}

function addRpgUser(sender, pushname) {
    let userRpg = JSON.parse(fs.readFileSync(dbPath));

    // Cek kalau user sudah ada
    if (userRpg.some(user => user.id === sender)) return false;

    let newUser = {
        id: sender,
        name: pushname,
        attackdigi: 0,
        DarahOrang: 100,
        tp: 0,
        bits: 0,
        kenyang: 0,
        happy: 0,
        digivice: false,
        recoverplug: 0,
        apajob: false,
        job: "nganggur",
        hitcmd: 0,
    };

    userRpg.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(userRpg, null, 2));
    return true;
}

module.exports = { isRpgRegistered, addRpgUser };