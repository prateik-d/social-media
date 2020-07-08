import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from "../../shared/post.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit 
{

  post_id :any;
  post_data: any;
  post_value: any;

  pid ;
  uid ;
  desc ;
  loc ;
  location ;
  created_date ;

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
      console.log(data.data());


      if(data.data())
      {
        this.pid = data.data().id;
        this.uid = data.data().uid;
        this.desc = data.data().desc;
        this.loc = data.data().loc;
        this.location = data.data().location;
        this.created_date = data.data().created_date;
      }
      else
        this.router.navigate(['dashboard']);          
    });
  }

  submit()
  {
    var desc = ((document.getElementById("desc") as HTMLInputElement).value);
    var location = ((document.getElementById("location") as HTMLInputElement).value);
    var id = ((document.getElementById("id") as HTMLInputElement).value);

    var post = [{
      id : id,
      uid: this.uid,
      desc: desc,
      location: location,
      loc: this.loc,
      created_date: this.created_date,
      updated_date: new Date(),

    }];

    console.log(post);

    this.postService.updatePost(post);
    this.router.navigate(['profile']);          


  }

}
