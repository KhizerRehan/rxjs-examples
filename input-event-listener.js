(function(){

  // Dynamically Injecting Script Inorder to Run in Browser and 
  // globally add rxjs in window object:
  function addScript( src) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.body.appendChild( s );
  }
  addScript('https://unpkg.com/rxjs@6.6.0/bundles/rxjs.umd.js');


//  Destructuring Events/Operators:
  const rxjs = window.rxjs;
  const { fromEvent, of} = rxjs;
  const {map, debounceTime, switchMap} = rxjs.operators;


  // RxJS functionality
  fromEvent(document.querySelector('input'), 'input').pipe(
    debounceTime(500),
    map(event => (event.target).value),
    switchMap(query => of(query)),
    map(value => `${value}:LengthIs:${value.length}`)
  ).subscribe(console.log);

})