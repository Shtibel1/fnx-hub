import { Injectable } from '@angular/core';
import { Repository } from '../models/repository.model';
import { BehaviorSubject } from 'rxjs';
import { StorageEnum } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService  {
  bookmarksChange = new BehaviorSubject<Repository[]>([]);
  constructor() {}

  saveBookmark(repo: Repository) {
    this.bookmarksChange.next([...this.bookmarksChange.value, repo])
    localStorage.setItem(StorageEnum.BOOKMARKS, JSON.stringify(this.bookmarksChange.value))
  }

  loadBookmarks() {
    const bkmrks = localStorage.getItem(StorageEnum.BOOKMARKS)
    if (bkmrks) {
      this.bookmarksChange.next(JSON.parse(bkmrks))
    }
  }

  removeBookmark(id: number) {
    const bookmarks = [...this.bookmarksChange.value];
    const index = bookmarks.findIndex(bookmark => bookmark.id == id);
    bookmarks.splice(index,1);
    this.bookmarksChange.next(bookmarks);
  }
}
