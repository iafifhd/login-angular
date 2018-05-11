import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authSvc:AuthService) { }
  userData;
  ngOnInit() {
    if (this.authSvc.isLogin()){
      this.authSvc.getProfile().subscribe((res) => {
        console.log(res);
        this.userData = res.user
      })
    } else { this.userData = {} }
    
  }

}
