import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-explore-post',
  templateUrl: './explore-post.page.html',
  styleUrls: ['./explore-post.page.scss'],
})
export class ExplorePostPage implements OnInit {
  
  current_uid: string;
  posts: any;
  sort_posts: any = [];
  no_of_posts: any;

  constructor(
    public firestore: AngularFirestore,
  )
  {
    this.current_uid = localStorage.getItem('uid');

    this.getPostsByUid().subscribe((data)=>{
        
      
      this.posts = data;

      data.forEach(element => {
        
        if(element.uid != this.current_uid)
        {
          this.sort_posts.push(element)
        }

      });

      console.log(this.sort_posts)

    });

  }

  ngOnInit() {
  }

  getPostsByUid (): Observable<any> {
    return this.firestore.collection<any> ( "posts" , ref => ref).valueChanges ();
  }
  

}
