const multer = require('multer');
const imgFace = require('../models/imagemFace');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/../../../resources/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + '.jpg')
    }
});
//../public/images
const upload = multer({ storage: storage });
module.exports = upload;


