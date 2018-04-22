import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the IonRatingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-rating',
  templateUrl: 'ion-rating.html'
})
export class IonRating {

  @Input() numStars: number = 5;
  @Input() value: number = 4;
  @Input() lectura: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: string[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.calc();
  }

  calc() {
    this.stars = [];
    let tmp = this.value;
    for(let i = 0; i < this.numStars; i++,tmp--) {
      if(tmp >= 1) {
        this.stars.push("star");
      } else if (tmp > 0 && tmp < 1) {
        this.stars.push("star-half");
      } else {
        this.stars.push("star-outline");
      }
    }
  }

  starClicked(index) {
    if(!this.lectura) {
      console.log(index);
      this.value = index + 1;
      this.ionClick.emit(index + 1);
      this.calc();
    }
  }

}
