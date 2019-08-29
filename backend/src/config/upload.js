const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });
module.exports = upload;