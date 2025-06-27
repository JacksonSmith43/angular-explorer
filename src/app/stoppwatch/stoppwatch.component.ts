import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-stoppwatch',
  imports: [],
  templateUrl: './stoppwatch.component.html',
  styleUrl: './stoppwatch.component.css'
})

export class StoppwatchComponent {
  time = 0;
  isStopped = false;
  private interval: any;

  onStart() {
    this.interval = setInterval(() => {
      this.time++;
    }, 1000)

  }

  onStopp() {
    this.isStopped = true;
    clearInterval(this.interval);
  }

}
