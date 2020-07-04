const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // let ext = file.mimetype.split('/');
    // ext = ext[1];
    // ext = ext.split('+');
    // ext = ext[0];
    // cb(null, 'index.' + ext);
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return cb(new Error('Solo puedes subir imágenes'), false);
  }
  cb(null, true);
};

exports.upload = multer({ storage: storage, fileFilter: imageFileFilter});
