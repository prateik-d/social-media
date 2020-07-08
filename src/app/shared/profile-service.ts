import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  userData: any;

  userListRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;


  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone ,
    private db: AngularFireDatabase,

    private firestore: AngularFirestore,
    private firebase: AngularFireDatabase,

  ) {
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

  // extraInfo
  addInfo(user)
  {
    var User = {
      uid: user[0].uid,
      displayName: user[0].name,
      username: user[0].username,
      website: user[0].website,
      bio: user[0].bio,
      // email: user[0].email,
      phone_number: user[0].phone_number,
      gender: user[0].gender,
    }

    // this.af.auth.currentUser.updateEmail(user[0].email);
    this.ngFireAuth.auth.currentUser.updateEmail(user[0].email)
    .then(()=>
      {
        console.log('updated');
      }
    );


    return this.firestore
          .collection('users')
          .doc(user[0].uid)
          .set(
            // { User }, { merge: true }
            { 
              uid: user[0].uid,
              displayName: user[0].name,
              username: user[0].username,
              website: user[0].website,
              bio: user[0].bio,
              phone_number: user[0].phone_number,
              gender: user[0].gender, 
            }, { merge: true }
            )

    // console.log(User);
  }
  

  // add photo
  addPhoto(user)
  {
    var User = {
      uid: user[0].uid,
      photoURL: user[0].loc
    }

    return this.firestore
          .collection('users')
          .doc(user[0].uid)
          .set(
            // { User }, { merge: true }
            { 
              uid: user[0].uid,
              photoURL: user[0].loc 
            }, { merge: true }
            )

    // console.log(User);
  }

  addPost(post)
  {

    var Post = {
      uid: post[0].uid,
      bio: post[0].bio,
      loc: post[0].post_pic,
      created_date: post[0].created_date,
    }


    return this.firestore
      .collection('posts').add({
        uid: post[0].uid,
        bio: post[0].bio,
        loc: post[0].post_pic,
        created_date: post[0].created_date,
      })
    }
}