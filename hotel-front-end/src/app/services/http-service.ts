import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { RoomDescription } from '../models/room-description/room-description';
import { Room } from '../models/room/room';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<HttpResponse<Room[]>> {
    return this.http.get<Room[]>(this.baseURL + 'rooms', { observe: 'response' });
  }

  getAllAvailableRooms(date: Date): Observable<HttpResponse<Room[]>> {
    const isoDate = date.toISOString().split('T')[0];
    const params = new HttpParams().set('date', isoDate);
    return this.http.get<Room[]>(this.baseURL + 'rooms/availability', {
      observe: 'response',
      params: params,
    });
  }

  getAllRoomDescriptions(): Observable<HttpResponse<RoomDescription[]>> {
    return this.http.get<RoomDescription[]>(this.baseURL + 'room-descriptions', {
      observe: 'response',
    });
  }
}
