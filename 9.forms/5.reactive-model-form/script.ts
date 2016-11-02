import {
    NgModule,
    Component,
    OnInit
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormControl
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';

@Component({
  selector: 'reactive-model-form',
  template: `<input type="search"
       class="form-control"
       placeholder="Please enter search term"
       [formControl]="searchField">
<hr/>
<ul>
  <li *ngFor="let search of searches">{{ search }}</li>
</ul>
`
})
class ReactiveModelFormComponent implements OnInit {

  searchField: FormControl;
  searches: string[] = [];

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(term => {
          this.searches.push(term);
        });
  }
}

@Component({
  selector: 'app',
  template: `<reactive-model-form></reactive-model-form>`
})
class AppComponent {
}


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ReactiveModelFormComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);