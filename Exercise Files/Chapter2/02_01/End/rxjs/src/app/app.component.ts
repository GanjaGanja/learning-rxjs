import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

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
  myReplaySubject$;

  numbersForTakeOperator$;
  numbersForMapOperator$;

  ngOnInit() {
    // this.createObservable();
    // this.createSubject();
    // this.creatBehaviorSubject();
    // this.createReplaySubject();
    // this.useTakeOperator();
    this.useMapOperator();
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

  private createReplaySubject() {
    this.myReplaySubject$ = new ReplaySubject();

    this.myReplaySubject$.subscribe(x => console.log(`first subscribe`, x));
    this.myReplaySubject$.next('value 1');
    this.myReplaySubject$.next('value 2');

    this.myReplaySubject$.subscribe(x => console.log(`second subscribe`, x));
    this.myReplaySubject$.next('value 3');
  }

  private useTakeOperator() {
    this.numbersForTakeOperator$ = Observable.interval(1000).take(5);
    this.numbersForTakeOperator$.subscribe(x => console.log(x));
  }

  private useMapOperator() {
    this.numbersForMapOperator$ = Observable.interval(1000);
    this.numbersForMapOperator$
      .take(5)
      .map(x => x * 10)
      .subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.mySubject$.unsubscribe();
    this.myBehaviorSubject$.unsubscribe();
    this.myReplaySubject$.unsubscribe();
    this.numbersForTakeOperator$.unsubscribe();
    this.numbersForMapOperator$.unsubscribe();
  }
}
