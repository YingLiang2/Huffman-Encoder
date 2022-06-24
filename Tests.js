// CLASS: Tests.
//
// Author: Ying Liang
//
// REMARKS: This is class is used for testing our Dictionary.
//
//-----------------------------------------
"use strict";
let assert = require("assert");
let Dictionary = require("./Dictionary.js");
let IntHash = require("./IntHash.js");
let StringHash = require("./StringHash.js");

main()

function main() {

    constructorTests();

    testIsEmpty();

    testPut();

    testGet();

    testContains()
}

//Testing the constructor of our dictionary
function constructorTests() {

    let dictionary = new Dictionary();

    assert(dictionary !== undefined && dictionary !== null);
    assert(dictionary instanceof Dictionary);



}

//Testing the isEmpty() method of our dictionary.
function testIsEmpty(){

    let dictionary = new Dictionary();


    //The dictionary should be initially empty.
    assert(dictionary.isEmpty() === true);

    //New int hash key
    let intKey = new IntHash(15);

    let stringKey = new StringHash("isEmpty");

    dictionary.put(intKey,"Testing is Empty");
    dictionary.put(stringKey,"Testing is Empty again!");

    //There are 2 key-value pairs in the dictionary, therefore the dictionary should not be empty anymore.
    assert(dictionary.isEmpty() === false);


}

//Testing the put() method of our dictionary
function testPut(){

    let dictionary = new Dictionary();

    let intKey = new IntHash(25);
    let stringKey = new StringHash("putMethod");

    let value1 = 250;
    let value2 = 550;

    //Created 2 key-value pairs
    //The int key pairs with value 1
    //The string key pairs with value 2.

    //"Put" the 2 pairs into the dictionary
    dictionary.put(intKey,value1);
    dictionary.put(stringKey,value2);

    //The dictionary should not be false anymore.
    assert(dictionary.isEmpty() === false);

    //Testing if the matching key-value pairs equal the actual values we passed in.
    assert(dictionary.get(intKey) === value1);
    assert(dictionary.get(stringKey) === value2);

    //The intKey should not be paired with the stringKey value
    assert(dictionary.get(intKey) !== value2);


    //Now we replace the intKey value with the stringKey value.
    dictionary.put(intKey,value2);

    //Now they should be equal. (The intKey should be paired with the stringKey value.
    assert(dictionary.get(intKey) === value2);

}


//Testing the get() method our dictionary.
function testGet(){

    let dictionary = new Dictionary();

    let intKey = new IntHash(293);
    let stringKey = new StringHash("getMethod");


    let value1 = 908;
    let value2 = 5000;

    //Created 2 key-value pairs
    //The int key pairs with value 1
    //The string key pairs with value 2.

    ///The dictionary should be empty at the start, as we did not put the pairs in
    assert(dictionary.isEmpty() === true);

    //On that note, we should not be able to get any values from the dictionary, since its empty
    //So we should return undefined.
    assert(dictionary.get(intKey) === undefined);


    //Now we insert pairs in the dictionary.
    dictionary.put(intKey, value1);
    dictionary.put(stringKey, value2);

    //We are "getting" the values from the dictionary based on the key pair.
    //And they should return the values as we paired them when creating them.
    assert(dictionary.get(intKey) === value1);
    assert(dictionary.get(stringKey) === value2);

    //Testing a wrong pair. Did not pair the stringKey with value1.
    assert(dictionary.get(stringKey) !== value1);

}

//Testing our contains() method of our dictionary.
function testContains(){

    let dictionary = new Dictionary();

    let intKey = new IntHash(12348);
    let stringKey = new StringHash("containsMethod");

    //Created 2 key-value pairs
    //The int key pairs with value 1
    //The string key pairs with value 2.

    let value1 = 919191;
    let value2 = 808080;

    //The dictionary should be empty at the start, as we did not put any pairs into the dictionary.
    assert(dictionary.isEmpty());
    //Therefore the dictionary should not contain any pairs, in this case a value.
    assert(dictionary.contains(stringKey) === false);

    //Now we insert pairs in the dictionary.
    dictionary.put(intKey,value1);
    dictionary.put(stringKey, value2);


    //Testing contains now
    assert(dictionary.contains(intKey));
    assert(dictionary.contains(stringKey));

    let testKey = new StringHash("A key that is not in the dictionary");

    //The dictionary should not be empty as we put elements in it above.
    assert(!dictionary.isEmpty());

    //But we did not put a pair with key testKey, therefore our dictionary should not contain it.
    assert(dictionary.contains(testKey) === false);


}