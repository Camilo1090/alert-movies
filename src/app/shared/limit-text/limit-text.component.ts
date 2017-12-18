import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-limit-text',
  templateUrl: './limit-text.component.html',
  styleUrls: ['./limit-text.component.css']
})
export class LimitTextComponent implements OnInit {

  @Input() text: string;
  @Input() limit = 140;

  toggleNeeded = false;
  originalText: string;
  isToggled = false;
  threshold = 60;

  constructor() { }

  ngOnInit() {
    if (this.text && this.text.length > 0) {
      this.limitText();
    }
  }

  limitText() {
    this.originalText = this.text;
    if (this.text.length - this.limit > this.threshold) {
      this.toggleNeeded = true;
      this.text = this.text.substring(0, this.limit) + '...';
    }
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }
}
