const axios = require('axios');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload file ke https://pomf.lain.la
 * @param {Buffer} buffer File Buffer
 */
const pomf = async (buffer) => {
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("files[]", buffer, { filename: `tmp.${ext}`, contentType: mime });

  try {
    const { data } = await axios.post("https://pomf.lain.la/upload.php", form, {
      headers: form.getHeaders(),
    });
    if (data.files && data.files.length > 0) {
      return data.files[0].url;
    }
    throw new Error("Gagal mengunggah ke Pomf.");
  } catch (error) {
    console.error("❌ Error Pomf:", error.message);
    throw error;
  }
};

/**
 * Upload file sementara ke file.io (Berlaku 1 hari)
 * @param {Buffer} buffer File Buffer
 */
const fileIO = async (buffer) => {
  const { ext } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append('file', buffer, `tmp.${ext}`);

  try {
    const res = await fetch('https://file.io/?expires=1d', {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    if (!json.success) throw new Error("Gagal mengunggah ke File.io.");
    return json.link;
  } catch (error) {
    console.error("❌ Error File.io:", error.message);
    throw error;
  }
};

/**
 * Upload file ke https://file.btch.rf.gd
 * @param {Buffer} buffer File Buffer
 */
const api = async (buffer) => {
  const { ext } = (await fromBuffer(buffer)) || {};
  const form = new FormData();
  form.append("file", buffer, "file." + ext);

  try {
    const res = await fetch("https://file.btch.rf.gd/api/upload.php", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    if (data.result && data.result.url) {
      return data.result.url;
    }
    throw new Error("Gagal mengunggah ke File.btch.");
  } catch (error) {
    console.error("❌ Error File.btch:", error.message);
    throw error;
  }
};

/**
 * Fungsi utama untuk mencoba beberapa layanan upload
 * @param {Buffer} inp File Buffer
 */
const uploadFile = async (inp) => {
  let err = false;
  for (const upload of [pomf, api, fileIO]) {
    try {
      return await upload(inp);
    } catch (e) {
      err = e;
    }
  }
  if (err) throw err;
};

module.exports = { uploadFile };