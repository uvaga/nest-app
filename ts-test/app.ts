interface Item {
  id: number;
  name: string;
}
function getArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

const numberArray = getArray<Item>([
  { id: 1, name: 'Item1' },
  { id: 2, name: 'Item2' },
]);

class Customer {
  public firstName: string;
  public lastName: string;

  constructor(fName: string, lName: string) {
    this.firstName = fName;
    this.lastName = lName;
  }
}
const customer = new Customer('John', 'Doe');

const loggerCustomer = <T extends Customer>(c: T): void => {
  console.log(`Logging Customer: ${c.firstName} ${c.lastName}`);
};

//const stringArray = getArray<string>(['Hello', 'World']);

console.log(numberArray); // Output: [1, 2, 3, 4]
//console.log(stringArray); // Output: ["Hello", "World"]

loggerCustomer(customer);
