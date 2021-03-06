import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: ItemModel[];

  constructor(private itemService: ItemServiceService, private router: Router) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(
      items => this.items = items
    );
  }

  onView(index: number) {
    this.router.navigate(['/view-item/', this.items[index].id]);
  }

  onDelete(index: number) {
    this.itemService.deleteItem(this.items[index].id);
  }

}
