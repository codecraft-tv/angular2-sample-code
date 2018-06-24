const { interval, pipe } = rxjs;
const { take, map } = rxjs.operators;

interval(1000)
  .pipe(
    take(3),
    map(v => Date.now())
  )
  .subscribe(value => console.log("Subscriber: " + value));

/*
  const middleware = pipe(
    take(3),
    map(v => Date.now())
  );
  
  interval(1000)
    .pipe(middleware)
    .subscribe(value => console.log("Subscriber: " + value));
    */
