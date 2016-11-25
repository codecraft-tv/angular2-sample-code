import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    Renderer,
    HostListener,
    HostBinding,
    ElementRef,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';



@Directive({
  selector: "[ccGifLite]"
})
class GifLiteDirective {
  @Input('ccGifLite') config: Object = {
    'cover': 'reactive-v3.png',
    'gif': ''
  };

  @HostBinding('src') private imagePath: string;


  ngOnChanges() {
    if (this.config.cover) {
      this.imagePath = this.config.cover;
    }
  }

  @HostListener('mouseover') onMouseOver() {
    this.imagePath = this.config.gif;
  }

  @HostListener('mouseout') onMouseOut() {
    this.imagePath = this.config.cover;
  }
}

@Component({
  selector: 'app',
  template: `
<img [ccGifLite]="{
'gif':'reactive-v3.gif',
'cover':'reactive-v3.png'
}"/> 
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    GifLiteDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);

