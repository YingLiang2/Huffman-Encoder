// CLASS: HuffmanTree.
//
// Author: Ying Liang
//
// REMARKS: This is our Huffman tree class, where we will turn the characters in the file to trees
//
//-----------------------------------------
"use strict"

let TreeNode = require('./TreeNode.js');


class HuffmanTree{

    #root //this will be our root node
    #weight; //weight of the tree

    constructor() {

        //When we make a new Huffman Tree, we will have a root node, but it will be null because we haven't
        //added a new node yet.
        this.#root = null;
        this.#weight = 0;

    }

    //Getters
    getRoot() {
        return this.#root;
    }

    getWeight() {
        return this.#weight;
    }



    //---------------------------------------------------------------------------------------------
    // createTree
    //
    // PURPOSE:    This is our method to basically create a tree. In a way its the same as the constructor
    //             but we are initializing the tree in this method instead of the constructor.
    //             When we create a new tree, we should intialize the root node, by the 2 parameters.
    //
    //
    // PARAMETERS:
    //              Takes in a character, and a weight
    // Returns: Returns a new tree (root node) that has a character and a weight to it
    //-----------------------------------------------------------------------------------------------
    createTree(character,weight) {

        this.#root = new TreeNode(character,null,null);
        this.#weight = weight;

    }


    //This function will combine 2 trees together
    //We will create a new root node by combining the weights of current subtree root nodes.
    //The passed in parameters should be the root nodes of both subtrees

    //---------------------------------------------------------------------------------------------
    // combineTrees()
    //
    // PURPOSE:    This method will combine 2 trees together. We will create a new root node by combining
    //             the weights of the current left and right subtrees. The passed in parameters should be the
    //             root nodes of both subtrees.
    //
    //
    // PARAMETERS:
    //              Takes the in the leftsubtree and rightsubtree
    // Returns: Returns a new tree with a root node of combined weights from both right and left subtree.
    //-----------------------------------------------------------------------------------------------
    combineTrees(leftSubtree, rightSubtree){

        this.#root = new TreeNode(null,leftSubtree.getRoot(),rightSubtree.getRoot());
        this.#weight = leftSubtree.getWeight() + rightSubtree.getWeight();

    }



    //---------------------------------------------------------------------------------------------
    // compareTo()
    //
    // PURPOSE:    This method will compare 2 trees together, it will return -1, 0 or 1 based on the
    //             the results of the comparasion.
    //
    //
    // PARAMETERS:
    //              Takes another tree, so we can compare it with.
    // Returns: Returns a integer value, -1, 0 or 1 based on the comparasion result
    //-----------------------------------------------------------------------------------------------
    compareTo(otherTree){

        //Compares two trees weights
        //Returns 1, 0 or -1 depending whether the parameter tree comes before (1) or after (-1) the tree
        //whose method is being called.

        //For any 2 trees, the tree with the lowest weight should come first.
        //If both trees have the same weight, the tree that contains (in any leaf) the smallest character (in order)
        //should come first.

        let results = null;

        if (otherTree instanceof HuffmanTree) {

            if (this.#weight > otherTree.getWeight()) {

                results = 1;

            } else if (this.#weight < otherTree.getWeight()) {

                results = -1;

            } else {


                //Getting the smallest/minimum characters of both trees
                //Since the weights are both the same.
                //We will decide which tree comes first depending on the minimum character of both trees.
                let minChar = this.getSmallestCharacter();
                let minOtherChar = otherTree.getSmallestCharacter();

                if (minChar > minOtherChar) {
                    results = 1;
                } else if (minChar < minOtherChar){
                    results = -1;
                } else {
                    results = 0;
                }


            }
        }

        return results;

    }

    //---------------------------------------------------------------------------------------------
    // getSmallestCharacter()
    //
    // PURPOSE:    This method will call the recursive method to get the smallest character of the tree.
    //
    //
    // PARAMETERS:
    //              Takes no parameters
    // Returns: Returns the smallest character of a tree.
    //-----------------------------------------------------------------------------------------------
    getSmallestCharacter() {

        return this.getSmallestCharacterRecursive(this.#root);

    }

    //---------------------------------------------------------------------------------------------
    // getSmallestCharacterRecursive
    //
    // PURPOSE:    This method will do the recursion work to get the smallest character of the tree.
    //
    //
    // PARAMETERS:
    //              Takes in the current node its working on, since its recursion.
    //              The first node/parameter it will take is always the root node of the tree
    //              as we are going down from the root node to a leaf node.
    // Returns: Returns the smallest character from the tree.
    //-----------------------------------------------------------------------------------------------
    getSmallestCharacterRecursive(currentNode) {

        let results = null;

        if (currentNode) {

            results = currentNode.getData();

            let _leftLeaf = this.getSmallestCharacterRecursive(currentNode.getLeftNode());
            let _rightLeaf = this.getSmallestCharacterRecursive(currentNode.getRightNode());

            if ((results === null  && _leftLeaf != null) ||  _leftLeaf < results ) {
                results = _leftLeaf;
            }
            if ((results === null && _rightLeaf != null) || _rightLeaf < results){
                results = _rightLeaf;
            }


        }



        return results;

    }

    //---------------------------------------------------------------------------------------------
    // searchTree()
    //
    // PURPOSE:    This method will call the recursive method to search the tree.
    //
    //
    // PARAMETERS:
    //             Takes in the value we want to search for in the tree.
    // Returns: Returns null if we don't find the item or the item if we find it in the tree.
    //-----------------------------------------------------------------------------------------------
    searchTree(value) {

        return this.searchTreeRecursive(this.#root,value,"");

    }



    //---------------------------------------------------------------------------------------------
    // searchTreeRecursive
    //
    // PURPOSE:    This method will do the recursion work search for the item we are looking for in
    //             in the leaf nodes. We will also be building a path to that item from top node to the leaf.
    //             Huge part of the huffman encoding, if we go left in the tree, we add a 0, and right, we add 1
    //             This will build a string path in the end.
    //
    //
    // PARAMETERS:
    //              Takes in the current node we are working on since its recursion, and also
    //              the value we are searching for. We also will pass in the path created so far.
    // Returns: Returns a path to value if found, a string path, of 0's and 1's.
    //-----------------------------------------------------------------------------------------------
    searchTreeRecursive(currentNode, value, path) {

        let results = null;

        if (currentNode) {

            if (currentNode.getData() === value) {
                results = path;
            } else {

                let leftPath = this.searchTreeRecursive(currentNode.getLeftNode(), value, path + "0");
                let rightPath = this.searchTreeRecursive(currentNode.getRightNode(), value, path + "1");

                if (leftPath !== null) {
                    results =  leftPath
                }

                if (rightPath !== null) {
                    results = rightPath
                }

            }
        }


        return results;
    }





}

module.exports = HuffmanTree;