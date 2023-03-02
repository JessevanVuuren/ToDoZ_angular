import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {
  public url = environment.apiURL
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    // .set("Authorization", "Bearer " + localStorage.getItem("auth_key"));
    .set("Authorization", "Bearer 8|eXbAGzRAXpeEOX4aNb6MWQkEfaz1tQ0OQ1Gv8UCD");
    
  public getData<T>(path: String): Observable<Array<T>> {
    return this.http
      .get<T[]>(this.url + path, { 'headers': this.headers })
  }

  public getSingleData<T>(path: String): Observable<T> {
    return this.http
      .get<T>(this.url + path, { 'headers': this.headers })
  }

  public sendData<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.url + path, data, {
      'headers': this.headers
    })
  }
}
