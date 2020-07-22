(function(){

    // Dynamically Injecting Script Inorder to Run in Browser and 
    // globally add rxjs in window object:
    function addScript( src) {
      var s = document.createElement( 'script' );
      s.setAttribute( 'src', src );
      document.body.appendChild( s );
    }
    addScript('https://unpkg.com/rxjs@6.6.0/bundles/rxjs.umd.js');  
  }())


(function(){
  // Destructuring Events/Operators:
  const rxjs = window.rxjs;
  const { fromEvent } = rxjs;
  const {map, mergeAll, debounceTime} = rxjs.operators;


  // RxJS functionality
  const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
  const element  = document.querySelector('input')
  fromEvent(element, 'keyup')
  .pipe(
      debounceTime(2000),
      map(e => console.log(e.target.value)),
      map(value => myPromise(value)),
      mergeAll()// flattens obs of obs into first or single of observable like flattening of observable
      )
      
  .subscribe((data)=>{
      console.log()
  });


// MY EXPLANATION:
//   obs$1 = '....1....2.........3....|';
//   obs$1 = '.......2......3........4.......5...|';
//   mergeAll acts like spread data from all streams
//   mergeAll$ = '....1..2...2....3....3......4....5....|'

});




(function(){
    // Destructuring Events/Operators:
    const rxjs = window.rxjs;
    const { fromEvent } = rxjs;
    const {map, switchAll, debounceTime, switchMap} = rxjs.operators;
  
    // RxJS functionality
    const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Result: ${val}`), 2000));
    const element  = document.querySelector('input')
    fromEvent(element, 'keyup')
    .pipe(
        debounceTime(2000),
        map(e => console.log(e.target.value)),
        map(value => myPromise(value)),
        switchAll()
        )
    .subscribe((data)=>{
        console.log()
    });
  
  // MY EXPLANATION:
  //   obs$1 = '....1....2.........3....|';
  //   obs$1 = '.......2......3........4.......5...|';
  //   switchAll switches to last matching query results of streams and discards all previous streams.
  //   switchAll$ = '......2......3........4.......5...'
  

  fromEvent(element, 'keyup')
  .pipe(
      debounceTime(2000),
      map(e => console.log(e.target.value)),
      map(value => myPromise(value)),
      switchMap()
      )
  .subscribe((data)=>{
      console.log()
  });

  // Note: switchMap and switchLatest are same
}())


