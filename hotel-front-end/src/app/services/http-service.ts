import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { User } from '../models/user/user';
import { RoomDescription } from '../models/room-description/room-description';
import { Room } from '../models/room/room';
import { Booking } from '../models/booking/booking';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'https://d2o1ljsv02tivy.cloudfront.net/api/';

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
      withCredentials: true,
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
      withCredentials: true,
    });
  }

  getAllAvailableRoomDescriptions(
    startDate: string,
    endDate: string,
  ): Observable<HttpResponse<RoomDescription[]>> {
    // const isoStartDate = startDate.toISOString().split('T')[0];
    // const isoEndDate = endDate.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<RoomDescription[]>(this.baseURL + 'room-descriptions/availability', {
      observe: 'response',
      params: params,
      withCredentials: true,
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
      withCredentials: true,
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
        },
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
    this.http.post(this.baseURL + 'logout', {}, { withCredentials: true }).subscribe(() => {
      window.location.href = '/homepage';
    });
  }

  // Gets all users from the server
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseURL + 'users', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body ?? []));
  }

  // Sends a put request to the server for a specific user.
  updateProfile(user: User): Observable<User | null> {
    return this.http
      .put<User>(this.baseURL + 'users/' + user.id, user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends a post request to the server to create a guest user.
  createGuest(user: User): Observable<User | null> {
    return this.http
      .post<User>(this.baseURL + 'users', user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends a post request to the server to create a manager user.
  createManager(user: User): Observable<User | null> {
    return this.http
      .post<User>(this.baseURL + 'users/manager', user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends a post request to the server to create a admin user.
  createAdmin(user: User): Observable<User | null> {
    return this.http
      .post<User>(this.baseURL + 'users/admin', user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the delete request of the specified user to the server.
  deactivateUser(id: number): Observable<User | null> {
    return this.http
      .delete<User>(this.baseURL + 'users/' + id, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the reactivation request of the specified user to the server.
  reactivateUser(id: number): Observable<User | null> {
    return this.http
      .put<User>(this.baseURL + 'users/reactivate/' + id, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response));
  }

  // Sends a request to the server to get all bookings connected to a guest where the checkin date is the current date.
  getAllBookings(): Observable<Booking[] | null> {
    return this.http
      .get<Booking[]>(this.baseURL + 'booking', {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  checkinGuest(email: string, employee: User): Observable<Booking | null> {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http
      .put<Booking>(this.baseURL + 'booking/checkin', employee, {
        observe: 'response',
        params: params,
      })
      .pipe(map((response) => response.body));
  }

  updateBooking(booking: Booking): Observable<Booking | null> {
    console.log(booking);
    return this.http
      .put<Booking>(this.baseURL + 'booking/' + booking.id, booking, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the delete request of the specified booking to the server.
  deactivateBooking(id: number): Observable<Booking | null> {
    console.log(id);
    return this.http
      .delete<Booking>(this.baseURL + 'booking/' + id, {
        observe: 'response',
        // withCredentials: true,
      })
      .pipe(map((response) => response.body));
  }

  // Sends the reactivation request of the specified booking to the server.
  reactivateBooking(id: number): Observable<Booking | null> {
    return this.http
      .put<Booking>(this.baseURL + 'booking/reactivate/' + id, {
        observe: 'response',
        // withCredentials: true,
      })
      .pipe(map((response) => response));
  }
}
