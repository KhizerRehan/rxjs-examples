(function(){

    // Dynamically Injecting Script Inorder to Run in Browser and 
    // globally add rxjs in window object:
    function addScript( src) {
      var s = document.createElement( 'script' );
      s.setAttribute( 'src', src );
      document.body.appendChild( s );
    }
    addScript('https://unpkg.com/rxjs@6.6.0/bundles/rxjs.umd.js');  

    /*
    // NOT COMPLETE JUST TO GET ROUGH IDEA:

    Html:
        <div id="box"></div>
        <style>
            #box {
                width: 200px;
                height: 200px;
                background-color: red;
                position:absolute;
            }
        </style>

    */

    (function(){
        // Destructuring Events/Operators:
        const rxjs = window.rxjs;
        const { fromEvent } = rxjs;
        const {map, flatMap, takeUntil} = rxjs.operators;
        
        // RxJS functionality 
        var dragTarget   = document.querySelector('#box')    
        mouseup =   fromEvent(document, 'mouseup');
        mousemove = fromEvent(document, 'mousemove');
        mousedown = fromEvent(dragTarget, 'mousedown');
    
        mousedrag = mousedown.pipe(
            flatMap((md)=>{          
                var startX = md.offsetX;
                var startY = md.offsetY;
                return mousemove
                    .pipe(
                        map(function(mm) {
                            mm.preventDefault();
                            return {
                                x: mm.clientX - startX,
                                y: mm.clientY - startY
                            };
                        }),
                        takeUntil(mouseup)
                    )
            }),
            map(flatValue=>{
                console.log('FlatValue:', flatValue);
                return flatValue;
            })
        )
                
            console.log(dragTarget);
            console.log(mouseup);
            console.log(mousemove);
            console.log(mousedown);
            console.log(mousedrag);
        
            subscription = mousedrag.subscribe(function(pos) {
                console.log('POSTIONS', pos)
            });
      }())


}());

// I MIGHT NOT BE CORRECT BUT THIS IS MY EXPLANATION:

/*
obs$ of obs$ -> $[[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$],[$]]

to 

[$,$,$,$,$,$,$,$,$,$,$,$,$,$] => using flatMap Operator:

*/
