import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { of } from 'rxjs';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { environment } from 'src/environments/environment';

import { ItemAddComponent } from './item-add.component';

describe('ItemAddComponent', () => {
  let component: ItemAddComponent;
  let fixture: ComponentFixture<ItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAddComponent ],
      imports: [
        AngularFireStorageModule,
        MatCardModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        {
          provide: ItemServiceService, useValue: {
            addItem: () => {return;}
          }
        }, AngularFireStorage, AngularFireDatabase
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('invalid file input', async () => {
    const image = {
      target: {
        files: [
          {
            type: 'text/plain'
          }
        ]
      }
    };
    component.checkIfImageType(image);
    expect(component.fileInvalid).toBeTruthy();
  });

  it('valid file input', async () => {
    const image = {
      target: {
        files: [
          {
            type: 'image/jpeg'
          }
        ]
      }
    };
    component.checkIfImageType(image);
    expect(component.fileInvalid).toBeFalsy();
  });

  it('submitting form when invalid', async () => {
    fixture.whenStable().then( () => {
      const itemName = component.cardForm.form.controls.name;
      const itemPrice = component.cardForm.form.controls.price;
      const itemDescription = component.cardForm.form.controls.description;
      component.imageFile = new File([''], 'file.txt', {type: 'image/jpeg'});
      itemName.setValue('Bat');
      itemPrice.setValue('abc');
      itemDescription.setValue('Dummy Description');
      component.onSubmit();
      expect(component.isFormValid()).toBeFalsy();
    });
  });

  it('submitting when form is valid', async () => {

    fixture.whenStable().then( () => {
      const itemName = component.cardForm.form.controls.name;
      const itemPrice = component.cardForm.form.controls.price;
      const itemDescription = component.cardForm.form.controls.description;
      component.imageFile = new File([''], 'file.txt', {type: 'image/jpeg'});
      itemName.setValue('Bat');
      itemPrice.setValue(1);
      itemDescription.setValue('Dummy Description');
      component.onSubmit();
      expect(component.isFormValid()).toBeTruthy();
    });
  });
});
