import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesToHyphensPipe } from './spaces-to-hyphens.pipe';


@NgModule({
  declarations: [SpacesToHyphensPipe],
  imports: [
    CommonModule
  ],
  exports: [SpacesToHyphensPipe],
})
export class PipesModule { }
