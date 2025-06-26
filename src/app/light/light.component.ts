import { Component } from '@angular/core';

@Component({
  selector: 'app-light',
  imports: [],
  templateUrl: './light.component.html',
  styleUrl: './light.component.css'
})

export class LightComponent {
  isLightOn = true;

  toggleLight() {
    if (this.isLightOn) {
      this.isLightOn = false;

    } else {
      this.isLightOn = true;
    }
  }
}
