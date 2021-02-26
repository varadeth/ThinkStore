import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items.component';
const routes: Routes = [
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