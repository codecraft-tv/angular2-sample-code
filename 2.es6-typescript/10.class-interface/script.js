var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person.prototype.name = function () {
        return this.firstName + " " + this.lastName;
    };
    Person.prototype.whoAreYou = function () {
        return "Hi i'm " + this.name();
    };
    return Person;
}());
var Student = (function (_super) {
    __extends(Student, _super);
    function Student(firstName, lastName, course) {
        _super.call(this, firstName, lastName);
        this.firstName = firstName;
        this.lastName = lastName;
        this.course = course;
    }
    Student.prototype.whoAreYou = function () {
        return _super.prototype.whoAreYou.call(this) + " and i'm studying " + this.course;
    };
    return Student;
}(Person));
var asim = new Student("Asim", "Hussain", "typescript");
console.log(asim.whoAreYou());
