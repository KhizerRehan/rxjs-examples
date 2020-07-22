
var observable = Rx.Observable.create(observer => {
    setInterval(() => {
      observer.next('This is the output of my async operation');
    }, 2000);  
  });
  
  var sub = observable.subscribe(
    function onNext(data) {
      console.log('Data <=> :', data);
    }
  );
  
  
  setTimeout(() => {
      sub.unsubscribe();
    }, 10000);