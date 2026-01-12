import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-employee-available-rooms-component',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './employee-available-rooms-component.html',
  styleUrl: './employee-available-rooms-component.css',
})
export class EmployeeAvailableRoomsComponent {
  constructor(private httpService: HttpService, private dataPass: DataPassService) {
    // On page reload, checks with the backend and determines the total number of in the hotel (in case more are added later)
    this.setTotalNumberOfRooms();
  }

  calendarOptions: CalendarOptions = {
    // Options used for creating the FullCalendar
    plugins: [dayGridPlugin],
    eventTimeFormat: {},
    initialView: 'dayGridMonth',
    events: (fetchInfo, successCallback, failureCallback) => {
      // This creates the events to add (how many rooms are available on each visible day).
      const startDate: Date = new Date(fetchInfo.start);
      const endDate: Date = new Date(fetchInfo.end);
      this.httpService.getAllAvailableRooms(startDate, endDate).subscribe({
        // Gets all available rooms and updates how many rooms are booked each day.
        next: (data) => {
          if (data.body === null) {
            return;
          }
          const totalRooms = this.dataPass.totalNumberOfRooms();
          const events: EventInput[] = [];
          events.push({
            title: `${data.body.length} / ${totalRooms} rooms available`,
            date: startDate,
            className: totalRooms - data.body.length === 0 ? 'fully-booked' : 'available',
            allDay: true,
          });
          successCallback(events);
        },
        error: (err) => failureCallback(err),
      });
    },
  };

  setTotalNumberOfRooms() {
    // This gets the total number of rooms from the server, then sends the update to totalNumberOfRooms signal in the datapass.
    this.httpService.getAllRooms().subscribe((data) => {
      if (data.body) {
        this.dataPass.totalNumberOfRooms.set(data.body.length);
      }
    });
  }
}
