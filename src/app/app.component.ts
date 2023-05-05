import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './core/services/bookmarks.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fnx-hub';
  constructor(
    private bookmarkService: BookmarksService,
    private authService: AuthService){}

  ngOnInit(): void {
      this.bookmarkService.loadBookmarks();
      this.authService.autoLogin();
  }
}
