import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthenticationService } from "../shared/authentication-service";
import { ProfileService } from "../shared/profile-service";
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { PostService } from "../shared/post.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  posts;
  no_of_posts;

  user: any = [];

  public uid;
  public name;
  public username;
  public website;
  public bio;
  public email;
  public phone_number;
  public gender;
  public photo;


  constructor(
    public ngFireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public firebase: AngularFireDatabase,
    public authService: AuthenticationService,
    public profService: ProfileService,
    public postService: PostService,
    public router: Router,
    private storage: AngularFireStorage, 
    private database: AngularFirestore,

  ) 
  {
    
  }

  ngOnInit() 
  {
    this.firestore.collection('users').doc(localStorage.getItem('uid')).valueChanges().subscribe(res=>{
      // console.log(res);
      // console.log(localStorage.getItem('uid'));

      this.user = res;

      this.name = this.user.displayName;
      this.username = this.user.username;
      this.website = this.user.website;
      this.bio = this.user.bio;
      this.email = this.user.email;
      this.phone_number = this.user.phone_number;
      this.gender = this.user.gender;
      this.photo = this.user.photoURL;

      // console.log(this.email);
      
    });


    this.getPosts().subscribe((data)=>{

      console.log(data);

      this.posts = data;
      this.no_of_posts = data.length;


    });


   
  }
  
  getAllPosts(): Observable<any>{
    // return await this.postService.getEvents();
    return this.database.collection<any>( "posts" ).valueChanges ();

  }
  getPosts (): Observable<any> {
    return this.database.collection<any> ( "posts" , ref => ref.where ( 'uid' , '==' , localStorage.getItem('uid') ) ).valueChanges ();
  }


}
