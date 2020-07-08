import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  user = [];
  user_id: any;
  
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {

        console.log(res);

        this.user_id = res.user.uid;

        localStorage.setItem('uid', this.user_id);

        // if(this.authService.isEmailVerified) {
          this.router.navigate(['dashboard']);          
        // } else {
        //   window.alert('Email is not verified')
        //   return false;
        // }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}