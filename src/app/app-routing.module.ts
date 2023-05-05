import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { BookmarksComponent } from "./components/bookmarks/bookmarks.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthInterceptorService } from "./core/interceptors/auth-interceptor.service";
import { AuthGuard } from "./core/guards/auth.guard";




const appRoutes: Routes = [
    {path: '', redirectTo: 'search', pathMatch: 'full'},
    {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
    {path: 'bookmarks', component: BookmarksComponent, canActivate:[AuthGuard]},
    {path: 'login', component: AuthComponent},
    {path: 'signup', component: AuthComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}