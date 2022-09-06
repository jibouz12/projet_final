const auth = require("../middleware/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const fs = require('fs');
const Commentaire = require("../models/Commentaire");

/////////////////////
// créer post : 
exports.createPost = (req, res, next) => {
    User.findOne({ _id: req.auth.userId})
    .then(user => {
        const postObject = JSON.parse(req.body.post);
        delete postObject._id;
        delete postObject._userId;
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
            name: user.pseudo,
            imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            date: new Date,
            usersLiked: [],
        });
        post.save()
        .then(() => { res.status(201).json({message: 'Post enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
    })
};

///////////////////////////
// recupérer tous les posts :
exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

///////////////////////////
// recupérer tous les posts d'un utilisateur --> avec userId :
exports.getPostsByUserId = (req, res, next) => {
    Post.find({ userId: req.params.id })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

//////////////////////
// récupérer un post --> avec son id :
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

//////////////////
// liker / disliker post :
exports.likerPost = (req, res, next) => {
    let likeAction = req.body.likes;
    let likeur = req.auth.userId;
    Post.findOne({ _id: req.params.id})
    .then((post) => {
        if (post.userId == likeur) {
            res.status(403).json({ message: "Utilisateur non autorisé à s'auto-liker !" });
        } else {
            if (likeAction == false) {
                Post.updateOne({ _id: req.params.id }, 
                    { _id: req.params._id,
                    $push : { usersLiked : likeur },
                    $inc : { likes : +1 }
                    }
                )
                .then(() => { res.status(201).json({message: 'Post liké !'})})
                .catch(error => { res.status(400).json( { error })})
            } else {
                Post.updateOne({ _id: req.params.id }, 
                    { _id: req.params.id,
                    $pull : { usersLiked : likeur },
                    $inc : { likes : -1 }
                    }
                )
                .then(() => { res.status(201).json({message: 'Like annulé !'})})
                .catch(error => { res.status(400).json( { error })})
            }
        }
    })
};

//////////////////
// commenter post :
// sauvegarder commentaire dans la bdd
// modifier le post en ajoutant le nouveau commentaire 
exports.commenterPost = (req, res, next) => {
    User.findOne({ _id: req.auth.userId})
    .then(user => {
        const comObject = new Commentaire({
            pseudo: user.pseudo,
            comment: req.body.com,
            userId: user._id,
            postId: req.body.postId,
        });
        comObject.save();
        const commentaire = { pseudo : user.pseudo , comment : req.body.com };
        Post.updateOne({ _id: req.params.id }, 
            { _id: req.params.id,
            $push : { com : commentaire }
            }
        )
        .then(() => { res.status(201).json({message: 'Post commenté !'})})
        .catch(error => { res.status(400).json( { error })})
    });
};

////////////////////////////////
// supprimer post :
// et les commentaires de ce post dans la bdd
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        Commentaire.deleteMany({postId: post._id})
        .then(() => {
            if (post.userId == req.auth.userId || req.auth.admin == "o") {
                const filename = post.imageURL.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Post supprimé !' })})
                    .catch(error => res.status(401).json({ error }));
                });
            } else {
                res.status(403).json({ message: 'Utilisateur non autorisé !' });
            }
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch( error => { res.status(500).json({ error });
    });
};

///////////////////////////////////
/// modifier post :
/// si on modifie l'image --> supprimer l'ancienne image dans la bdd
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { 
        ...req.body,
    };
    delete postObject._id;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId == req.auth.userId || req.auth.admin == "o") {   
                if (req.file == undefined) {
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message : 'Post modifié !' })) 
                    .catch(error => res.status(401).json({ error }));
                } else {
                    const filename = post.imageURL.split('/images/')[1];
                    fs.unlink(`images/${filename}`,() => {
                        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message : 'Post modifié !' })) 
                        .catch(error => res.status(401).json({ error }));
                    })
                }
            } else {
                res.status(403).json({ message: 'Utilisateur non autorisé !' });
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};