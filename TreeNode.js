// CLASS: TreeNode
//
// Author: Ying Liang
//
// REMARKS: This is our Tree node class, which are used by Trees.
//
//-----------------------------------------
"use strict"

class TreeNode {

    #data //the single character
    #left   //points to the left subchild/node
    #right //points to the right subchild/node


    constructor(data,left,right) {

        //When we make a new node, we don't know if its a tree node or just an internal node
        //Therefore the left and right pointers will just point to null.

        if (arguments.length === 3) {

            this.#data = data;
            this.#left = left;
            this.#right = right;

        } else {
            throw new Error("Not enough or too many parameters given to create a new tree node");
        }



    }

    //getters and setters

    getData() {
        return this.#data;
    }

    getLeftNode() {
        return this.#left;
    }

    getRightNode() {
        return this.#right;
    }



}



module.exports = TreeNode;