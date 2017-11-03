import {Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

// services
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [ SearchService ],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  private searchInputTerm = new Subject<string>();
  complete: Observable<Array<any>>;
  results = [];
  searchBoxTerm = '';
  debounce = 0;
  alwaysVisible = false;

  constructor(private searchService: SearchService,
              private router: Router) {

  }

  ngOnInit() {
    this.complete = this.searchInputTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(query => query ?
        this.searchService.searchMulti(query, 1).map(response => response['results']) :
        Observable.of<Array<any>>([])).do(response => {
        console.log(response);
        this.results = response;
        // response.length > 0 ? this.isEmpty = true: this.isEmpty=false;
      });
  }

  search($event: string): void {
    this.searchInputTerm.next($event);
  }

  clear() {
    this.searchInputTerm.next('');
  }

  onEnter($event: string) {
    this.clear();
    this.router.navigate(['/search', $event]);
  }

}
