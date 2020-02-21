import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private observable$;
  private mySubject$;
  private myBehaviorSubject$;
  private myReplaySubject$;
  private numbers$: Observable<number>;
  private letters$: Observable<string>;

  private numbersSubscription: Subscription;
  private mixedSubscription: Subscription;

  private subscriptionFromClickEvent$: Subscription;
  private subscriptionFromInputEvent$: Subscription;

  private searchSubjectBasicTest$: Subject<string>;
  private searchSubject$: Subject<string>;

  results$: Observable<any>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // this.createObservable();
    // this.createSubject();
    // this.creatBehaviorSubject();
    // this.createReplaySubject();

    // this.useBasicRxOperators();
    // this.useMergeMapOperator();
    // this.useSwitchMapOperator();

    this.createObservableFromClickEvent();
    this.createObservableFromInputEvent();

    this.wrapAnAPI();
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.mySubject$.unsubscribe();
    this.myBehaviorSubject$.unsubscribe();
    this.myReplaySubject$.unsubscribe();

    this.numbersSubscription.unsubscribe();
    this.mixedSubscription.unsubscribe();

    this.subscriptionFromClickEvent$.unsubscribe();
    this.subscriptionFromInputEvent$.unsubscribe();
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

  private useBasicRxOperators() {
    this.numbers$ = Observable.interval(1000);

    this.numbersSubscription = this.numbers$
      .take(5)
      .map(x => x * 10)
      .filter(x => x % 2 === 0)
      .subscribe(x => console.log(x));
  }

  private useMergeMapOperator() {
    this.numbers$ = Observable.interval(1000);
    this.letters$ = Observable.of('a', 'b', 'c', 'd', 'e');

    this.mixedSubscription = this.letters$
      .mergeMap(x =>
        this.numbers$
          .take(5)
          .map(i => i + x))
      .subscribe(x => console.log(x));
  }

  private useSwitchMapOperator() {
    this.numbers$ = Observable.interval(1000);
    this.letters$ = Observable.of('a', 'b', 'c', 'd', 'e');

    this.mixedSubscription = this.letters$
      .switchMap(x =>
        this.numbers$
          .take(5)
          .map(i => i + x))
      .subscribe(x => console.log(x));
  }

  private createObservableFromClickEvent() {
    this.subscriptionFromClickEvent$ = Observable.fromEvent(document.querySelector('#button'), 'click')
      .subscribe(x => console.log(x));
  }

  private createObservableFromInputEvent() {
    this.searchSubjectBasicTest$ = new Subject<string>();

    this.subscriptionFromInputEvent$ = this.searchSubjectBasicTest$
      .debounceTime(200)
      .subscribe(x => console.log('debounced', x));
  }

  inputChangedBasicTest($event) {
    console.log('input changed', $event);
    this.searchSubjectBasicTest$.next($event);
  }

  private wrapAnAPI() {
    this.searchSubject$ = new Subject<string>();

    this.results$ = this.searchSubject$
      .debounceTime(800)
      .distinctUntilChanged()
      .do(x => console.log('log', x))
      .switchMap(searchString => this.queryAPI(searchString));
  }

  private queryAPI(searchString: string): Observable<string> {
    console.log('queryAPI', searchString);

    return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
      .map(result => result['data']['children']);
  }

  inputChanged($event) {
    console.log('input changed', $event);
    this.searchSubject$.next($event);
  }
}
