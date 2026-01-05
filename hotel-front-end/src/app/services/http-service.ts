import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RoomDescription } from '../models/room-description/room-description';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  baseURL: string = 'http://localhost:8080/';

  getAllRooms(): Observable<HttpResponse<RoomDescription[]>> {
    return this.http.get<RoomDescription[]>(this.baseURL + 'rooms', { observe: 'response' });
  }

  getAllRoomsDescriptions(): Observable<HttpResponse<RoomDescription[]>> {
    return this.http.get<RoomDescription[]>(this.baseURL + 'rooms', { observe: 'response' });
  }
}
