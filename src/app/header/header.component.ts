import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  subscription = new Subscription();
  collapsed: boolean;
  constructor(
    private dataStorageSvc: DataStorageService,
    private authSvc: AuthService) { }

  ngOnInit() {
    this.subscription.add(this.authSvc.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    }));
  }

  onSaveData() {
    this.dataStorageSvc.storeRecipes();
  }

  onFetchData() {
    this.dataStorageSvc.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authSvc.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
