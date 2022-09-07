***GROUPOMANIA 2022 | by JB***


:computer: **Installation :**

- BACK-END

  - *clonez le dépôt Git :*
       
        git clone https://github.com/jibouz12/projet_final.git
       
  - *dans le dossier "back", créez un fichier .env et ajoutez-y votre string de connection MongoDB et la clé token suivante :*

        CONNECTION = mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

        CLE_TOKEN = CLE_SECRETE_TOKEN
        
  - *dans un terminal, positionnez vous dans le dossier "back" et entrez la commande :*
  
        npm install
        
        node server
        
        
        
- FRONT-END

  - *dans un terminal, positionnez vous dans le dossier "front" et entrez la commande :*
  
        npm install
        
        npm run start
        
        
 - MongoDB
 
   - *dans mongoDB Compass, connectez votre Cluster*
   
   - *dans la base de données, ajoutez les fichiers .json correspondants aux collections (en cliquant sur "ADD DATA") :*
         
         ajoutez "commentaires.json" à la collection "commentaires"
         
         ajoutez "posts.json" à la collection "posts"
         
         ajoutez "users.json" à la collection "users"
         
         
         
         
:rocket: **Accès au site :**

      [http://localhost:4200/](http://localhost:4200/)
         



![This is an image](https://github.com/jibouz12/projet_final/blob/master/front/src/assets/images/icon-left-font.png)
