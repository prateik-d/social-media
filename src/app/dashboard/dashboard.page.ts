import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from '../shared/collectionJoin';
import { HeaderComponent } from '../header/header.component'
import { CommentService } from '../shared/comment.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  current_uid: string;
  posts: any = [];
  sort_posts: any = [];
  no_of_posts: any;
  arr1: any = [];
  arr2: any = [];
  comments: any = [];
  
  new_comment: string ="";
  comment: any = [];

    edit = false;
    existing_comment;

  

  constructor(
    public firestore: AngularFirestore,
    public commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,

  )
  { 
    this.current_uid = localStorage.getItem('uid');


    this.getPosts().subscribe((data)=>{

      data.forEach(element => {
        
        // if(element.uid != this.current_uid)
        {
          this.sort_posts.push(element)
        }

      });

      // console.log(this.sort_posts)

    });

    this.getFollowData().subscribe((data)=> {
      
      data.forEach(element => {  
          
          // console.log(element);
          if(element.following_person != this.current_uid)
          {
            this.arr1.push(element.followed_person)
          }
          else
          {
            this.arr2.push(element.followed_person)     //uid of users whom cuser follow
          }
          
        });
        
        
        this.arr2.forEach(element => {
          
          this.getPost(element).subscribe((data) => {
              
            data.forEach(post => {

              // console.log(post);
          
              if(post.uid != null)
              {
                this.posts.push(post);
              }
              
              this.getComments(post.id).subscribe((comments)=>{
      
                comments.forEach(comment => {
                  // console.log(comment);
                  this.comments.push(comment);
                });
                
                // this.comments = comments;
                
              });
              
              
            });
            
          })
          
          
          
        });
        
        console.log(this.comments);
      
    });
    
    // console.log(this.posts)

  }

  ngOnInit() 
  {
    
  }


  add_new_comment(p_id)
  {

    var new_comment = (document.getElementById(p_id) as HTMLInputElement).value;
    // var pid = ((document.getElementById("pid") as HTMLInputElement).value);
    
    // console.log(new_comment);
    // console.log(p_id);
    // return;

    if(new_comment.length != 0)
    {
      console.log('not empty');
      
      let id = this.firestore.createId();
      
      this.comment = [
        {   
          id: id,
          pid: p_id,
          uid: localStorage.getItem('uid'),
          comment: new_comment,
          created_date: new Date(),
        }
      ];

      // console.log(this.comment);

      // return;
      
      this.commentService.addComments(this.comment);
      this.new_comment = '';
      // this.router.navigate(['/view-post/', this.post_id]);
      // location.reload();
    }
    else{
      console.log('comment not added');
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

  update_comment(p_id)
  {
    var existing_comment = ((document.getElementById("existing_comment") as HTMLInputElement).value);
    var c_id = ((document.getElementById("c_id") as HTMLInputElement).value);
    var uid = ((document.getElementById("uid") as HTMLInputElement).value);
    var created_date = ((document.getElementById("created_date") as HTMLInputElement).value);
    var pid = ((document.getElementById("pid") as HTMLInputElement).value);
    
    var comment = {
      c_id : c_id,
      pid : p_id,
      uid: uid,
      comment : existing_comment,
      created_date : created_date,
      updated_date : new Date(),
    };

    // console.log(comment);

    this.commentService.updateComment(comment);
    //   // this.new_comment = '';
      this.router.navigate(['/dashboard/']);

  }


  delete_comment(c_id, p_id)
  {
    this.commentService.deleteComment(c_id);
    //   // this.new_comment = '';
      this.router.navigate(['/dashboard/']);
  }


  getPosts (): Observable<any> {
    return this.firestore.collection<any> ( "posts" , ref => ref).valueChanges ();
  }

  getPostsById (uid): Observable<any> {
    return this.firestore
      .collection<any> ( "posts" , ref => ref.where('uid', '==', uid)).valueChanges ();
  }
  

  getUserById (uid): Observable<any> {
    return this.firestore
      .collection<any> ( "users" , ref => ref.where('uid', '==', uid)).valueChanges ();
  }
  

  getFollowData (): Observable<any> {
    return this.firestore
      .collection<any> ( "follow_data" , ref => ref
        // .where('following_person', '==', this.current_uid) 
      )
      .valueChanges ();
  }


  getComments (post_id): Observable<any> {
    // return this.firestore.collection<any> ( "comments" , ref => ref.where ( 'pid' , '==' , this.post_id ) ).valueChanges ();
    return this.firestore
      .collection<any> ( "comments" , ref => ref
        .where ( 'pid' , '==' , post_id ) )
        .valueChanges ()
        .pipe(
          leftJoinDocument(this.firestore, 'uid', 'users' )

        )
        ;
  }

  getPost (uid): Observable<any> {
    // return this.firestore.collection<any> ( "comments" , ref => ref.where ( 'pid' , '==' , this.post_id ) ).valueChanges ();
    return this.firestore
      .collection<any> ( "posts" , ref => ref
        .where ( 'uid' , '==' , uid ) )
        .valueChanges ()
        .pipe(
          leftJoinDocument(this.firestore, 'uid', 'users' )

        )
        ;
  }
  

}
