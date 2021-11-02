import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataStoreService } from '../services/data-store.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: any[]=[];

  isloggedIn: any;
  isAdmin: any;

  constructor(private headerService: HeaderService, private router: Router, private dataStore:DataStoreService) { }

  ngOnInit(): void {
    this.dataStore.isAdmin.subscribe(isAdmin => {
      console.log(isAdmin);
      this.isAdmin = isAdmin;
    });
    this.headerService.getCategories()
      .subscribe((res: any) => {
        console.log(res);
        this.categories = res;
      });
      this.isloggedIn = localStorage.getItem('authToken');
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
    //setTimeout(function(){ window.location.reload(); }, 1000);
  }

}