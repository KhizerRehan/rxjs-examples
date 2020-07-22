(function(){

    // Dynamically Injecting Script Inorder to Run in Browser and 
    // globally add rxjs in window object:
    function addScript( src) {
      var s = document.createElement( 'script' );
      s.setAttribute( 'src', src );
      document.body.appendChild( s );
    }
    addScript('https://unpkg.com/rxjs@6.6.0/bundles/rxjs.umd.js');   }())


  (function(){
    // Destructuring Events/Operators:
    const rxjs = window.rxjs;
    const { fromEvent } = rxjs;
    const {map, debounceTime, distinctUntilChanged} = rxjs.operators;
    // RxJS functionality
    const element  = document.querySelector('input') 
    const keys$ = fromEvent(element, 'keypress')
    .pipe(
        debounceTime(1000),
        map((e) => e.target.value),
        distinctUntilChanged()
    );

    keys$.subscribe(console.log);

    // distinctUntilChanged
    /*
     Same search term is passed only once and evert time if search term
     is same it will not be propogated or stream to next operator
    /*

  }());