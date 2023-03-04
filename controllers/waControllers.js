const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");
const { ChatAIHandler } = require('../fitur/chat_ai');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    //console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

  const text = msg.body.toLowerCase() || '';

	if (text === 'P' || text === 'p') {
    msg.reply('Hai. Saya bot Toko Samudra, gunakan format .a/(pertanyaan anda) untuk bertanya sesuatu.');
}

  if (text === '/menu') {
  msg.reply('Hai. Saya bot Toko Samudra, gunakan format .a/(pertanyaan anda) untuk bertanya sesuatu.');
}


  if(text.includes(".a/")) {
   await ChatAIHandler(text, msg);
  }
});


client.initialize();

const api = async (req, res) => {
      const token = "lgbnbwbfiheufheuf"
    let nohp = req.query.nohp || req.body.nohp;
    let token1 = req.query.token || req.body.token;
    const pesan = req.query.pesan || req.body.pesan;
    const gambar = req.query.gambar || req.body.gambar;

    if (token1 !== token){
      return res.status(401).json({status : "gagal",pesan : "token tidak valid"});
    }

try {
  if (nohp.startsWith("0")) {
    nohp= "62" +nohp.slice(1) + "@c.us";
  } else if (nohp.startsWith("62")) {
    nohp= nohp + "@c.us";
  } else {
    nohp= "62" + nohp + "@c.us";
  }

  const user = await client.isRegisteredUser(nohp) ;
  if (user) {

    if(gambar !== undefined && gambar !== null && gambar !==""){
     let media = await MessageMedia.fromUrl(gambar, {unsafeMime: true});

     client.sendMessage(nohp, media, {caption: pesan});
     res.json({status : "berhasil terkirim", pesan : media.filename});


    } else {
    client.sendMessage(nohp, pesan);
    res.json ({status : "berhasil terkirim, pesan"});
  }
  } else {
    res.json ({status : "gagal terkirim, pesan"});
  }

} catch (error){
  console.log(error)
  res.status(500).json ({ status: "error", pesan : "error server"});
}
};




module.exports = api;
