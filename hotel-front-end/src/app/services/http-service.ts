import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../models/employee/employee';
import { RoomDescription } from '../models/room-description/room-description';
import { Room } from '../models/room/room';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  // ROOM requests
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

  //ROOM DESCRIPTION requests

  getAllRoomDescriptions(): Observable<HttpResponse<RoomDescription[]>> {
    return this.http.get<RoomDescription[]>(this.baseURL + 'room-descriptions', {
      observe: 'response',
    });
  }

  getAllAvailableRoomDescriptions(date: Date): Observable<HttpResponse<RoomDescription[]>> {
    const isoDate = date.toISOString().split('T')[0];
    const params = new HttpParams().set('date', isoDate);
    return this.http.get<RoomDescription[]>(this.baseURL + 'room-descriptions/availability', {
      observe: 'response',
      params: params,
    });
  }

  checkRoomDescriptionIsAvailable(id: number, date: Date): Observable<boolean> {
    const isoDate = date.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('date', isoDate);
    params = params.append('roomDescriptionId', id.toString());
    return this.http.get<boolean>(this.baseURL + 'room-descriptions/room-available', {
      params: params,
    });
  }

  // Gets the logged-in employee and returns them.
  getCredentials(): Observable<Employee> {
    return this.http.get<Employee>(this.baseURL + 'employees/credentials', {
      withCredentials: true,
    });
  }
}
