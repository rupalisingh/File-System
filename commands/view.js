// file , folder 
let fs = require("fs");
let path = require("path");

// let content = fs.readFileSync("gtree.js");
// console.log("content is "+content);
// viewFlat 
// nodejs 

// main view function to select - flat or view type implementation
function view(dirname, mode) {

    if (mode == "tree") {
        viewTree(dirname, "");
    } else if (mode == "flat") {
        viewFlat(dirname);
        console.log("flat view implemented");
    } else {
        console.log("Wrong mode");
    }
}

// to check if the selected element is file or folder/directory
function isFileorNOt(dirpath) {
    console.log(dirpath)
    return fs.lstatSync(dirpath).isFile();
}

// parsing the directory
function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}

function viewTree(dirpath, indent) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // If its a file then adding '*' to the basename of file
        console.log(indent + path.basename(dirpath) + "*");
    } else {
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);
        
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);
            viewTree(childPath, indent + "\t");
        }
    }

}
function viewFlat(dirpath, toPrint) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            let childPath = path.join(dirpath, content[i]);

            viewFlat(childPath, toPrint + "\\" + content[i]);
        }
    }

}

module.exports = {
    viewfn: view
}