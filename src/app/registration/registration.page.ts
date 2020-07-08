import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  user=[];

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
   
  }

  signUp(email, password, name ){
    
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
        // Do something here
      
            // this.authService.SendVerificationMail()
        // this.router.navigate(['verify-email']);

        this.user = [
          {
            uid: res.user.uid, 
            displayName: name.value, 
            email: email.value, 
            photoURL: 'asdfbgvn', 
            emailVerified: 'true', 
            test: 'test'
          }
        ]
    
        this.authService.extraInfo(this.user);

        this.router.navigate(['dashboard']);          

        console.log(res.user.uid);

      }).catch((error) => {
        window.alert(error.message)
      })
  }

}