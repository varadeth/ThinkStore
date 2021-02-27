import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { of } from 'rxjs';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { environment } from 'src/environments/environment';

import { ViewItemComponent } from './view-item.component';

describe('ViewItemComponent', () => {
  let component: ViewItemComponent;
  let fixture: ComponentFixture<ViewItemComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        MatCardModule,
        MatFormFieldModule,
      ],
      providers: [AngularFireDatabase,
        { provide: ItemServiceService, useValue: {
            getSingleItem:() => of<ItemModel>(
              {itemName: 'Test', itemDescription: 'Description', itemPrice: 4, itemImagePath: ''}
            )
          }
        },
        { provide: ActivatedRoute, useValue: {snapshot : {params : { 'id' : 0 }}}  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return item', () => {
    expect(component.item.itemName === 'Test');
  })
});
