import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit {

  private _artworks: Array<Object>;

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.dataService.getApiToken()
      .then((data) => {
        this.dataService.getArtworks()
          .then((artworks) => {
            Promise.all(this.getArtistNameAndHref(artworks))
              .then((artworks) => { this._artworks = this.filterArtworks(artworks) });
          })
      });
  }

  getArtworksByArtist(artistId) {
    const href = `https://api.artsy.net:443/api/artworks?&artist_id=${artistId}`;
    this.dataService.getFromApi(href)
      .then((data) => {
        Promise.all(this.getArtistNameAndHref(data._embedded.artworks))
          .then((artworks) => { this._artworks = this.filterArtworks(artworks) });
      })
  }

  getSimilarArtworks(href) {
    this.dataService.getFromApi(href)
      .then((data) => {
        Promise.all(this.getArtistNameAndHref(data._embedded.artworks))
          .then((artworks) => { this._artworks = this.filterArtworks(artworks) });
      })
  }

  filterArtworks(artworks) {
    return artworks.filter((artwork) => {
      let hasSmallImage = false;
      if (artwork.image_versions) {
        for (let image of artwork.image_versions) {
          if (image === 'small') hasSmallImage = true;
        }
      }
      return hasSmallImage;
    });
  }

  getArtistNameAndHref(artworks) {
    return artworks.map((artwork) => {
      return new Promise((resolve, reject) => {
        this.dataService.getFromApi(artwork._links.artists.href)
          .then((data) => {
            let artist = data._embedded.artists[0];
            if (artist && artist.name) {
              artwork.artistName = artist.name;
              artwork.artistId = artist.id;
            }
            resolve(artwork);
        })
      })
    });
  }

  getFormattedImageUrl(article) {
    return article._links.image.href.replace(/{image_version}/i, 'small');
  }

}
