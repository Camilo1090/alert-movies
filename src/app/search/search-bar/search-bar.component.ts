import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TdSearchBoxComponent } from '@covalent/core';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

// api
import { API } from '../../shared/api/api';

// services
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchBar') searchBar: TdSearchBoxComponent;

  searchInputTerm = new Subject<string>();
  complete: Observable<Array<any>>;
  results = [];

  constructor(public searchService: SearchService,
              public router: Router) {
  }

  ngOnInit() {
    this.updateSearch();
  }

  updateSearch(): void {
    this.complete = this.searchInputTerm
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(query => query ?
        this.searchService.searchMulti(query, 1)
          .map(response =>
            response['results'].sort((a, b) => b['popularity'] - a['popularity'])) : Observable.of<Array<any>>([]))
      .do(response => {
        this.results = response;
      });
  }

  search(event: string): void {
    this.searchInputTerm.next(event);
  }

  clear() {
    this.searchBar.value = '';
    this.searchInputTerm.next('');
    if (this.searchBar.searchVisible) {
      this.searchBar.toggleVisibility();
    }
  }

  onEnter() {
    const query = this.searchBar.value;
    if (query && query.length > 0) {
      this.clear();
      this.router.navigate(['/search', 'movie', {'query': query, 'page': 1}]);
    }
  }

  onFocusOut() {
    this.searchInputTerm.next('');
  }
}
