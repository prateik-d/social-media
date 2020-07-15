import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthenticationService } from "../shared/authentication-service";
import { ProfileService } from "../shared/profile-service";
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {

  profiles:any = [];

  emails:any =[];

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


  /* upload img */

  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  // images: Observable<MyData[]>;

  //File details  
  fileName:string;
  fileSize:number;

  //Status check 
  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection;


  constructor(
    public ngFireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public firebase: AngularFireDatabase,
    public authService: AuthenticationService,
    public profService: ProfileService,
    public router: Router,
    private storage: AngularFireStorage, 
    private database: AngularFirestore,

  ) 
  { 
    this.imageCollection = database.collection('users');
    // this.images = this.imageCollection.valueChanges();
  }

  ngOnInit() 
  {

    // this.getAllPosts().subscribe((data)=>{
    //   this.getPostEntry(this.email).subscribe((data)=>{

    //     console.log(data);

    // });


    this.firestore.collection('users').doc(localStorage.getItem('uid')).valueChanges().subscribe(res=>{
      console.log(res);

      console.log(localStorage.getItem('uid'));

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

  }

  async submit(event)
  {
    var name = ((document.getElementById("name") as HTMLInputElement).value);
    var username = ((document.getElementById("username") as HTMLInputElement).value);
    var website = ((document.getElementById("website") as HTMLInputElement).value);
    var bio = ((document.getElementById("bio") as HTMLInputElement).value);
    var email = ((document.getElementById("email") as HTMLInputElement).value);
    var phone_number = ((document.getElementById("phone_number") as HTMLInputElement).value);
    var gender = ((document.getElementById("gender") as HTMLInputElement).value);
    // var photoURL = '123';

    this.getAllPosts().subscribe((data)=>{
        
      var arr_email = [];
      var arr_uname = [];

      data.forEach(function (value) 
      {
        arr_email.push(value.email);
        arr_uname.push(value.username);
        // console.log(value.displayName);
      });
      
      const found_email = arr_email.find(i => i == email);
      const found_uname = arr_uname.find(i => i == username);

      // console.log(arr_uname);

      if(found_email != undefined)    //  found in db
      {
        console.log('email found in db');
        
        if(this.email != found_email)    // coampre value with previous email
        {
          document.getElementById('email').focus()
          
          console.log('email already exist')
        }
      }
      
      
      
      if(found_uname != undefined)    // found in array
      {
        console.log('uname found in db');
        
        if(this.username != found_uname)    // coampre value with previous email
        {
          document.getElementById('username').focus()
       
          // return 'false';
          console.log('username already exist')
        }
      }


    });

    this.user = [
      {
        uid: localStorage.getItem('uid'), 
        name: name, 
        username: username, 
        website: website, 
        bio: bio, 
        email: email, 
        phone_number: phone_number, 
        gender: gender, 
        // photoURL:photoURL,
      }

      

    ];

    // console.log(this.user);
    
    this.profService.addInfo(this.user);
    this.router.navigate(['/profile/']);



  }

  
   uploadFile(event: FileList) {
    

    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }

    // this.isUploading = true;
    // this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `users/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    console.log(path);

    var loc_ = path.replace('users/', '');
    
    const loc = 'https://firebasestorage.googleapis.com/v0/b/laravel-insta.appspot.com/o/users%2F' + loc_ + '?alt=media';
    console.log(loc_);
    console.log(loc);

    this.user = [
      {
        uid: localStorage.getItem('uid'), 
        loc: loc,
      }
    ];

    this.profService.addPhoto(this.user);
    this.router.navigate(['/profile/']);


   
  }
  
  getPosts (): Observable<any> {
    return this.database.collection<any> ( "users" , ref => ref.where ( 'uid' , '==' , localStorage.getItem('uid') ) ).valueChanges ();
  }

  getAllPosts (): Observable<any> {
    return this.database.collection<any>( "users" ).valueChanges ();
  }
  
  getPostEntry ( email: string ): Observable<any> {
    // console.log(email);

    return this.database.collection<any> ( "users" , ref => ref.where ( 'email' , '==' , this.email ) ).valueChanges ();
  }

  check_email(email: string): void
  {

    // console.log(email);

    this.getAllPosts().subscribe((data)=>{
        
        var arr2 = [];
  
        data.forEach(function (value) 
        {
          arr2.push(value.email);
        });
        
        const found = arr2.find(i => i == email);

        console.log(found);

        if(found != undefined)    // not found in array
        {
          if(this.email != found)    // coampre value with previous email
          {
            document.getElementById('email').focus()
         
            console.log('email already exist')
          }
        }


      });
      
  }

  check_uname(uname: string): void
  {

    console.log(uname);

    this.getAllPosts().subscribe((data)=>{
        
        var arr2 = [];
  
        data.forEach(function (value) 
        {
          arr2.push(value.username);
        });
        
        const found = arr2.find(i => i == uname);

        // console.log(found);

        if(found != undefined)    // not found in array
        {
          if(this.username != found)    // coampre value with previous email
          {
            document.getElementById('username').focus()
         
            console.log('username already exist')
          }
        }


      });
      
  }
}
