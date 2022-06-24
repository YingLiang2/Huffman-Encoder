// CLASS: HuffmanEncoder.
//
// Author: Ying Liang
//
// REMARKS: This is our HuffmanEncoder class, that will encode the huffman trees.
//
//-----------------------------------------
"use strict"

let HuffmanTree = require('./HuffmanTree.js');
let Dictionary = require("./Dictionary.js");
let StringHash = require("./StringHash.js");
let fs = require("fs");


class HuffmanEncoder {

    #contents //this will be the contents of the file we are working with
    #frequencyDictionary //This will be the dictionary that holds the frequencies of all the characters that appear in the file.
    #eachUniqueChar //This will be an array that holds each unique character that appears in our file once.
    #file   //the file
    #allPaths  //dictionary to hold all the paths to leaf nodes.


    constructor(fileName) {

        if (arguments.length === 1) {

            this.#file = fileName;

            this.#contents = fs.readFileSync(this.#file, "utf8");
            this.#frequencyDictionary = new Dictionary(1000);
            this.#eachUniqueChar = [] //a blank array at first.

            this.#allPaths = new Dictionary(1000);

        } else {

            throw new Error("There are too many or too little arguments. HuffmanEncoder object needs 1 parameter, and that is the file name.");

        }
    }


    //Encoding is built by constructing a set of huffman trees and then joining these trees until 1 final tree remains

    //---------------------------------------------------------------------------------------------
    // encode()
    //
    // PURPOSE:    This method to encode the input file by constructing a set of huffman trees, then
    //             we join these trees until 1 final tree remains.
    //             This is the way we will encode the entire text file, into 1's and 0's.
    //
    //
    // PARAMETERS:
    //              No parameters
    // Returns: Returns a new file with the same extension but the contents encoded by the Huffman algorithm.
    //-----------------------------------------------------------------------------------------------
    encode() {

        //a. First we construct a tree for each character in the file. The weight used for these trees are the percentages
        //   calculated in findCharFrequency.

        //This will be the array that initially holds all the trees created from each character in the file.
        let allTrees = new Array(this.#eachUniqueChar.length);

        //Get all the frequencies of all the characters in the file.
        this.findCharFrequency();

        //Now we will loop through each unique character in our textfile, making a new tree of each unique char
        //So each unique char will be the root node.
        //We then add the tree into an array of all trees.
        for (let i = 0; i < this.#eachUniqueChar.length; i++) {

            let charKey = new StringHash(this.#eachUniqueChar[i]);

            let treeWeight = this.#frequencyDictionary.get(charKey);

            let newTree = new HuffmanTree();

            newTree.createTree(this.#eachUniqueChar[i],treeWeight);

            allTrees.push(newTree);


        }


        //While the array of all trees is bigger than 1, we want to sort the array into ascending order
        //With the smallest trees in front compared by weight.
        //We then take the first 2 trees and combine them into 1 tree. And we put that combined tree back into the array of all trees
        //We do this until there is one tree remaining in our array, which then will become our full huffman tree.
        while (allTrees.length > 1) {

            allTrees.sort((firstTree,secondTree)=> firstTree.compareTo(secondTree));

            let combinedTree = new HuffmanTree();

            combinedTree.combineTrees(allTrees[0],allTrees[1]);

            allTrees.push(combinedTree);
            allTrees.shift();
            allTrees.shift();



        }

        //We get all the paths of each leaf node, from the big huffman tree
        //and store it into an array.
        for (let i = 0; i < this.#eachUniqueChar.length;i++) {

            let pathToTarget = allTrees[0].searchTree(this.#eachUniqueChar[i]);
            this.#allPaths.put(new StringHash(this.#eachUniqueChar[i]),pathToTarget);

        }


        let fileEncoding = "";

        //We start encoding into a new huffman file.
        for (let i = 0; i < this.#contents.length-1;i++) {

            fileEncoding += this.#allPaths.get(new StringHash(this.#contents[i])) + " "


        }

        //Add the \n at the end.
        fileEncoding += this.#allPaths.get(new StringHash(this.#contents[this.#contents.length-1])) + "\n";

        //Keep the same extension so .huff
        fs.writeFileSync(this.#file + ".huff",fileEncoding);



    }



    //---------------------------------------------------------------------------------------------
    // findCharFrequency()
    //
    // PURPOSE:    This method finds the frequency(amount of times) of a character that appears in the file
    //
    //
    // PARAMETERS:
    //              No parameters
    // Returns: Returns nothing, but it fills dictionary with the weights of each character appearing.
    //-----------------------------------------------------------------------------------------------
    findCharFrequency() {


        //First for loop
        //It loops through the file, counting each time the character appears in the dictionary.

        //IF
        // the character is not in the dictionary, add it to the dictionary with a value of 1, because
        //thats the first time it appeared in the dictionary.
        //We also add the character to an array of characters, signifying that its a unique char part of our file.

        //ELSE
        // we know the character is in the dictionary already, so all we do is increment its value by 1

        //At the end of the first for loop, we know that each unique character that appears in the file, and
        //how many times it appears in the file.

        //Looping through the input file, more specifically looping through each character in the file
        for (let i = 0; i < this.#contents.length;i++) {

            //Now we have a character we want to put it into the dictionary
            //We will need to hash the character to find the index to put it into the dictionary

            let charKey = new StringHash(this.#contents[i]);

            if (!this.#frequencyDictionary.contains(charKey)) {

                this.#eachUniqueChar.push(this.#contents[i]);

                this.#frequencyDictionary.put(charKey,1);

            } else {

                let increment = this.#frequencyDictionary.get(charKey) + 1

                this.#frequencyDictionary.put(charKey, increment);
                //console.log(this.#frequencyDictionary.get(charKey));
            }


        }

        //Second for loop,

        //We will loop through the array of unique chars we filled from the first for loop,
        //We will get the value of each individual character, as the dictionary is key-pair values.
        //The value is how many times the character has appeared, we will calculate the weight with that value
        //by this formula: weight = (# of appearances / file.length)
        //Then we will store that weight as the new value of the key-pair for that character back into the dictionary.

        for (let i = 0; i < this.#eachUniqueChar.length;i++) {

            let charKey = new StringHash(this.#eachUniqueChar[i]);

            let charAppearance = this.#frequencyDictionary.get(charKey);

            //Now that we have the frequency, we will store the frequency of the current character appearing in the file
            //as an key-value pair in the dictionary. They key is the characters hashed key, and the value is the frequency of the character.
            this.#frequencyDictionary.put(charKey,charAppearance/this.#contents.length);


        }


    }

}

module.exports = HuffmanEncoder;