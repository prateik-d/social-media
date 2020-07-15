import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase} from '@angular/fire/database';
import { AuthenticationService } from "../shared/authentication-service";
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { PostService } from "../shared/post.service";
import { ProfileService } from "../shared/profile-service";


@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.page.html',
  styleUrls: ['./show-profile.page.scss'],
})
export class ShowProfilePage implements OnInit {

  posts;
  no_of_posts;

  user: any = [];

  username_get;

  public current_uid;

  public uid;
  public name;
  public username;
  public website;
  public bio;
  public email;
  public phone_number;
  public gender;
  public photo;

  public followers;
  public following;
  public isFollowing = false;


  constructor(
    public firestore: AngularFirestore,
    public firebase: AngularFireDatabase,
    public authService: AuthenticationService,
    public profService: ProfileService,
    public postService: PostService,
    public router: Router,
    private route: ActivatedRoute,

  ) 
  {

    this.username_get = this.route.snapshot.paramMap.get("id");
    this.current_uid = localStorage.getItem('uid');


    // console.log(this.current_uid);

    this.getUserByUsername(this.username_get).subscribe((data)=>{

      
      if(data.length != 0)
      {
        this.user = data[0];
        // console.log(this.user);
        
        if(this.current_uid === data[0].uid)
        {
          this.router.navigate(['profile']);
        }
        else
        {
          this.uid = this.user.uid;
          this.name = this.user.displayName;
          this.username = this.user.username;
          this.website = this.user.website;
          this.bio = this.user.bio;
          this.email = this.user.email;
          this.phone_number = this.user.phone_number;
          this.gender = this.user.gender;
          this.photo = this.user.photoURL;
        }
      }
      else
      {
        this.router.navigate(['page-not-found']);
      }
      
      
      // console.log(this.uid);
      
        this.getPostsByUid(this.uid).subscribe((data)=>{
        
          // console.log(data);
        
          this.posts = data;
          this.no_of_posts = data.length;

          // console.log(this.no_of_posts);
        
        });

        this.getFollowersByUid(this.uid).subscribe((data)=>{
          
          this.followers = data.length;
          // console.log(this.followers);
          
        });
        
        this.getFollowingByUid(this.uid).subscribe((data)=>{
          
          this.following = data.length;
          // console.log(this.following);

        });
        
        this.checkFollow(this.current_uid, this.uid).subscribe((data)=>{
          
          // this.isFollowing = data.length;
          // alert(data.length);

          if(data.length != 0)
          {
            this.isFollowing = false;
          }
          else
          {
            this.isFollowing = true;
          }

        });
    });


        
  }

  ngOnInit() 
  {
  
  }

  follow(uid)
  {
    console.log(uid);
    
    let id = this.firestore.createId();

    var follows = {
      id: id,
      followed_person: uid,                   // jyala follow karaychy to id
      following_person: this.current_uid,     // jyane follow kelay tyacha to id
      created_date : new Date(),
    }

    this.profService.follow(follows);

  }

  unfollowing(uid)
  {
    console.log(uid);
    
    this.checkFollow(this.current_uid, uid).subscribe((data)=>{

      console.log(data[0].id);

      if(data.length != 0)
      {
        this.profService.unfollow(data[0].id);
      }


    });

  }


  getUserByUsername (uname): Observable<any> {
    return this.firestore.collection<any> ( "users" , ref => ref.where ( 'username' , '==' , uname ) ).valueChanges ();
  }
  getPostsByUid (uid): Observable<any> {
    return this.firestore.collection<any> ( "posts" , ref => ref.where ( 'uid' , '==' , uid ) ).valueChanges ();
  }
  
  getFollowersByUid (uid): Observable<any> {
    return this.firestore.collection<any> ( "follow_data" , ref => ref.where ( 'followed_person' , '==' , uid ) ).valueChanges ();
  }
  
  getFollowingByUid (uid): Observable<any> {
    return this.firestore.collection<any> ( "follow_data" , ref => ref.where ( 'following_person' , '==' , uid ) ).valueChanges ();
  }
  
  checkFollow(c_uid, uid)
  {
    return this.firestore.collection<any> ( "follow_data" , ref => ref.where ( 'following_person' , '==' , c_uid ).where('followed_person' , '==' , uid ) ).valueChanges ();
  }

}
