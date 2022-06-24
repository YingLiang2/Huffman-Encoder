// CLASS: IntHash
//
// Author: Ying Liang
//
// REMARKS: This is our IntHash class, a subclass of Hashable.
//          It will be used for our dictionary for any incoming int hashes,
//          If we do get an int hash, we then can pair it with a value and then stored into our dictionary.
//
//-----------------------------------------
"use strict";
let Hashable = require('./Hashable.js');

class IntHash extends Hashable {

    //Need to call the constructor of the parent class, inthash is a subchild of hashable.
    constructor(intKey) {
        super(intKey);


    }


    //---------------------------------------------------------------------------------------------
    // hashVal()
    //
    // PURPOSE:    This method is how we convert the incoming int key, into a hash value.
    // PARAMETERS:
    //              Takes a int key.
    // Returns: Returns a hash value which will be our int(key) value in this case.
    //-----------------------------------------------------------------------------------------------
    hashVal() {
        return this.getValue;
    }

    //---------------------------------------------------------------------------------------------
    // equals()
    //
    // PURPOSE:    This method compares one int hash to another int hash. Also compares the
    //             values together.
    // PARAMETERS:
    //              Takes in another hash to compare to.
    // Returns: Returns a boolean to see if the hashes are equal or not.
    //-----------------------------------------------------------------------------------------------
    equals(compareHash) {

        //If they contain the same integer value

        let equality = false;

        if (compareHash instanceof IntHash) {
            if (this.getValue === compareHash.getValue) {
                equality = true;
            }

        } else {
            throw new Error("The compared hash is not type IntHash");
        }


        return equality;

    }


}

module.exports = IntHash;