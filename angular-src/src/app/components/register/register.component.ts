import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessage} from 'angular-flash-message';

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

  constructor(private validateService: ValidateService, private flashMessage: FlashMessage) { }

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
      }else{
        // on Success
        this.flashMessage.success('User Registered Successfully..',{
          delay: 3000 });
        return false;
      }

    }
    
  }

 

}
