import { ChangeDetectionStrategy, Component, Input, OnInit, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Repository } from 'src/app/core/models/repository.model';
import { BookmarksService } from 'src/app/core/services/bookmarks.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryComponent implements OnInit {
  @Input() repository?: Repository
  isBookmarked = false;
  constructor(
    private bookmarksService: BookmarksService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const bookmarks = this.bookmarksService.bookmarksChange.value
    const exist = bookmarks.find(b =>  this.repository?.id === b.id) // check if repo is bookmarked
    if (exist) {
      this.isBookmarked = true;
    }
  }

  onBookmark() {
    if(this.repository) {
      if (!this.isBookmarked) {
        this.bookmarksService.saveBookmark(this.repository)
        this.openSnackBar("Repository Bookmarked Successfully");
      }
      else{
        this.bookmarksService.removeBookmark(this.repository.id)
      }
      this.isBookmarked = !this.isBookmarked
    }
  }
  private openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 3000,
      panelClass: 'success-snackbar',
      verticalPosition: 'top'
    });
  }
}
