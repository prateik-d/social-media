import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { PostService } from "../../shared/post.service";
import { ProfileService } from "../../shared/profile-service";
import { AngularFirestore } from '@angular/fire/firestore';


import { Router } from '@angular/router';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
 
  fileName: string;

  task: AngularFireUploadTask;

  post: any = [];



  constructor(
                private storage: AngularFireStorage, 
                public router: Router,
                public psotService: PostService,
                public profService: ProfileService,
                public firestore: AngularFirestore,

  
              ) 
              { 
                
              }

  ngOnInit() {
  }

  submit()
  {
    var desc = ((document.getElementById("desc") as HTMLInputElement).value);
    var post_pic = localStorage.getItem('posts_' + localStorage.getItem('uid'));
    var location = ((document.getElementById("location") as HTMLInputElement).value);
    // console.log(desc);
    // console.log(post_pic);

    let id = this.firestore.createId();


    this.post = [
      {   
          id:id,
          uid: localStorage.getItem('uid'),
          desc: desc,
          location: location,
          post_pic: post_pic,
          created_date: new Date(),
      }
    ];

    // console.log(this.post);

    this.psotService.addPost(this.post);
    localStorage.removeItem('posts_' + localStorage.getItem('uid'));
    this.router.navigate(['/profile/']);
    
  }
  upload(event: FileList)
  {
    
    if(('posts_' + localStorage.getItem('uid')) == null )
    {

      
      var myPreviousPost = (localStorage.getItem('posts_' + localStorage.getItem('uid')));

      console.log(myPreviousPost);
      
      this.storage.storage.refFromURL(myPreviousPost).delete();
      
      localStorage.removeItem('posts_' + localStorage.getItem('uid'));
    }
   
      

    // The File object
    const file = event.item(0);

    // console.log(event);
    // console.log(file);


    // // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    // // this.isUploading = true;
    // // this.isUploaded = false;


    this.fileName = file.name;

    // // The storage path
    const path = `posts/${new Date().getTime()}_${file.name}`;

    // // Totally optional metadata
    const customMetadata = { app: 'Posts images' };

    // //File reference
    const fileRef = this.storage.ref(path);

    // // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // console.log(path);

    var loc_ = path.replace('posts/', '');
    
    const loc = 'https://firebasestorage.googleapis.com/v0/b/laravel-insta.appspot.com/o/posts%2F' + loc_ + '?alt=media';
        
        
    var ls_loc = 'posts_' + localStorage.getItem('uid');
    
    localStorage.setItem(ls_loc, loc);

    console.log(localStorage.getItem(ls_loc));

  }

}
