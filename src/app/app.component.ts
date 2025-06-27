import { Component } from '@angular/core';
import { WeatherComponent } from "./weather/weather.component";
import { LightComponent } from "./light/light.component";
import { StoppwatchComponent } from "./stoppwatch/stoppwatch.component";

@Component({
  selector: 'app-root',
  imports: [WeatherComponent, LightComponent, StoppwatchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-explorer';
}
