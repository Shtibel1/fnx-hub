import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, interval, takeUntil } from 'rxjs';
import { BaseComponent } from '../common/base.component';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { BookmarksService } from 'src/app/core/services/bookmarks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {
  searchCtrl!: FormControl;
  isLoading = false;
  errorMsg!: string;
  constructor(
    private repositoriesService: RepositoriesService,
    private bookmarksService: BookmarksService
  ) {
    super();
   }
  ngOnInit(): void {    
    this.initSearch();
  }

  initSearch(){
    this.searchCtrl = new FormControl<string>("");

    this.searchCtrl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounce(() => interval(200)), // making req to the server 200ms after typing  
    )   
    .subscribe(value => {
      if (value && value.trim() !== "") {
        this.isLoading = true;
        this.repositoriesService.search(value).subscribe({
          next: () => {
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMsg = err;
          }
        });

      }
      else {
        this.repositoriesService.repositoriesChange.next([]);
      }

    });
  }

  ngOnDestroy(): void {
    this.repositoriesService.repositoriesChange.next(null);
    this.onDestroy();
  }
  
}
