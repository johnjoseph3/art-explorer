import { Injectable, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const clientId = '56bde6989fb5615bb776';
const clientSecret = '322f806dfecd4a7615548e87240f5bdd';

@Injectable()
export class DataService {

  constructor(
    private http: Http,
  ) {}

  getApiToken(): Promise<any> {
    return this.http.post(`https://api.artsy.net/api/tokens/xapp_token?client_id=${clientId}&client_secret=${clientSecret}`, {})
      .map( (response: Response) => response.json())
      .toPromise()
      .then(data => {
        localStorage.setItem('apiToken', data.token);
        return data;
      })
  }

  getArtworks(size = 40): Promise<any> {
    let headers = new Headers();
    headers.append('X-XAPP-Token', localStorage.getItem('apiToken'));
    let options = new RequestOptions({ headers: headers });
    const offset = Math.floor(Math.random() * (300 - 0 + 1) + 0);
    let apiCallSize = size ? 40 : size;

    return this.http.get(`https://api.artsy.net:443/api/artworks?offset=${offset}&size=${size}`, options)
      .map( (response: Response) => response.json())
      .toPromise()
      .then(data => {
        return data._embedded.artworks
      })
  }

  getFromApi(href, size = 40): Promise<any> {
    let headers = new Headers();
    headers.append('X-XAPP-Token', localStorage.getItem('apiToken'));
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${href}&size=${size}`, options)
      .map( (response: Response) => response.json())
      .toPromise()
      .then(data => {
        return data;
      })
  }

}
