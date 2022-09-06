const multer = require("multer");
const auth = require("./auth");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

///////////////////////////
// utiliser "UserId + Date.now" pour l'URL de l'image
// --> s'assurer de l'unicité du nom de l'image
// --> car un même utilisateur ne peut pas poster 2 posts en moins d'1 ms 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = req.auth.userId;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');