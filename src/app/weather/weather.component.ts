import { HttpClient } from '@angular/common/http';
import { Component, inject, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { WeatherResponse } from './weather.modal';

@Component({
  selector: 'app-weather',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  temperature?: number;
  city = "";
  country = "";
  icon = "";

  form = new FormGroup({
    city: new FormControl("", {
      validators: [Validators.minLength(2), Validators.required]
    })
  })

  getWeather(enteredCity: string) {

    if (this.form.invalid) {
      console.log("Invalid form.");
      return;
    }

    const apiKey = "fecd3090e3a68c124a4c86c90bdd06b7";
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${enteredCity}&limit=2&appid=${apiKey}`;

    const subscription = this.http.get<any[]>(geoUrl).pipe(
      switchMap(data => { // The switchMap operator allows us to switch from one observable to another. In simple terms, it takes the result of the first observable (the geolocation data) and uses it to create a new observable (the weather data). 
        if (!data[0]) {
          throw new Error('No data has been found. ');
        }

        const { lon, lat } = data[0]; // OpenWeatherMap uses 'lon' and 'lat'
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        return this.http.get<WeatherResponse>(weatherUrl);
      })
    ).subscribe({ // The subscribe method is used to execute the observable and handle the results.
      next: weatherData => { // The next method is called when the observable emits a value. In this case, it will log the weather data to the console.

        this.city = weatherData.name;
        this.temperature = weatherData.main.temp;
        this.country = weatherData.sys.country;
        this.icon = weatherData.weather[0].icon;

        console.log(weatherData);
        console.log("Temperature: ", this.temperature);
        console.log("City: ", this.city);
        console.log("Country: ", this.country);
        console.log("Country: ", this.icon);

      },
      error: err => {
        console.error(err);
      }
    });

    this.destroyRef.onDestroy(() => subscription);
  }
}
