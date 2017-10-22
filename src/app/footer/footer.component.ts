import {Component} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'tmdb',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/tmdb.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'alert',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/alert.png'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'angular',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/angular.png'));
  }
}
