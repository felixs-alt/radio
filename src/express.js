
const express = require('express');
const app = express();
const PORT = 3001;

const { exec } = require('child_process');

app.post('/startmusic',
    (req, res) => {
      const url = req.query.url+"?download=true";
      res.send(url);
      exec('sox -t wav '+url+' -t wav -  | sudo /PiFmRds/src/pi_fm_rds -freq 97.0 -audio -')
    })
 
app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
