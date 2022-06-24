// CLASS: Dictionary
//
// Author: Ying Liang
//
// REMARKS: This is our dictionary class,
//          It is an ADT, implemented by a hash-table.
//
//-----------------------------------------
"use strict"

let LinkedList = require('./LinkedList.js');
let Hashable = require("./Hashable");

class Dictionary {

    #hashArray //array that will be used for our dictionary
    #numOfElements //number of elements in our array

    constructor(size) {

        //when we create a new dictionary, we pass in the size of dictionary to make it large as we want
        //else make it a default size of 1000, if no arguments are passed in

        if (arguments.length >= 1) {
            this.#hashArray = Array(size);
        } else {
            this.#hashArray = Array(1000);
        }

        //since we are creating a hashtable with separate chaining, we can just allocate
        //each index of the array, to be a linked list as that will just deal with the collisions.
        //separate chaining

        for (let i = 0; i < this.#hashArray.length;i++) {
            this.#hashArray[i] = new LinkedList();
        }

        this.#numOfElements = 0;

    }

    //---------------------------------------------------------------------------------------------
    // put()
    //
    // PURPOSE:    This method takes a hashable key, and value. Then it stores it into our hashtable.
    //             If we find the same hashkey, in the index of our hashtable, then we overwrite the old value
    //             with the new value.
    // PARAMETERS:
    //              takes a key and a value.
    // Returns: Returns nothing as its a void method.
    //-----------------------------------------------------------------------------------------------
    put(k,v) {

        //Need to check if the key, is type hashable or not.
        if (this.#checkKey(k)) {

            //This is the pair's (key,value) index that will used to store the pair into the hashtable.
            let pairIndex = k.hashVal() % this.#hashArray.length;

            this.#hashArray[pairIndex].insertElement(k,v);


            this.#numOfElements += 1;
            //console.log(this.#numOfElements);

        } //else do nothing, since we already throw an error in checkKey





    }

    //---------------------------------------------------------------------------------------------
    // get()
    //
    // PURPOSE:    This method takes a hashable key, and returns the value associated with that key
    //             if the key exists in our hashtable.
    //
    // PARAMETERS:
    //              Takes a key
    // Returns: Returns the value associated with the key if it exists in our hashtable.
    //-----------------------------------------------------------------------------------------------
    get(k) {

        let returnValue = undefined;

        if (this.#checkKey(k)) {

            let keyIndex = k.hashVal() % this.#hashArray.length;

            if (this.contains(k)) {
                returnValue = this.#hashArray[keyIndex].getValue(k);
            }

        }

        return returnValue;

    }

    //---------------------------------------------------------------------------------------------
    // contains()
    //
    // PURPOSE:    This method takes a hashable key, and checks if the key is in our dictionary or not.
    //
    // PARAMETERS:
    //              Takes a key
    // Returns: Returns a boolean, if the key is contained/exists in our hashtable or not.
    //-----------------------------------------------------------------------------------------------
    contains(k) {

        let results = false;

        if (this.#checkKey(k)) {

            let keyIndex = k.hashVal() % this.#hashArray.length;

            if (this.#hashArray[keyIndex].searchKey(k)) {
                results = true;
            }

        }

        return results;
    }


    //---------------------------------------------------------------------------------------------
    // isEmpty()
    //
    // PURPOSE:    This method checks if the hashtable is empty or not.
    //
    // PARAMETERS:
    //              Takes no parameters.
    // Returns: Returns a boolean if the hashtable is empty or not.
    //-----------------------------------------------------------------------------------------------
    isEmpty(){

        if (this.#numOfElements === 0) {
            return true;
        } else {
            return false;
        }

    }



    //---------------------------------------------------------------------------------------------
    // get()
    //
    // PURPOSE:    This method takes a key, and returns a boolean stating if the the key is type hash or not.
    //
    // PARAMETERS:
    //              Takes a key
    // Returns: Returns a boolean if the key is type hashable or not.
    //-----------------------------------------------------------------------------------------------
    #checkKey(key) {

        if (key instanceof Hashable) {
            return true;
        } else {
            return false;

            throw new Error("The key you entered, is not a type of Hash, therefore we can't use it for our hashtable....");
        }


    }



}

module.exports = Dictionary;