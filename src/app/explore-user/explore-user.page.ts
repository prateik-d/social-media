import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { leftJoinDocument } from '../shared/collectionJoin';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Component({
  selector: 'app-explore-user',
  templateUrl: './explore-user.page.html',
  styleUrls: ['./explore-user.page.scss'],
})
export class ExploreUserPage implements OnInit {
  current_uid: string;
  users: any = [];
  sort_users_1: any = [];
  sort_users_2: any = [];

  arr1: any = [];
  arr2: any = [];
  arr3: any = [];

  constructor(    
    public firestore: AngularFirestore,
  ) 
  { 
    this.current_uid = localStorage.getItem('uid');

    this.getUsers().subscribe((data)=> {

      
      data.forEach(element => {
        
        if(element.uid != this.current_uid)
        {
          this.sort_users_1.push(element)
          // this.arr1.push(element.uid)
          this.users.push(element)
        }
        
      });
      
    });
   
    // console.log(this.arr1)


    this.getFollowingUsers().subscribe((data)=> {
      
      data.forEach(element => {  
          this.sort_users_2.push(element)
          
          if(element.following_person != this.current_uid)
          {
            this.arr1.push(element.followed_person)
          }
          else
          {
            this.arr2.push(element.followed_person)
          }
      });
      // console.log(this.sort_users_2)    // list of users who is not following by current user

      // let arr1 = this.sort_users_1.filter(e => {
      //   return !this.sort_users_2.some(item => item.followed_person == e.uid);
      // });
  
    });
    
    // console.log(this.arr1)
    // console.log(this.users)

    console.log(this.sort_users_1)      // list of user w/o current user
    console.log(this.sort_users_2)      // jyana follow karat nai
    console.log(this.arr1)      // jyana follow karat nai
    console.log(this.arr2)      // jyana follow karto

    // const pqr:any = this.arr2;
    // // user => pqr.indexOf(user.uid) != -1

    // var  List1 = this.sort_users_1.filter(user =>{return '1'});
        
        // { return this.arr2 && this.arr2.indexOf(user.uid) !== -1; }
    // let  List1 = {return this.sort_users_1 && this.sort_users_1.indexOf(this.arr1) !== -1; }
    

    // console.log(List1);

    // this.arr2.forEach(element => {
    //   let data = this.getUserDetails(element);

    //   console.log(data);
    // });

  }

  ngOnInit() {
  }

  getUsers (): Observable<any> {
    return this.firestore.collection<any> ( "users" , ref => ref).valueChanges ();
  }
  

  getUserDetails (uid): Observable<any> {
    return this.firestore.collection<any> ( "users" , ref => ref
    .where('uid', '==', uid)
    ).valueChanges ();
  }
  
  getFollowingUsers (): Observable<any> {
    return this.firestore
      .collection<any> ( "follow_data" , ref => ref
        // .where('following_person', '==', this.current_uid) 
      )
      .valueChanges ();
  }

}
