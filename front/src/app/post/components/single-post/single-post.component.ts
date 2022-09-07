import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post!: Post;
  post$!: Observable<Post>;
  commentaireInput!: string;
  liked!: boolean;
  userId!: string;
  userAdmin!:string;
  nombreLikes!: number;
  userPseudo!: string;
 


  constructor(private postService : PostService, 
              private route : ActivatedRoute,
              private router : Router,
              private auth : AuthService) {}

///////////////////////
/// récupérer postId --> dans l'url de la page
/// post déja liké ou pas? (regarder si l'utilisateur est dans le tableau usersLiked)
  ngOnInit(): void {
    this.userPseudo = this.auth.getUserPseudo();
    this.nombreLikes = 0;
    this.userId = this.auth.getUserId();
    this.userAdmin = this.auth.getUserAdmnin();
    const postId = this.route.snapshot.params["id"];
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
  } 
  if (this.liked == true && this.nombreLikes == 1) {
    this.postService.likePostById(postId, this.liked).pipe(
      take(1),
      tap(() => {
        this.liked = false;
        this.nombreLikes = 0;
      }),
    ).subscribe();
  } 
  if (this.liked == true && this.nombreLikes == 0) {
    this.postService.likePostById(postId, this.liked).pipe(
      take(1),
      tap(() => {
        this.liked = false;
        this.nombreLikes = -1;
      }),
    ).subscribe();    
  } 
  if (this.liked == false && this.nombreLikes == -1) {
    this.postService.likePostById(postId, this.liked).pipe(
      take(1),
      tap(() => {
        this.liked = true;
        this.nombreLikes = 0;
      }),
    ).subscribe();
  }
}

/////////////////////
// commenter le post
  commenter(postId : string) {
    let commentaire = this.commentaireInput;
    this.postService.commenterPost(postId, commentaire).pipe(
      take(1),
      tap(() => {
        this.post$ = this.postService.getPostById(postId);
      })
    ).subscribe();
    this.commentaireInput = "";
  }
  
//////////////////////////
// supprimer le post
  deletePost(postId : string) {
    this.postService.supprimerPost(postId).pipe(
      take(1),
      tap(() => {
        this.post$ = this.postService.getPostById(postId);
      }),
      tap(() => {
        this.router.navigateByUrl('');
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
    const postId = this.route.snapshot.params["id"];
      this.post$ = this.postService.getPostById(postId).pipe(
        tap(post => {
          userProfil = post.userId;
        })
      );
    this.router.navigateByUrl(`profil/${userProfil}`)
  }

}
