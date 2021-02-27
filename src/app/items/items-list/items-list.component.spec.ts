import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, SnapshotAction } from 'angularfire2/database';
import { of } from 'rxjs';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { environment } from 'src/environments/environment';

import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let router: Router;
  let service: ItemServiceService;
  router = jasmine.createSpyObj('router', ['navigate']);
  beforeEach(async(() => {
    let items: ItemModel[] = 
    [
      {
        itemName: 'Test 1',
        itemDescription: 'Description 1',
        itemPrice: 1,
        itemImagePath: '',
        id : '1'
      },
      {
        itemName: 'Test 2',
        itemDescription: 'Description 2',
        itemPrice: 2,
        itemImagePath: '',
        id : '2'
      },
      {
        itemName: 'Test 3',
        itemDescription: 'Description 3',
        itemPrice: 3,
        itemImagePath: '',
        id : '3'
      }
    ];
    TestBed.configureTestingModule({
      declarations: [ ItemsListComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        {
          provide: Router, useValue: router
        },
        {
          provide: ItemServiceService, useValue: {
            getAllItems: () => of<ItemModel[]>(items),
            deleteItem: () => {return;}
          }
        }, 
        AngularFireDatabase
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items loaded', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(3);
  });

  it('should navigate to correct item', () => {
    component.onView(0);
    expect(router.navigate).toHaveBeenCalledWith(['/view-item/', '1'])
  });

  it('should delete an item', () => {
    service = TestBed.get(ItemServiceService);
    spyOn(service, 'deleteItem');
    component.onDelete(0);
    expect(service.deleteItem).toHaveBeenCalledWith('1');
  })

});
