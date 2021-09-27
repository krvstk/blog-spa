import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesToHyphensPipe } from './spaces-to-hyphens.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';


@NgModule({
  declarations: [
    SpacesToHyphensPipe,
    SanitizeHtmlPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpacesToHyphensPipe,
    SanitizeHtmlPipe
  ],
})
export class PipesModule {
}
