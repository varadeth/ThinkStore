import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ItemModel } from 'src/app/model/ItemModel';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  item: ItemModel;

  constructor(private itemService: ItemServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let paramsId = this.activatedRoute.snapshot.params.id;
    this.itemService.getSingleItem(paramsId).subscribe(item => {
      this.item = item;
    });
  }

}
