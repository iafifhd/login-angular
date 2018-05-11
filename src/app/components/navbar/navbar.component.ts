import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authSvc:AuthService, private router:Router, 
  ) { }

  userData
  ngOnInit() {
    // console.log(this.authSvc.isLogin());
    if (this.authSvc.isLogin()) {
      this.authSvc.getProfile().subscribe((res) => {
        console.log(res);
        this.userData = res.user
      })
    } else { this.userData = {} }
  }

  onLogoutClick(){
    this.authSvc.logout();
    alert('Log Out...')
    this.router.navigate(['/']);
  }

}
