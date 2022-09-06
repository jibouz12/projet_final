const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/////////////////////////
/// s'enregistrer :
/// vérifier format email
/// hacher le password
exports.signup = (req, res, next) => {
    let regexEmail = /[a-zA-Z1-9.-_]+[@]+[a-zA-Z1-9.-_]+[.]+[a-z]/;
    if (regexEmail.test(req.body.email)) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                pseudo: req.body.email.split('@')[0],
                admin: "n",
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        return res.status(500).json({ message : "Respectez un format Email valide !" });
    }
};

//////////////////
/// se connecter :
/// comparer les passwords hachés
/// renvoyer Token (qui contient userId et admin)
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                admin: user.admin,
                pseudo: user.pseudo,
                userId: user._id,
                token: jwt.sign(
                { userId: user._id,
                admin:  user.admin },
                "" + process.env.CLE_TOKEN,
                { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};