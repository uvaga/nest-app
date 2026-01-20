function getArray(items) {
    return new Array().concat(items);
}
var numberArray = getArray([
    { id: 1, name: 'Item1' },
    { id: 2, name: 'Item2' },
]);
var Customer = /** @class */ (function () {
    function Customer(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
    }
    return Customer;
}());
var customer = new Customer('John', 'Doe');
var loggerCustomer = function (c) {
    console.log("Logging Customer: ".concat(c.firstName, " ").concat(c.lastName));
};
//const stringArray = getArray<string>(['Hello', 'World']);
console.log(numberArray); // Output: [1, 2, 3, 4]
//console.log(stringArray); // Output: ["Hello", "World"]
loggerCustomer(customer);
