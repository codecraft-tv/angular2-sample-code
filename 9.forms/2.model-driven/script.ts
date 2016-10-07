import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@Component({
  selector: 'model-form',
  template: `<!--suppress ALL -->
<form novalidate
      [formGroup]="myform">

  <fieldset formGroupName="name">
    <div class="form-group">
      <label>First Name</label>
      <input type="text"
             class="form-control"
             formControlName="firstName">
    </div>

    <div class="form-group">
      <label>Last Name</label>
      <input type="text"
             class="form-control"
             formControlName="lastName">
    </div>
  </fieldset>


  <div class="form-group">
    <label>Email</label>
    <input type="email"
           class="form-control"
           formControlName="email">
  </div>

  <div class="form-group">
    <label>Password</label>
    <input type="password"
           class="form-control"
           formControlName="password">
  </div>

  <div class="form-group">
    <label>Language</label>
    <select class="form-control"
            formControlName="language">
      <option value="">Please select a language</option>
      <option *ngFor="let lang of langs"
              [value]="lang">{{lang}}
      </option>
    </select>
  </div>

  <pre>{{myform.value | json}}</pre>
</form>  
`
})
class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  myform: FormGroup;


  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      language: new FormControl()
    });
  }
}


@Component({
  selector: 'app',
  template: `<model-form></model-form>`
})
class AppComponent {
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule],
  declarations: [
    AppComponent,
    ModelFormComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);