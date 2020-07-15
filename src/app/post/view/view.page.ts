import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from "../../shared/post.service";
import { CommentService } from "../../shared/comment.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { leftJoinDocument } from '../../shared/collectionJoin';



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

  new_comment: string="";
  comment: any = [];
  comments: any = [];

  // @ViewChild('add_cmnt') add_cmnt: ElementRef;
  

  edit = false;
  existing_comment;

  current_id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public postService: PostService,
    public commentService: CommentService,
    public firestore: AngularFirestore,
    private storage: AngularFireStorage, 

  ) 
  { 
  }

  ngOnInit() 
  {
    this.post_id = this.route.snapshot.paramMap.get("id");
    this.current_id = localStorage.getItem('uid');


    /* get user info */

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

    /* get post info */

    this.firestore.collection('posts').doc(this.post_id).get().subscribe(data=>{
      // console.log(data.data());

              this.pid = data.data().id;
              this.uid = data.data().uid;
              this.desc = data.data().desc;
              this.loc = data.data().loc;
              this.location = data.data().location;
    });

    this.getComments().subscribe((data)=>{
      
      
      this.comments = data;
      
      console.log(this.comments);
    });

    // console.log(this.pid)

  }

  delete()
  {

    var id = this.pid;
    var loc = this.loc;

    this.storage.storage.refFromURL(loc).delete();

    this.postService.deletePost(id);

    this.router.navigate(['/profile/']);

  }

  add_new_comment()
  {

    this.new_comment = ((document.getElementById("comment") as HTMLInputElement).value);
    
    if(this.new_comment.length != 0)
    {
      console.log('not empty');
      
      let id = this.firestore.createId();
      
      this.comment = [
        {   
          id: id,
          pid: this.pid,
          uid: localStorage.getItem('uid'),
          comment: this.new_comment,
          created_date: new Date(),
        }
      ];
      
      this.commentService.addComments(this.comment);
      this.new_comment = '';
      // this.router.navigate(['/view-post/', this.post_id]);
      // location.reload();
    }

  }

  edit_comment(c_id)
  {
    
    if(this.edit == false)
    {
      this.edit = c_id ;
      
      this.firestore.collection('comments').doc(c_id).get().subscribe(data=>{
        this.existing_comment = data.data().comment  
      });
    }
    else
      this.edit = false ;
  }

  delete_comment(c_id)
  {
    this.commentService.deleteComment(c_id);
    //   // this.new_comment = '';
      this.router.navigate(['/view-post/', this.post_id]);
  }

  update_comment()
  {
    var existing_comment = ((document.getElementById("existing_comment") as HTMLInputElement).value);
    var c_id = ((document.getElementById("c_id") as HTMLInputElement).value);
    var uid = ((document.getElementById("uid") as HTMLInputElement).value);
    var created_date = ((document.getElementById("created_date") as HTMLInputElement).value);

    var comment = {
      c_id : c_id,
      pid : this.post_id,
      uid: uid,
      comment : existing_comment,
      created_date : created_date,
      updated_date : new Date(),
    };

    console.log(comment);

    this.commentService.updateComment(comment);
    //   // this.new_comment = '';
      this.router.navigate(['/view-post/', this.post_id]);

  }

  getComments (): Observable<any> {
      // return this.firestore.collection<any> ( "comments" , ref => ref.where ( 'pid' , '==' , this.post_id ) ).valueChanges ();
      return this.firestore
        .collection<any> ( "comments" , ref => ref
          .where ( 'pid' , '==' , this.post_id ) )
          .valueChanges ()
          .pipe(
            leftJoinDocument(this.firestore, 'uid', 'users' )

          )
          ;
    }
    
  getUsers (uid): Observable<any> {
      return this.firestore.collection<any> ( "users" , ref => ref.where ( 'uid' , '==' , uid ) ).valueChanges ();
  }
    
  getCommentsById (c_id): Observable<any> {
      return this.firestore.collection<any> ( "users" , ref => ref.where ( 'uid' , '==' , c_id ) ).valueChanges ();
  }

}
