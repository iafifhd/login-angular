import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  redirectUrl;

  // cek jika sudah login boleh akses page
  // jika belum login langsung d arahkan ke halaman login
  // digunakan di app module >> app routes
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    if (this.authSvc.isLogin()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}