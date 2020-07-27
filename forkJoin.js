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


// Concurrent Fake-Apis using Fetch and forkJoin:
(function(){
    // Destructuring Events/Operators:
    const rxjs = window.rxjs;
    const { forkJoin, from,of } = rxjs;
    const { tap, catchError } = rxjs.operators;
    
    
    // RxJS functionality
    /*
    when all observables complete, provide the last
    emitted value from each as dictionary
    */

    
    // https://reqres.in/api/products
    // https://jsonplaceholder.typicode.com/posts
    // http://dummy.restapiexample.com/api/v1/employees

     forkJoin({
           products: from(fetch('https://reqres.in/api/products')),
           posts: from(fetch('https://jsonplaceholder.typicode.com/posts')),
           employees: from(fetch('http://dummy.restapiexample.com/api/v1/employees')),
       }).pipe(
           tap(response => console.log(response)),
           catchError(error => of(error))
       ).subscribe((response)=>{
           console.log('Subscribe Response')
       },(error)=>{
           console.log('Error')
       },()=> {
           console.log('Subscription Completed');
       })
  }());




// Making a variable number of requests
  (function(){
    // https://stackblitz.com/edit/typescript-3mbbjw?file=index.ts&devtoolsheight=100
    // Flattening using mergeMap and Using map to transform stream of Another stream
    // Destructuring Events/Operators:
    const rxjs = window.rxjs;
    const { forkJoin, of } = rxjs;
    const { mergeMap } = rxjs.operators;


    const promise = function supplyValue(value) {
      return new Promise((resolve, reject)=>{
          setTimeout(()=>{
            console.log(value);
              resolve(`Promise is Resolved with value: : ${value}`);
          },2000)
      })
  };
  
   const source$ = of([10,20,30,40,50]);


    source$
    .pipe(
        mergeMap(array => forkJoin(...array.map(promise)))
    )
    .subscribe(
        (response)=>{
            console.log(response);
        },
        (error) => {
            console.log(error)
        },
        () => {
            console.log('Completed');
        }
    )
  }());

