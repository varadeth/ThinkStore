import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { HomeComponent } from './home/home.component';
import { NgbCarouselConfig, NgbConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewItemComponent } from './items/view-item/view-item.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    ItemAddComponent,
    ItemsComponent,
    ItemsListComponent,
    HomeComponent,
    ViewItemComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [NgbCarouselConfig, NgbConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
