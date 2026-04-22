import QRCode from "qrcode"

async function createQRCode(url: string, fileName: string) { 
  const filePath = process.env.FILE_PATH;
  
  QRCode.toFile(filePath + fileName, url, {  
    color: {
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
  })
  const file = {
    filePath: filePath,
    fileName: fileName
  }
  
  return file
}



export {
  createQRCode
}