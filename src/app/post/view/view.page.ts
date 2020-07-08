import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from "../../shared/post.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  post_id :any;
  post_data: any;
  post_value: any;

  pid ;
  uid ;
  desc ;
  loc ;
  location ;

  user: any = [];

  public name;
  public username;
  public website;
  public bio;
  public email;
  public phone_number;
  public gender;
  public photo;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService,
    public firestore: AngularFirestore,
    private storage: AngularFireStorage, 


  ) 
  { 
  }

  ngOnInit() 
  {
    this.post_id = this.route.snapshot.paramMap.get("id");

    this.firestore.collection('users').doc(localStorage.getItem('uid')).valueChanges().subscribe(res=>{
      // console.log(res);

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

    this.firestore.collection('posts').doc(this.post_id).get().subscribe(data=>{
      // console.log(data.data());

              this.pid = data.data().id;
              this.uid = data.data().uid;
              this.desc = data.data().desc;
              this.loc = data.data().loc;
              this.location = data.data().location;
    });

  }

  delete()
  {

    var id = this.pid;
    var loc = this.loc;

    this.storage.storage.refFromURL(loc).delete();

    this.postService.deletePost(id);

    this.router.navigate(['/profile/']);


  }

}
