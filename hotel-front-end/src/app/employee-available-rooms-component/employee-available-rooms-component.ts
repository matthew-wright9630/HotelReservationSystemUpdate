import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';
import { forkJoin } from 'rxjs';
import listWeek from '@fullcalendar/list';

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
    plugins: [dayGridPlugin, listWeek],
    eventTimeFormat: {},
    height: '80vh',
    initialView: window.innerWidth < 900 ? 'listWeek' : 'dayGridMonth',
    views: {
      dayGridMonth: {
        buttonText: 'Month',
      },
      listWeek: {
        buttonText: 'List',
      },
    },
    windowResize: (arg) => {
      console.log(arg, window.innerWidth);
      if (window.innerWidth < 900) {
        arg.view.calendar.changeView('listWeek');
      } else if (window.innerWidth >= 900) {
        arg.view.calendar.changeView('dayGridMonth');
      }
    },
    events: (fetchInfo, successCallback, failureCallback) => {
      const startDate = new Date(fetchInfo.start);
      const endDate = new Date(fetchInfo.end);

      const dates: Date[] = [];
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }

      const observables = dates.map((date) => this.httpService.getAllAvailableRooms(date, date));

      forkJoin(observables).subscribe({
        next: (responses) => {
          const events: EventInput[] = [];
          responses.forEach((data, i) => {
            if (!data.body) return;

            const totalRooms = this.dataPass.totalNumberOfRooms();
            const date = dates[i];

            events.push({
              title: `${data.body.length} / ${totalRooms} rooms available`,
              date: date,
              className: totalRooms - data.body.length === 0 ? 'fully-booked' : 'available',
              allDay: true,
            });
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
