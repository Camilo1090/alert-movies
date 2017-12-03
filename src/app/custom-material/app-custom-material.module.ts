import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules for UI elements
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// ngx bootstrap components
import { CarouselModule } from 'ngx-bootstrap';
// import { CarouselModule } from 'angular4-carousel';

// Material Components
import { MatAutocompleteModule, MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

// Covalent Components
import { CovalentLayoutModule } from '@covalent/core';
import { CovalentMenuModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentMediaModule } from '@covalent/core';
import { CovalentNotificationsModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentLoadingModule } from '@covalent/core';
import { CovalentChipsModule } from '@covalent/core';

@NgModule({
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentSearchModule,
    CovalentHttpModule,
    CovalentMediaModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentNotificationsModule,
    CovalentChipsModule
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentSearchModule,
    CovalentHttpModule,
    CovalentMediaModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentNotificationsModule,
    CovalentChipsModule
  ],
})
export class AppCustomMaterialModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
