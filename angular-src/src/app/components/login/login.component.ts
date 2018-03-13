import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user= {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.success('You are now logged in...' ,{
          delay: 6000 });
        this.router.navigate(['dashboard']);

      }
      else{
        this.flashMessage.danger(data.msg ,{
          delay: 4000 });
        this.router.navigate(['login']);
      }
    });
  }

}
 