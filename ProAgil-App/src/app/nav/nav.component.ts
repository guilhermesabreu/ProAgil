import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService
             ,public router: Router
             ,private toastr: ToastrService) { }

  ngOnInit() {
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

  entrar(){
    this.router.navigate(['/user/login']);
  }
}
