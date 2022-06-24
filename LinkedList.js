// CLASS: LinkedList.
//
// Author: Ying Liang
//
// REMARKS: This is our linked list class that we will use to build our hashtable.
//
//-----------------------------------------
"use strict"
let Node = require('./Node.js');

class LinkedList {

    #head //our head node

    //When we make a new linked list, we will have an empty list, so our head is null
    constructor() {

        this.#head = null;

    }

    //---------------------------------------------------------------------------------------------
    // isEmpty()
    //
    // PURPOSE:    This method checks if the linked list is empty or not.
    //
    // PARAMETERS:
    //              No parameters.
    // Returns: Returns a boolean stating if the LL is empty or not.
    //-----------------------------------------------------------------------------------------------
    isEmpty() {
        return (this.#head === null);
    }

    //---------------------------------------------------------------------------------------------
    // searchKey()
    //
    // PURPOSE:    This method takes a key, and searches through our LL to find that key.
    //
    // PARAMETERS:
    //              Takes a key
    // Returns: Returns a boolean stating if they key is found or not.
    //-----------------------------------------------------------------------------------------------
    searchKey(k) {

        let found = false;
        let current = this.#head;

        while (current != null) {

            if (current.hashKey.equals(k)) {
                found = true;
            }
            current = current.next;
        }

        return found;
    }



    //---------------------------------------------------------------------------------------------
    // insertElement()
    //
    // PURPOSE:    This method takes a key-value pair and inserts the value into our LL based on the
    //             key value.
    //
    // PARAMETERS:
    //              Takes a key and value.
    // Returns: Returns nothing as this is a void method, but it will insert the key-value pair into
    //          our LL.
    //-----------------------------------------------------------------------------------------------
    insertElement(key,value) {

        //Takes a hashable key and a value and adds it to the dictionary.
        //if it does not exist. If the key-value pair already exists the current value is replaced with the new data being inserted.

        let current = this.#head;

        if (this.searchKey(key)) {
            //We found they key in the current list, therefore we replace its current value with new value

            while (current != null) {

                if (current.hashKey.equals(key)) {
                    current.data = value;
                }
                current = current.next;
            }


        } else {
            //we haven't found the key in our current list, so it will be a new entry in the list
            //put it at the end of our list.

            //this.#head = new Node(key,value,this.#head);

            if (current === null) {

                this.#head = new Node(key,value,null);

            } else {

                while (current.next != null) {
                    current = current.next;
                }
                current.setNext = new Node(key, value, null);
            }
        }



    }

    //---------------------------------------------------------------------------------------------
    // getValue()
    //
    // PURPOSE:    This method gets a value in our LL based on the key passed in.
    //
    // PARAMETERS:
    //              Takes a key
    // Returns: Returns the value associated with the key if it exists in our LL.
    //-----------------------------------------------------------------------------------------------
    getValue(key) {

        //This method should return the value associated with the key if it exists, if key doesn't exist, return undefined.
        let value = undefined;

        if (this.searchKey(key)) {

            let current = this.#head;

            while (current != null ) {

                if (current.hashKey.equals(key)) {
                    value = current.data;
                }
                current = current.next;

            }

        }

        return value;
    }

    //---------------------------------------------------------------------------------------------
    // print()
    //
    // PURPOSE:    This method is used for printing our LL, mainly used for testing
    //
    // PARAMETERS:
    //              Takes no parameters.
    // Returns: Returns nothing, prints LL
    //-----------------------------------------------------------------------------------------------
    print() {

        let current = this.#head;
        let output = " ";

        while (current != null) {

            output += " " + current.data;
            current = current.next;


        }

        console.log(output);
    }



}

module.exports = LinkedList;