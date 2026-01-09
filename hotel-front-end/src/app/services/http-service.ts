import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../employee/employee';
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

  getAllAvailableRooms(startDate: Date, endDate: Date): Observable<HttpResponse<Room[]>> {
    const isoStartDate = startDate.toISOString().split('T')[0];
    const isoEndDate = endDate.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('startDate', isoStartDate);
    params = params.append('endDate', isoEndDate);
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

  getAllAvailableRoomDescriptions(
    startDate: Date,
    endDate: Date
  ): Observable<HttpResponse<RoomDescription[]>> {
    const isoStartDate = startDate.toISOString().split('T')[0];
    const isoEndDate = endDate.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('startDate', isoStartDate);
    params = params.append('endDate', isoEndDate);
    return this.http.get<RoomDescription[]>(this.baseURL + 'room-descriptions/availability', {
      observe: 'response',
      params: params,
    });
  }

  checkRoomDescriptionIsAvailable(id: number, startDate: Date, endDate: Date): Observable<boolean> {
    const isoStartDate = startDate.toISOString().split('T')[0];
    const isoEndDate = endDate.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('startDate', isoStartDate);
    params = params.append('endDate', isoEndDate);
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

  logout(): void {
    this.http.get('http://localhost:8080/logout', { withCredentials: true }).subscribe(() => {
      window.location.href = '/homepage';
    });
  }
}
