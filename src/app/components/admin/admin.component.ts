import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }
  
  userData;
  allUser;
  ngOnInit() {
    if (this.authSvc.isLogin()) {
      this.authSvc.getProfile().subscribe((res) => {
        console.log(res);
        this.userData = res.user;
        if (res.user.role.role_id!=1) 
          {this.router.navigate(['/'])}
      })

      this.authSvc.getAlluser().subscribe((res)=>{
        this.allUser=res
        console.log(this.allUser);
      })
    }
  }

  delUser(user){
    if (confirm("Delete : " + user.username)) {
/*       this.authSvc.delUser(user._id).subscribe(res => {
        console.log(res);
        console.log("data dihapus");
        this.ngOnInit();
      }) */

    }
 
  }

}
