import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LineItem } from '../model/line-item.class';
import { Observable } from 'rxjs';

const URL: string = "http://localhost:8080/api/lineitems"

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<LineItem[]>{
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }

  get(id: number): Observable<LineItem> {
    console.log("Get a lineItem: " + URL + "/" + id);
    return this.http.get(URL + '/' + id) as Observable<LineItem>;
  }

  create(lineItem: LineItem): Observable<LineItem> {
    return this.http.post(URL + "/", lineItem) as Observable<LineItem>;
  }

  edit(lineItem: LineItem): Observable<LineItem> {
    return this.http.put(URL + "/", lineItem) as Observable<LineItem>;
  }

  delete(id: number): Observable<LineItem> {
    return this.http.delete(URL + '/' + id) as Observable<LineItem>;
  }
}
