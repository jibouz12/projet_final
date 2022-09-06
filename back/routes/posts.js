const express = require("express");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");

const router = express.Router();

///////////////////////
/// routes get :
/// --> récupérer tous les posts
/// --> récupérer un seul post
/// --> récupérer les posts d'un utilisateur
router.get('', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/profil/:id', auth, postCtrl.getPostsByUserId);

////////////////////////////
/// routes put :
/// --> liker / disliker un post
/// --> commenter un post
/// --> modifier un post
router.put('/liker/:id', auth, postCtrl.likerPost);
router.put('/commenter/:id', auth, postCtrl.commenterPost);
router.put('/modify/:id', auth, multer, postCtrl.modifyPost);

/////////////////////////
/// route post :
/// --> créer un post
router.post('', auth, multer, postCtrl.createPost);

////////////////////////
/// route delete :
/// --> supprimer un post
router.delete('/:id', auth, multer, postCtrl.deletePost);



module.exports = router;