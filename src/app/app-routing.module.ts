import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        redirectTo: '/'
    },
    {
        path: 'add',
        component: ItemsComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}