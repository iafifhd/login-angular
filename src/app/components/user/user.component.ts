import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }
  
  userData;
  ngOnInit() {
    if (this.authSvc.isLogin()) {
      this.authSvc.getProfile().subscribe((res) => {
        console.log(res);
        this.userData = res.user;
        if (res.user.role.role_id != 2) { this.router.navigate(['/']) }
      })
    }
  }

}
