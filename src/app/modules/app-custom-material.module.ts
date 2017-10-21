import { NgModule } from '@angular/core';

// Modules for UI elements
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Material Componets
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
// import {MatIconRegistry} from '@angular/material';
import {MatMenuModule} from '@angular/material';
import {MatTabsModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';

// Covalent Components
import {CovalentLayoutModule} from '@covalent/core';
import {CovalentMenuModule} from '@covalent/core';
import {CovalentSearchModule} from '@covalent/core';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentMediaModule} from '@covalent/core';
import {CovalentNotificationsModule} from '@covalent/core';
import {CovalentPagingModule} from '@covalent/core';
import {CovalentLoadingModule} from '@covalent/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    // MatIconRegistry,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentSearchModule,
    CovalentHttpModule,
    CovalentMediaModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentNotificationsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    // MatIconRegistry,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    MatToolbarModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentSearchModule,
    CovalentHttpModule,
    CovalentMediaModule,
    CovalentPagingModule,
    CovalentLoadingModule,
    CovalentNotificationsModule
  ],
})
export class AppCustomMaterialModule { }
