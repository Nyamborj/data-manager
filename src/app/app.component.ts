import { Component } from '@angular/core';
import { DataManagerService, DataNames } from 'my-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-manager';

  constructor(private dataService: DataManagerService) {
    dataService.upsertData(DataNames.Person, 'Tumen Tumurchudur, 38');
  }
}
