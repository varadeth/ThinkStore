import { Component, OnInit } from '@angular/core';

interface CarouselModel {
  image: string,
  title: string,
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carousel: CarouselModel[];

  constructor() { }

  ngOnInit() {
    this.carousel = [ {
      image: '../../assets/background.jpg',
      title: 'Best Quality Furniture',
    },
    {
      image: '../../assets/cricketstore.jpg',
      title: 'Sports Equipments at discounted price',
    }, 
    {
      image: '../../assets/mobile.jpg',
      title: 'All brands of mobile phones',
    }];
  }

}
