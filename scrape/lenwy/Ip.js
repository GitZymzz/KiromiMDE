const axios = require('axios');

    // IP Ke Biner
    const ipToBinary = (ip) => {
        return ip.split('.').map(octet => ("00000000" + parseInt(octet).toString(2)).slice(-8)).join('');
    };

    // Biner Ke IP
    const binaryToIp = (binary) => {
        return binary.match(/.{1,8}/g).map(octet => parseInt(octet, 2)).join('.');
    };

    // Proses IP Dan Prefix
    async function processIp(ipAndPrefix) {
        const [ipAddress, prefix] = ipAndPrefix.split('/');
        
        if (!ipAddress || !prefix || isNaN(prefix) || prefix < 0 || prefix > 32) {
            throw new Error('⚠️ Format Tidak Valid! Gunakan Format IP Seperti : 192.168.10.1/24');
        }

        const cidrPrefix = parseInt(prefix);

        // Konversi IP Biner
        const binaryIp = ipToBinary(ipAddress);
        
        // Subnet Mask Dalam Biner
        const binaryMask = "1".repeat(cidrPrefix) + "0".repeat(32 - cidrPrefix);
        
        // Menghitung Network Address
        const networkBinary = binaryIp.slice(0, cidrPrefix) + "0".repeat(32 - cidrPrefix);
        
        // Menghitung Broadcast
        const broadcastBinary = binaryIp.slice(0, cidrPrefix) + "1".repeat(32 - cidrPrefix);
        
        // Menghitung Host
        const totalHosts = Math.pow(2, 32 - cidrPrefix) - 2;

        // Konversi Biner Ke IP
        const networkAddress = binaryToIp(networkBinary);
        const broadcastAddress = binaryToIp(broadcastBinary);
        const subnetMask = binaryToIp(binaryMask);

        return {
            ipAddress,
            prefix: cidrPrefix,
            subnetMask,
            networkAddress,
            broadcastAddress,
            totalHosts
        };
    }

module.exports = processIp;