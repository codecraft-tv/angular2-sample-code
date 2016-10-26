//
// function Student(config) {
//   return function(target) {
//     Object.defineProperty(target.prototype, 'course', {value: () => config.course})
//   }
// }
//
//
//
//
// @Student({
//   course: "Angular 2"
// })
// class Person {
//     firstName;
//     lastName;
//
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// let asim = new Person("Asim", "Hussain");
// console.log(asim.course());