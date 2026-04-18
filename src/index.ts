import express from 'express'
import { createQRCode } from './repository/qrcode.repository'

const app = express()
const port = process.env.PORT

app.use(express.json());

app.get("/gen_qrcode", async (req, res) => {
  const url = req.body.url;
  const fileName = req.body.file_name + ".png";
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
