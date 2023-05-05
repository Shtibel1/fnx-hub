import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/core/models/repository.model';
import { RepositoriesService } from 'src/app/core/services/repositories.service';
import { BaseComponent } from '../../common/base.component';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent extends BaseComponent implements OnInit {
  repositories?: Repository[]

  constructor(
    private repositoriesServic:RepositoriesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.repositoriesServic.repositoriesChange.subscribe(repos => {
      if(repos)
        this.repositories = repos
    })
  }

}
