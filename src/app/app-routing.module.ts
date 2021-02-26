import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items.component';
import { ViewItemComponent } from './items/view-item/view-item.component';
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
    },
    {
        path: 'view-item/:id',
        component: ViewItemComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}