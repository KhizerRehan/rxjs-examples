
import { of, from, Observable } from 'rxjs';
console.log('Observable.js');

describe('Basic Observable', () => {
  // of
  it('should create an Observable from its arguments', () => {
    const result = [];
    const observables$ = of(1, 2, 3, 4);
    observables$.subscribe((value) => {
      result.push(value);
    });
  });


  // from

  it('should create an Observable from its arguments', () => {
    const result = [];
    const observables$ = from([1, 2, 3, 4]);
    observables$.subscribe((value) => {
      result.push(value);
    });
  });


  it('should create an Observable from generator', () => {

    function* values() {
        yield 1;
        yield 2;
        yield 3;
        return null;
    }

    const result = [];
    const observables$ = from(values());
    observables$.subscribe((value) => {
      result.push(value);
    });
    expect(result).toEqual([1,2,3]);
  });


  it('should create a bespoke observable', () => {

    const observable$ = new Observable((subscriber) =>{
      subscriber.next('John');
      subscriber.next('John1');
      subscriber.next('John2');
      subscriber.next('John3');
      subscriber.complete();
    })

  });

});
