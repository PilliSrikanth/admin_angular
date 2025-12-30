import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:any;
  password:any;

  constructor(private LoginService:LoginService, private router:Router){}

  loginUser(){
    const body = {
      email: this.email,
      password: this.password
    }

    this.LoginService.login(body).subscribe(
      (res:any)=>{
        console.log("LOGIN SUCCESS",res);
        this.router.navigate(['/home'])
        const ownerId = res.owner?._id;  // <-- safe operator

    if(ownerId){
      localStorage.setItem("ownerId", ownerId);
      this.router.navigate(['/home']);
    } else {
      console.log("ownerId missing");
    }


        alert("LOGIN SUCCESS");
      },
      (err)=>{
        console.log("LOGIN FAILED",err);
        alert("LOGIN FAILED");
      }
    )
  }
}