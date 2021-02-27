import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsComponent } from './items/items.component';
import { ViewItemComponent } from './items/view-item/view-item.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';

describe('AppComponent', () => {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationbarComponent,
        HomeComponent,
        ItemsListComponent,
        ItemsComponent,
        ItemAddComponent,
        ViewItemComponent,
        ErrorComponent
      ],
      imports: [RouterModule.forRoot(routes), FormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ThinkStore'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ThinkStore');
  });
});
