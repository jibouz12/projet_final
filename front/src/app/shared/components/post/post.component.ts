import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  post$!: Observable<Post>;
  liked!: boolean;
  userId!: string;
  userAdmin!:string;
  postId!: string;
  test!: number;
  nombreLikes!: number;


  constructor(private postService : PostService, 
              private router: Router,
              private auth : AuthService) { }

///////////////////////
/// post déja liké ou pas? (regarder si l'utilisateur est dans le tableau usersLiked)
  ngOnInit(): void {
    this.nombreLikes = 0;
    this.userAdmin = this.auth.getUserAdmnin();
    this.userId = this.auth.getUserId();
    const postId = this.post._id;
    this.post$ = this.postService.getPostById(postId).pipe(
      tap(post => {
        if (post.usersLiked?.find(user => user == this.userId)) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      })
    );
  }

////////////////////////
/// afficher les commentaires au click
/// et retirer le premier <p> ("afficher les commentaires")
  afficherCom() {
    let recupDiv = document.getElementById("com-" + this.post._id);
    for ( let e of this.post.com!) {
      let d = document.createElement("div");
      d.setAttribute("class", "commentaire-container");
      d.innerHTML = `<div style="display: flex; flex-direction: row" class="commentaire"><p style="margin-right: 20px"><strong>${e.pseudo}</strong></p><p>${e.comment}</p></div>`;
      recupDiv!.appendChild(d);
    }
    let p = recupDiv!.getElementsByTagName("p")[0];
    recupDiv!.removeChild(p);
  }

/////////////////////////////////
/// afficher toute la description
  voirPlus() {
    let description = document.getElementById("description-" + this.post._id);
    description!.style.animationPlayState = "running";
    document.getElementById("bouton-" + this.post._id)!.style.display = "none";
  } 

/////////////////////////
// liker le post / annuler le like
// ---> UTILISER L'APPROCHE OPTIMISTE !
// ----------> ajouter ou retire like avant la réponse du backend
// -------------------------------------------------------------------
// 1--> si pas dans usersLiked et pas encore cliqué sur "coeur" : like!(+1) + "déjà cliqué"
// 2--> si déjà dans usersLiked et déjà cliqué sur "coeur" : like annulé!(0) + "pas encore cliqué"
// 3--> si déjà dans usersLiked et pas encore cliqué sur "coeur" : like retiré!(-1) + "pas encore cliqué"
// 4--> si pas dans usersLiked et déjà cliqué sur "coeur" : like réatribué!(0) + "déjà cliqué"
  liker(postId : string) {
    if (this.liked == false && this.nombreLikes == 0) {
      this.postService.likePostById(postId, this.liked).pipe(
        take(1),
        tap(() => {
          this.liked = true;
          this.nombreLikes = 1;
        }),
      ).subscribe();
    } if (this.liked == true && this.nombreLikes == 1) {
      this.postService.likePostById(postId, this.liked).pipe(
        take(1),
        tap(() => {
          this.liked = false;
          this.nombreLikes = 0;
        }),
      ).subscribe();
    } if (this.liked == true && this.nombreLikes == 0) {
      this.postService.likePostById(postId, this.liked).pipe(
        take(1),
        tap(() => {
          this.liked = false;
          this.nombreLikes = -1;
        }),
      ).subscribe();    
    } if (this.liked == false && this.nombreLikes == -1) {
      this.postService.likePostById(postId, this.liked).pipe(
        take(1),
        tap(() => {
          this.liked = true;
          this.nombreLikes = 0;
        }),
      ).subscribe();
    }
  }

//////////////////////////
// supprimer le post
  deletePost(postId : string) {
    this.postService.supprimerPost(postId).pipe(
      take(1),
      tap(() => {
        this.post$ = this.postService.getPostById(postId);
      })
    ).subscribe();
  }

/////////////////////////////
// modifier post
  modifyPost( postId : string) {
    this.router.navigateByUrl(`modify/${postId}`)
  }

/////////////////////////
// diriger vers le profil de l'utilisateur sélectionné
  goToProfil(userProfil : string) {
    const postId = this.post._id;
      this.post$ = this.postService.getPostById(postId).pipe(
        tap(post => {
          userProfil = post.userId;
        })
      );
    this.router.navigateByUrl(`profil/${userProfil}`)
  }

}

