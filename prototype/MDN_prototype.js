
function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last,
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
}

Person.prototype.greeting = function () {
    console.log(`Hi! I'm ${this.name.first}.`);
};

function Teacher(first, last, age, gender, interests, subject) {
    // current context
    Person.call(this, first, last, age, gender, interests);
    this.subject = subject;
}

// now, Teacher.prototype.constructor is Person
Teacher.prototype = Object.create(Person.prototype);

Teacher.prototype.constructor = Teacher;

const zz = new Person('zihan', 'zhang', 27, 'male', 'f');
const cc = new Teacher('c', 'r', 27, 'female', 'fbz', 's');

zz.greeting();
cc.greeting();
