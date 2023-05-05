import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Observer, takeUntil, takeWhile } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseComponent } from '../common/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent extends BaseComponent implements OnInit, OnDestroy {
  loginMode = true;
  form: FormGroup = new FormGroup({});
  hidePassword = true;
  errMessage?: string | null;
  obs?: Observable<any>;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { super() }

  ngOnInit(): void {
    this.initForm();
    this.route.url.pipe(takeUntil(this.destroyed$)).subscribe(url=>{
      this.loginMode = url.some(urlSegment=>urlSegment.path.indexOf('login') > -1);
      this.cdr.detectChanges();
    })
  }

  onSubmit() {
    this.isLoading = true;
    const authForm = {...this.form.value}
    if (this.loginMode) {
      this.obs = this.authService.login(authForm);
    }
    else {
      this.obs = this.authService.signup(authForm);
    }

    this.obs?.pipe(takeUntil(this.destroyed$)).subscribe( {
      next: (res) => { 
        this.router.navigate([""])
      },
      error: (err) => {
        this.errMessage = err;
        this.isLoading = false
        this.cdr.detectChanges();
      }
    })
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required)
    })

  }


  ngOnDestroy(): void {
      this.onDestroy();
  }

}
