import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

     // all fields required
    if(! this.validateService.validateRegister(user)){
      //console.log('Enter all field...');
      this.flashMessage.danger('All fields required...',{
        delay: 3000 });
      return false;
    }else{
      // valid email
      if(! this.validateService.validateEmail(user.email)){
        //console.log('Enter a valid email...');
        this.flashMessage.danger('Enter a valid email...',{
          delay: 3000 });
        return false;
      }
      /*** on Success 
       * this method can be used if registered user is not getting authenticated
       * 
        else{
        this.flashMessage.success('User Registered Successfully..',{
          delay: 1000 });
        return false;
      }
      *
       */
      
    }
     
    //register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.success('User registered successfully and can log in..',{
          delay: 6000 });
        this.router.navigate(['login']) ; 
      }else{
        this.flashMessage.danger('User rgisteration failed. Try agiin !!!',{
          delay: 3000 });
        this.router.navigate(['register']) ; 
      }

    });
    
    
  }

 

}
