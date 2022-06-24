// CLASS: StringHash
//
// Author: Ying Liang, 7893120
//
// REMARKS: This is our String Hash class which is a subclass of Hashable.
//
//-----------------------------------------
"use strict"

let Hashable = require('./Hashable.js');

class StringHash extends Hashable{

    //private variable to hold our stringkey length.
    #keyLength

    //Constructor, whenever a new string hash object is created, we need to call the constructor of our parent.
    constructor(stringKey) {
        super(stringKey);

        this.#keyLength = stringKey.length;

    }


    //---------------------------------------------------------------------------------------------
    // hashVal()
    //
    // PURPOSE:    This method is how we convert the incoming string key, into a hash value.
    // PARAMETERS:
    //              Takes a string key.
    // Returns: Returns a hash value based on a mathematical function using our string key.
    //-----------------------------------------------------------------------------------------------
    hashVal() {

        let value = null;

        let prime = 19; //get a random prime number for now

        //horner's method I believe

        for (let i = 0; i < this.#keyLength; i++) {

            value += this.getValue.charCodeAt(i) * prime ** (this.#keyLength  - (i+1))

        }


        return value;

    }

    //---------------------------------------------------------------------------------------------
    // equals()
    //
    // PURPOSE:    This method compares one string hash to another string hash. Also compares the
    //             values together.
    // PARAMETERS:
    //              Takes in another hash to compare to.
    // Returns: Returns a boolean to see if the hashes are equal or not.
    //-----------------------------------------------------------------------------------------------
    equals(compareHash) {

        let equality = false;

        if (compareHash instanceof StringHash) {
           if (this.getValue === compareHash.getValue) {
               equality = true;
           }

        } else {
            throw new Error("The compared hash is not type StringHash")
        }

        return equality;
    }


}

module.exports = StringHash;