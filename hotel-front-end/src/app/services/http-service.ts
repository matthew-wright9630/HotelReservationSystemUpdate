import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { User } from '../models/user/user';
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

  // Sends the post request to create a new room description to the server.
  createRoom(room: Room): Observable<Room | null> {
    console.log(room);
    return this.http
      .post<Room>(this.baseURL + 'rooms', room, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the put request to update a room description to the server.
  updateRoom(room: Room): Observable<Room | null> {
    console.log(room);
    return this.http
      .put<Room>(this.baseURL + 'rooms/' + room.id, room, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the delete request of the room description to the server.
  deleteRoom(id: number): Observable<Room | null> {
    return this.http
      .delete<Room>(this.baseURL + 'rooms/' + id, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
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

  // Sends the post request to create a new room description to the server.
  createRoomDescription(roomDescription: RoomDescription): Observable<RoomDescription | null> {
    return this.http
      .post<RoomDescription>(this.baseURL + 'room-descriptions', roomDescription, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the put request to update a room description to the server.
  updateRoomDescription(roomDescription: RoomDescription): Observable<RoomDescription | null> {
    return this.http
      .put<RoomDescription>(
        this.baseURL + 'room-descriptions/' + roomDescription.id,
        roomDescription,
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(map((response) => response.body));
  }

  // Sends the delete request of the room description to the server.
  deleteRoomDescription(id: number): Observable<RoomDescription | null> {
    return this.http
      .delete<RoomDescription>(this.baseURL + 'room-descriptions/' + id, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Gets the logged-in employee and returns them.
  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.baseURL + 'users/user', {
      withCredentials: true,
    });
  }

  // Logs out the user.
  logout(): void {
    this.http.get(this.baseURL + '/logout', { withCredentials: true }).subscribe(() => {
      window.location.href = '/homepage';
    });
  }

  updateProfile(user: User): Observable<User | null> {
    return this.http
      .put<User>(this.baseURL + 'users/' + user.id, user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }
}
