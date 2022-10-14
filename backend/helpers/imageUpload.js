const multer = require('multer');
const path = require('path');

const configsFunctions = multer.diskStorage({
    destination: (req,file,cb)=>{
        let folder = '';
        if(req.baseUrl.includes('publi')){
            folder = 'publication'
        }else if(req.baseUrl.includes('user')){
            folder = 'user';
        }

        cb(null, `imgsSaves/${folder}`)
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + String(Math.random() * 10000) + path.extname(file.originalname))
    }

})

const imageUpload = multer({
    storage: configsFunctions,
    fileFilter: (req,file,cb)=>{ 
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Extensão de imagem inválida!'))
        }
        cb(undefined, true);
    }
})


module.exports = imageUpload;