import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room/room';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  baseURL: string = 'http://localhost:8080/';

  getAllRooms(): Observable<HttpResponse<Room[]>> {
    return this.http.get<Room[]>(this.baseURL + 'rooms', { observe: 'response' });
  }

  // getAllRoomDescriptions(): Observable<HttpResponse<Room[]>> {}
}
