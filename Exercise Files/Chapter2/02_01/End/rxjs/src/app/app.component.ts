import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  observable$;
  mySubject$;
  myBehaviorSubject$;

  ngOnInit() {
    this.createObservable();
    this.createSubject();
    this.creatBehaviorSubject();
  }

  private createObservable() {
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

  private createSubject() {
    this.mySubject$ = new Subject();

    this.mySubject$.subscribe(x => console.log(`first subscribe`, x));
    this.mySubject$.next('A');
    this.mySubject$.next('B');

    this.mySubject$.subscribe(x => console.log(`second subscribe`, x));
    this.mySubject$.next('C');
  }

  private creatBehaviorSubject() {
    this.myBehaviorSubject$ = new BehaviorSubject('XYZ');

    this.myBehaviorSubject$.subscribe(x => console.log(`first subscribe`, x));
    this.myBehaviorSubject$.next('X');
    this.myBehaviorSubject$.next('Y');

    this.myBehaviorSubject$.subscribe(x => console.log(`second subscribe`, x));
    this.myBehaviorSubject$.next('Z');
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.mySubject$.unsubscribe();
    this.myBehaviorSubject$.unsubscribe();
  }
}
