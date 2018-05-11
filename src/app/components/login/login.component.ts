import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup , Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fBuild:FormBuilder,
    private authSvc:AuthService,
    private router:Router
  ) { this.createForm() }

  fLogin: FormGroup;
  message;
  messageClass;

  ngOnInit() {
  }

  createForm(){
    this.fLogin = this.fBuild.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onLoginSubmit(){
    const user = {
      username: this.fLogin.value.username,
      password: this.fLogin.value.password
    }

    this.authSvc.login(user).subscribe(res=>{
      console.log(res);
      if (res.success){
        this.messageClass = "alert alert-success";
        this.authSvc.simpanUserData(res.token,res.user);
        this.fLogin.reset();
        window.location.reload();
        // setTimeout(() => {
          // this.router.navigate(['/'])
        // }, 1000);
      } else{
        this.messageClass = "alert alert-danger";
      }
      this.message = res.message;
    })
  }

}
