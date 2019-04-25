import { NgModule } from '@angular/core';
import { CompletionTimePipe } from './completion-time/completion-time';
@NgModule({
	declarations: [CompletionTimePipe],
	imports: [],
	exports: [CompletionTimePipe]
})
export class PipesModule {}
