import express from 'express'
import QRCode from "qrcode"
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/gen_qrcode", (req, res) => {
  const filePath =  "./src/"
  QRCode.toFile(filePath + "file.png", 'Some text', {
    color: {
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
    // Forces the browser to download the file instead of opening it
    res.download(filePath + "file.png", 'file.png', (err) => {
      if (err) {
        console.error("File failed to send:", err);
      }
    });

    console.log('done')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
