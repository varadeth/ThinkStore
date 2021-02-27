import { stringify } from '@angular/compiler/src/util';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../model/ItemModel';

import { ItemServiceService } from './item-service.service';

interface MyObj { 
  key: string,
  payload: {
    val: () => ItemModel
  }
}

describe('ItemServiceService', () => {
  
  let service: ItemServiceService;
  function mockAngularFireDatabase(data) {
    return {
      valueChanges() {
        return of(data);
      }
    }
  }

  function mockPushAngularFireDatabase(data) {
    return {
      push() {
        return '';
      },
      remove() {
        return ''
      },
      snapshotChanges() {
        return of(data);
      }
    }
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
      {
        provide: AngularFireDatabase, useValue: {
          object: () => mockAngularFireDatabase({
            itemName: 'Test',
            itemDescription: 'Description',
            itemPrice: 1,
            itemImagePath: ''
          }),
          list: () => mockPushAngularFireDatabase([
            {
              key: '1',
              payload: {
                val: () => {
                  return {
                    itemName: 'Test 1',
                    itemDescription: 'Description 1',
                    itemPrice: 2,
                    itemImagePath: ''
                  }
                }
              }
            },
            {
              key: '2',
              payload: {
                val: () => {
                  return {
                    itemName: 'Test 2',
                    itemDescription: 'Description 2',
                    itemPrice: 1,
                    itemImagePath: ''
                  }
                }
              }
            }
          ])
        }
      }
    ]
  }));

  it('should be created', () => {
    const service: ItemServiceService = TestBed.get(ItemServiceService);
    expect(service).toBeTruthy();
  });

  it('should return object', async() => {
    service = TestBed.get(ItemServiceService);
    service.getSingleItem('1').subscribe(
      res => {
        expect(res.itemName).toEqual('Test')
      }
    )
  });

  it('should push object', () => {
    service = TestBed.get(ItemServiceService);
    service.addItem({
      itemName: 'Test',
      itemDescription: 'Description',
      itemPrice: 1,
      itemImagePath: ''
    });
  });

  it('delete object', () => {
    service = TestBed.get(ItemServiceService);
    service.deleteItem('1');
  })

  it('get all items', () => {
    service = TestBed.get(ItemServiceService);
    service.getAllItems().subscribe(res => {
      console.log(res);
    });
  })
});
