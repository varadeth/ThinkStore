import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  fileInvalid = false;
  imageFile: File;
  @ViewChild('image', {static: false}) imageSelector;
  @ViewChild('cardForm', {static: false}) cardForm: NgForm;
  constructor() { }
  

  ngOnInit() {
  }

  onSubmit(): void {
    if(this.isFormValid()) {
      
    }
    alert('Please enter valid fields');
  }

  checkIfImageType(image): void {
    console.log(image);
    const imageFile: File = image.target.files[0];
    this.fileInvalid = true;
    this.imageFile = imageFile;
    if (imageFile.type.includes('image/')) {
      this.fileInvalid = false;
    }
  }

  isFormValid(): boolean {
    const numbericPrice = parseFloat(this.cardForm.value.price);
    console.log(!isNaN(numbericPrice));
    return !isNaN(numbericPrice) && this.cardForm.valid && this.imageFile !== undefined && this.imageFile.type.includes('image/');
  }
}