import express from 'express'
import { createQRCode } from './repository/qrcode.repository'

const app = express()
const port = process.env.PORT

app.use(express.json());

app.get("/gen_qrcode", async (req, res) => {
  const url = req.body.url;
  const fileName = req.body.file_name + ".png";
  if (url.length < 0) { 
    return res.status(404).json("URL length need to be greater than zero")
  }
  
  const createdQRCode = await createQRCode(url, fileName);
  const fullFilePath = createdQRCode.filePath + createdQRCode.fileName;
  
  res.download(fullFilePath, (err) => {
    if (err) {
      console.error("File failed to send:", err);
    }
  });
  
  console.log('done')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
