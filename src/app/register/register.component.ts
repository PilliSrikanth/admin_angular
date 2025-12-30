import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fullName:any;
  mobile:any;
  email:any;
  password:any;

  constructor(private userService:LoginService, private router:Router){}

  registerUser(){
    const body = {
      name: this.fullName,
      mobile: this.mobile,
      email: this.email,
      password: this.password
    }

    this.userService.register(body).subscribe(
      (res:any)=>{
        console.log(res);
        this.router.navigate(['/login']);
        alert("REGISTER SUCCESS");
      },
      (err)=>{
        console.log(err);
        alert("REGISTER FAILED");
      }
    )
  }

}