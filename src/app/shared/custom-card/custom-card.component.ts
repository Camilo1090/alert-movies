import { Component, Input, OnInit } from '@angular/core';
import { API } from '../api/api';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent implements OnInit {

  apiImg = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  _media: string;
  @Input()
  get media() {
    return this._media;
  }
  set media(value: string) {
    this._media = value;
  }

  _img: string;
  @Input()
  get img(): string {
    return this._img;
  }
  set img(value: string) {
    this._img = value;
  }

  _title: string;
  @Input()
  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  _rating: number;
  @Input()
  get rating() {
    return this._rating;
  }
  set rating(value: number) {
    this._rating = value;
  }

  _subText: string;
  @Input()
  get subText() {
    return this._subText;
  }
  set subText(value: string) {
    this._subText = value;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
