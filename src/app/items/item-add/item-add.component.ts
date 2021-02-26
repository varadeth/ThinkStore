import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  fileInvalid = false;
  imageFile: File;
  item: ItemModel;
  @ViewChild('image', {static: false}) imageSelector;
  @ViewChild('cardForm', {static: false}) cardForm: NgForm;
  constructor(private itemService: ItemServiceService, private storage: AngularFireStorage) { }
  

  ngOnInit() {
  }

  onSubmit() {
    if(this.isFormValid()) {
      var filePath = `images/${this.imageFile.name.split('.').slice(0,-1)}_${new Date().getTime()}`
      this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
        finalize( () => {
          this.storage.ref(filePath).getDownloadURL().subscribe((url) => {
            this.item = this.getItemCreated(url);
            this.itemService.addItem(this.item);
          })
        })
      ).subscribe();
      return;
    }
    alert('Please enter valid fields');
  }

  checkIfImageType(image): void {
    const imageFile: File = image.target.files[0];
    this.fileInvalid = true;
    this.imageFile = imageFile;
    if (image.target.files[0].type.includes('image/')) {
      this.fileInvalid = false;
    }
  }

  isFormValid(): boolean {
    const numbericPrice = parseFloat(this.cardForm.value.price);
    console.log(!isNaN(numbericPrice));
    return !isNaN(numbericPrice) && this.cardForm.valid && this.imageFile !== undefined && this.imageFile.type.includes('image/');
  }

  getItemCreated(url) {
    return {
      itemName: this.cardForm.value.name,
      itemPrice: this.cardForm.value.price,
      itemDescription: this.cardForm.value.description,
      itemImagePath: url
    };
  }
}