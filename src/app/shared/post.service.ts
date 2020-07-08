import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  userData: any;

  constructor(
    public router: Router, 
    private firestore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    ) 
  {

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

   }
   
  addPost(post)
  {
    this.firestore.collection('posts').doc(post[0].id,).set({
          
          id: post[0].id,
          uid: post[0].uid,
          desc: post[0].desc,
          loc: post[0].post_pic,
          location: post[0].location,
          created_date: post[0].created_date,
        }).then();

  }

  getPosts(id: string) {
    return this.firestore.collection('posts').doc(id).get();
  }

  SetUserData(id) {

    // console.log(user[0]);

    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`post/${id}`);
    return userRef.get();
  }

  updatePost(post)
  {
    this.firestore.collection('posts').doc(post[0].id,).set({
          id: post[0].id,
          uid: post[0].uid,
          desc: post[0].desc,
          loc: post[0].loc,
          location: post[0].location,
          created_date: post[0].created_date,
          updated_date: post[0].updated_date,
        }).then();


  }

  deletePost(id)
  {
    return this.firestore
      .collection('posts')
      .doc(id)
      .delete()
  }

}
