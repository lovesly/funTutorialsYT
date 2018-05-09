
function Bear(type) {
    this.type = type;
}

Bear.prototype.growl = function() {
    console.log(`grrr: ${this.type}`);
};

function Grizzly(type) {
    Bear.call(this, type);
}

Grizzly.prototype = Object.create(Bear.prototype);
Grizzly.prototype.constructor = Grizzly;

const grizzly = new Grizzly('grizzly');
const polar = new Bear('polar');

console.log(grizzly.type, polar.type);
grizzly.growl();
console.log(Grizzly.prototype.constructor);
