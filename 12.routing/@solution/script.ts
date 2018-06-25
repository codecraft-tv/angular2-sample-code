import { NgModule, Component, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HttpClient
} from "@angular/common/http";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

@Injectable()
class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  results: SearchItem[];

  constructor(private http: HttpClient) {
    this.results = [];
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http
        .jsonp(apiURL, "callback")
        .toPromise()
        .then(
          res => {
            // Success
            this.results = res.results.map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
  }
}

@Component({
  selector: "app-search",
  template: `<form class="form-inline">
  <div class="form-group">
    <input type="search"
           class="form-control"
           placeholder="Enter search string"
           #search>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="onSearch(search.value)">
    Search
  </button>
</form>

<hr />

<div class="text-center">
  <p class="lead"
     *ngIf="loading">Loading...</p>
</div>

<div class="list-group">
  <a [routerLink]="['/artist', track.artistId]"
     class="list-group-item list-group-item-action"
     *ngFor="let track of itunes.results">
    <img src="{{track.thumbnail}}">
    {{ track.name }} <span class="text-muted">by</span> {{ track.artist }}
  </a>
</div>
 `
})
class SearchComponent {
  private loading: boolean = false;

  constructor(
    private itunes: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["term"]) {
        this.doSearch(params["term"]);
      }
    });
  }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then(_ => (this.loading = false));
  }

  onSearch(term: string) {
    this.router.navigate(["search", { term: term }]);
  }
}

@Component({
  selector: "app-home",
  template: `
<div class="jumbotron">
  <h1 class="display-3">iTunes Search App</h1>
</div>
 `
})
class HomeComponent {}

@Component({
  selector: "app-header",
  template: `<nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand"
     [routerLink]="['home']">iTunes Search App
  </a>
  <ul class="nav navbar-nav">
    <li class="nav-item"
        [routerLinkActive]="['active']">
      <a class="nav-link"
         [routerLink]="['home']">Home
      </a>
    </li>
    <li class="nav-item"
        [routerLinkActive]="['active']">
      <a class="nav-link"
         [routerLink]="['search']">Search
      </a>
    </li>
  </ul>
</nav>
 `
})
class HeaderComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate([""]);
  }

  goSearch() {
    this.router.navigate(["search"]);
  }
}

@Component({
  selector: "app-artist-track-list",
  template: `
<ul class="list-group">
	<li class="list-group-item"
	    *ngFor="let track of tracks">
		<img src="{{track.artworkUrl30}}">
		<a target="_blank"
		   href="{{track.trackViewUrl}}">{{ track.trackName }}
		</a>
	</li>
</ul>
 `
})
class ArtistTrackListComponent {
  private tracks: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=song`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.tracks = res.results.slice(1);
        });
    });
  }
}

@Component({
  selector: "app-artist-album-list",
  template: `<ul class="list-group">
	<li class="list-group-item"
	    *ngFor="let album of albums">
		<img src="{{album.artworkUrl60}}">
		<a target="_blank"
		   href="{{album.collectionViewUrl}}">{{ album.collectionName }}
		</a>
	</li>
</ul>
 `
})
class ArtistAlbumListComponent {
  private albums: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=album`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.albums = res.results.slice(1);
        });
    });
  }
}

@Component({
  selector: "app-artist-video-list",
  template: `<ul class="list-group">
	<li class="list-group-item"
	    *ngFor="let video of videos">
		<img src="{{video.artworkUrl60}}">
		<a target="_blank"
		   href="{{video.previewUrl}}">{{ video.trackName }}
		</a>
	</li>
</ul>
 `
})
class ArtistMusicVideoListComponent {
  private videos: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=musicVideo`,
          "callback"
        )
        .toPromise()
        .then(res => {
          this.videos = res.results.slice(1);
        });
    });
  }
}

@Component({
  selector: "app-artist",
  template: `<div class="card">
  <div class="card-block">
    <h4>{{artist?.artistName}} <span class="tag tag-default">{{artist?.primaryGenreName}}</span></h4>
    <hr />
    <footer>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['./tracks']">Tracks
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['./albums']">Albums
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['./videos']">Videos
          </a>
        </li>        
      </ul>
    </footer>
  </div>
</div>

<div class="m-t-1">
  <router-outlet></router-outlet>
</div>
 `
})
class ArtistComponent {
  private artist: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${params["artistId"]}`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.artist = res.results[0];
          console.log(this.artist);
        });
    });
  }
}

@Component({
  selector: "app",
  template: `
	<app-header></app-header>
	<div class="m-t-1">
    <router-outlet></router-outlet>
  </div>
 `
})
class AppComponent {}

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "find", redirectTo: "search" },
  { path: "home", component: HomeComponent },
  { path: "search", component: SearchComponent },
  {
    path: "artist/:artistId",
    component: ArtistComponent,
    children: [
      { path: "", redirectTo: "tracks", pathMatch: "full" },
      { path: "tracks", component: ArtistTrackListComponent },
      { path: "albums", component: ArtistAlbumListComponent },
      { path: "videos", component: ArtistMusicVideoListComponent }
    ]
  },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    HeaderComponent,
    ArtistAlbumListComponent,
    ArtistTrackListComponent,
    ArtistMusicVideoListComponent,
    ArtistComponent
  ],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
