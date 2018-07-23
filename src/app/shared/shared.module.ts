import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuditstatusPipe } from './pipes/auditstatus.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AuditstatusPipe
  ],
  declarations: [AuditstatusPipe]
})
export class SharedModule { }
