import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  observable$;

  ngOnInit() {
    this.observable$ = Observable.create((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    this.observable$.subscribe(
      value => console.log(value),
      error => {},
      () => console.log('this is the end')
    );
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
  }
}
