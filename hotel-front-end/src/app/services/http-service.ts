import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string = 'http://localhost:8080/';
}
