import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router,private authser:AuthService) {}


  NavigateTo(url:any)
  {
    this.router.navigate([url])

  }

  LogOut(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'LogOut!'
  }).then((result) => {
      if (result.isConfirmed) {
          // Call your delete service here
          this.authser.LogOutMethod()
          
      }
  });

  }

  LogOutMethod(){


    localStorage.removeItem('type')
    localStorage.removeItem('Branch')
    this.router.navigate(['login'])

  }
}
