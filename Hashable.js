// CLASS: Hashable.
//
// Author: Ying Liang
//
// REMARKS: This is our abstract class, Hashable that will serve as a guideline for the actual hashes that we will need.
//          Methods that will be enforced on subclasses of hashes.
//
//-----------------------------------------
class Hashable {

    #keyValue
    // Whenever we make a new subchild hash object, we need its keyValue whether its a string or a int
    //then depending on the type, we will convert it into a hash

    //Constructor
    constructor(key) {

        //Cannot make an object of an abstract class, so we will throw an error if there is an error.
        if (this.constructor === Hashable) {

            throw new Error("Please don't create an object of Hashable, it is an abstract class.");

        } else {

            this.#keyValue = key;

        }

    }

    //Subclasses need an hashVal method
    hashVal() {

        throw new Error("You have not implemented the hashVal() function in one of your subchilds.");

    }

    //Subclasses need a equals class.
    equals(compareHash) {
        throw new Error("You have not implemented the equals() function in one of your subchilds.");
    }

    //getter
    get getValue() {
        return this.#keyValue;
    }


}

module.exports = Hashable