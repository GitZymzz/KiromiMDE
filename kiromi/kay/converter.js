const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Menjalankan perintah ffmpeg dengan argumen tertentu
 * @param {Buffer} buffer - File Buffer
 * @param {Array} args - Argumen FFmpeg
 * @param {String} ext - Ekstensi file input
 * @param {String} ext2 - Ekstensi file output
 * @returns {Promise<Buffer>} - Buffer hasil konversi
 */
async function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../tmp/', `${Date.now()}.${ext}`);
      let out = `${tmp}.${ext2}`;

      await fs.promises.writeFile(tmp, buffer);
      
      const process = spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ]);

      process.on('error', reject);
      process.on('close', async (code) => {
        try {
          await fs.promises.unlink(tmp);
          if (code !== 0) return reject(new Error(`FFmpeg Error: Exit code ${code}`));
          
          const outputBuffer = await fs.promises.readFile(out);
          await fs.promises.unlink(out);
          resolve(outputBuffer);
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Konversi Audio ke MP3
 * @param {Buffer} buffer - File Buffer
 * @param {String} ext - Ekstensi file input
 * @returns {Promise<Buffer>}
 */
const toAudio = (buffer, ext) => ffmpeg(buffer, [
  '-vn',
  '-ac', '2',
  '-b:a', '128k',
  '-ar', '44100',
  '-f', 'mp3'
], ext, 'mp3');

/**
 * Konversi Audio ke PTT (Voice Note WhatsApp)
 * @param {Buffer} buffer - File Buffer
 * @param {String} ext - Ekstensi file input
 * @returns {Promise<Buffer>}
 */
const toPTT = (buffer, ext) => ffmpeg(buffer, [
  '-vn',
  '-c:a', 'libopus',
  '-b:a', '128k',
  '-vbr', 'on',
  '-compression_level', '10'
], ext, 'opus');

/**
 * Konversi Video ke Format MP4 yang Support WhatsApp
 * @param {Buffer} buffer - File Buffer
 * @param {String} ext - Ekstensi file input
 * @returns {Promise<Buffer>}
 */
const toVideo = (buffer, ext) => ffmpeg(buffer, [
  '-c:v', 'libx264',
  '-c:a', 'aac',
  '-ab', '128k',
  '-ar', '44100',
  '-crf', '32',
  '-preset', 'slow'
], ext, 'mp4');

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg
};