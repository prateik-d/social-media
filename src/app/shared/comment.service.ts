import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  addComments(comment)
  {

    console.log(comment)
    // return;

    this.firestore.collection('comments').doc(comment[0].id,).set({
          
          id: comment[0].id,
          pid: comment[0].pid,
          uid: comment[0].uid,
          comment: comment[0].comment,
          created_date: comment[0].created_date,
        }).then();
  }

  updateComment(comment)
  {

    console.log(comment.c_id);

    this.firestore.collection('comments').doc(comment.c_id,).set({
      id: comment.c_id,
      pid: comment.pid,
      uid: comment.uid,
      comment: comment.comment,
      created_date: comment.created_date,
      updated_date: comment.updated_date,
    }).then();

  }

  deleteComment(id)
  {
    return this.firestore
      .collection('comments')
      .doc(id)
      .delete()
  }
  

}
