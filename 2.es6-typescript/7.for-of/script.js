'use strict';

let array = [1, 2, 3];

console.log('for-of');
for (let value in array) {
  console.log(typeof(value));
}

console.log('for-in');
for (var value of array) {
  console.log(value);
}