import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/core/models/repository.model';
import { BookmarksService } from 'src/app/core/services/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  markedRepositories: Repository[] = []
  constructor(
    private bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
    this.bookmarksService.bookmarksChange.subscribe(bkmrks => {
      this.markedRepositories = bkmrks
    })
  }

}
