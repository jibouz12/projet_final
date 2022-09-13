import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient,
                private constants: Constants) {}
    


////////////////////
/// récupérer tous les posts
getAllPost() : Observable<Post[]> {
    return this.http.get<Post[]>(`${this.constants.protocol}://${this.constants.domain}/posts`);
}

///////////////////
/// récupérer un post avec son id
getPostById(Id : string) : Observable<Post> {
    return this.http.get<Post>(`${this.constants.protocol}://${this.constants.domain}/posts/${Id}`);
}

///////////////////
/// récupérer les posts d'un utilisateur (avec userId)
getPostsByUserId(userId : string) : Observable<Post[]> {
    return this.http.get<Post[]>(`${this.constants.protocol}://${this.constants.domain}/posts/profil/${userId}`);
}

////////////////////
/// liker un post / annuler le like
likePostById(postId : string, likeAction : boolean) : Observable<Post> {
    return this.getPostById(postId).pipe(
        map(post => ({
            ...post,
            likes: likeAction,
        })),
        switchMap(updatedPost => this.http.put<Post>(`${this.constants.protocol}://${this.constants.domain}/posts/liker/${postId}`, updatedPost)
        )
    );
}

/////////////////////////
/// créer un post
createPost(post : Post, image : File) {
    const formData = new FormData();
    formData.append('post', JSON.stringify(post));
    formData.append('image', image);
    return this.http.post<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/posts`, formData);
}

//////////////////////
// commenter un post
commenterPost(postId : string, commentaire : string) : Observable<Post> {
    return this.getPostById(postId).pipe(
        map(post => ({
            ...post,
            com: commentaire,
            postId: postId
        })),
        switchMap(updatedPost => this.http.put<Post>(`${this.constants.protocol}://${this.constants.domain}/posts/commenter/${postId}`, updatedPost)
        )
    );
}

///////////////////////////
// supprimer post
supprimerPost(postId : string) : Observable<Post>  {
    return this.http.delete<Post>(`${this.constants.protocol}://${this.constants.domain}/posts/${postId}`)
}

////////////////////////////
// modifier un post
// --> si l'image n'a pas été modifiée : l'image est de type String
// --> si l'image a été modifiée : l'image est de type File
modifyPost(postId : string, post : Post, image : File | string) {
    if (typeof image === "string") {
        return this.http.put<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/posts/modify/${postId}`, post)
    } else {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        return this.http.put<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/posts/modify/${postId}`, formData)
    }
}

}