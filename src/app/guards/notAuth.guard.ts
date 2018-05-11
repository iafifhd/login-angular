import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  // jika sudah login maka page ini tidak bisa d akses
  canActivate() {
    if (this.authSvc.isLogin()){
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}