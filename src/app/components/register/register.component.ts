import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../../service/auth.service";
import { AppComponent } from "../../app.component";
import { log } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fBuild:FormBuilder,
    private authSvc:AuthService,
    private router:Router,
    public app:AppComponent
  ) { this.createForm() }
  
  formReg: FormGroup;
  message;
  messageClass;
  emailValid;
  emailMsg;
  usernameValid;
  usernameMsg;
  
  ngOnInit() {
    // this.formReg.email.dirty = false;
  }
  
  createForm() {
    this.formReg = this.fBuild.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(29),
        this.validEmail
      ])],
      username:['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validUsername
      ])],
      password:['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(29)
      ])],
      confirm:['',Validators.required],
      userType:['',Validators.required]
    },{ validator:this.confirmPass('password','confirm')})
  }

  validEmail(email){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(email.value)){return null}
    else{ return {'validemail':true}}
  }
  validUsername(username){
    const regExp = new RegExp(/^[a-zA-Z0-9_.]+$/);
    if (regExp.test(username.value)){return null}
    else{ return {'validusername':false}}
  }

  confirmPass(password,confirm){
    return (group:FormGroup)=>{
      if(group.controls[password].value === group.controls[confirm].value) {
        return null
      } else { return {'matchpass':true}}
    }
  }


  onRegisterSubmit(){
    // console.log(this.formReg.username.value);
    const user = {
      email:this.formReg.value.email,
      username:this.formReg.value.username,
      password:this.formReg.value.password
    }
    console.log(JSON.stringify(user));

    this.authSvc.registerUser(user).subscribe((res)=>{
      console.log(res)
      if (res.success){
        this.messageClass = "alert alert-success";
        this.formReg.reset();
        this.emailMsg = '';
        this.usernameMsg = '';
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
      } else{
        this.messageClass = "alert alert-danger";
      }
      this.message = res.message;
    })
  }

  checkEmail(){
    if (this.formReg.value.email){
      this.authSvc.cekEmail(this.formReg.value.email).subscribe(res=>{
        if (res.success){
          this.emailValid = true;
        } else{
          this.emailValid = false;
        }
        this.emailMsg = res.message;
      })
    }
  }
  
  checkUsername(){
    if (this.formReg.value.username){
      this.authSvc.cekUsername(this.formReg.value.username).subscribe(res=>{
        if (res.success){
          this.usernameValid = true;
        } else{
          this.usernameValid = false;
        }
        this.usernameMsg = res.message;
        // console.log(res,this.usernameValid,this.usernameMsg);
      })
    }
  }
  
}
