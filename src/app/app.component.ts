import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Corona Centers';
  vaccineDetails: any;
  isAvailable = false;
  isShow = true;
  buttonLabel = 'Show All';
  heading = 'Available Vaccine Details'
  noItem = false;
  availableSlot = 0;
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getData();
  }

  getData(district = 306) {
    this.availableSlot = 0;
    const dateData = moment().format("DD-MM-YYYY"); 
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${dateData}`;
    this.http.get(url).subscribe((data)=>{
      this.vaccineDetails = data;
      this.vaccineDetails.centers.map((items: any)=>{
        items.sessions.map((element: any) => element.available_capacity = element.available_capacity - element.available_capacity % 1);
        this.isAvailable = items.sessions.find((element: any) => element.available_capacity);
        this.isAvailable ? items.isAvailable = true : items.isAvailable = false;
        if(items.isAvailable) {
          this.noItem = true;
          ++this.availableSlot;
        }
      })
    })
  }
  showAll() {
    this.isShow = !this.isShow;
    this.isShow ? this.buttonLabel = 'Show All' : this.buttonLabel = 'Show Available';
    this.isShow ? this.heading = 'Available Vaccine Details' : this.heading = 'Vaccine Details';
  }

  getValue(value: any) {
    this.noItem = false;
    value ? this.getData(307) : this.getData();
  }




}
