// CLASS: LinkedList.
//
// Author: Ying Liang
//
// REMARKS: This is our Node class for our linked list.
//
//-----------------------------------------
"use strict"


class Node {

    //will need a key, data and next node
    //private fields,
    #key
    #data
    #next

    //constructor for a new node.
    constructor(hashCode,value,next) {

        //If we have 3 or more parameters, then we know the hashkey, data, next node
        if (arguments.length >= 3) {

            this.#key = hashCode;
            this.#data = value;
            this.#next = next;

        } else if (arguments.length === 2) {

            this.#key = hashCode;
            this.#data = value;
            this.#next = null;


        } else {

            this.#key = null;
            this.#data = null;
            this.#next = null;
        }

    }

    //getters/setters

    get hashKey() {
        return this.#key;
    }

    get data() {
        return this.#data;
    }

    set data(newData) {
        this.#data = newData;
    }

    get next() {
        return this.#next;
    }

    set setNext(nextNode) {
        this.#next = nextNode;
    }
}




module.exports = Node;