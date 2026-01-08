import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../employee/employee';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  checkRoomDescriptionIsAvailable(id: number, date: Date): Observable<boolean> {
    const isoDate = date.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('date', isoDate);
    params = params.append('roomDescriptionId', id.toString());
    return this.http.get<boolean>(this.baseURL + 'room-descriptions/room-available', {
      params: params,
    });
  }

  getEmployee(email: string): Observable<HttpResponse<Employee>> {
    return this.http.get<Employee>(this.baseURL + 'employees/user', {
      observe: 'response',
      params: {
        email: email,
      },
    });
  }
}
