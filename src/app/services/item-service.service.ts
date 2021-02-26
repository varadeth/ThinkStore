import { Injectable } from '@angular/core';
import { ItemModel } from '../model/ItemModel';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  
  itemsCollection: AngularFireList<ItemModel>;
  
  constructor(private firebase: AngularFireDatabase) { 
    this.itemsCollection = this.firebase.list('items')
  }

  addItem(item: ItemModel) {
    this.itemsCollection.push(item);
  }

  deleteItem(id: string) {
    this.itemsCollection.remove(id);
  }

  getSingleItem(id: string) {
    return this.firebase.object<ItemModel>('items/' + id).valueChanges()
  }

}
