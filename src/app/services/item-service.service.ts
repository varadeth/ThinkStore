import { Injectable } from '@angular/core';
import { ItemModel } from '../model/ItemModel';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from 'angularfire2/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private firebase: AngularFireDatabase) {
  }

  addItem(item: ItemModel) {
    this.firebase.list('items').push(item);
  }

  deleteItem(id: string) {
    this.firebase.list('items').remove(id);
  }

  getSingleItem(id: string) {
    return this.firebase.object<ItemModel>('items/' + id).valueChanges()
  }

  getAllItems() {
    return this.firebase.list<ItemModel>('items').snapshotChanges().pipe(map(list => {
      return list.map(item => {
        const id = item.key;
        return {id, ...item.payload.val()};
      });
    }));
  }

}
