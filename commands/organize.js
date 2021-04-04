let fs = require("fs");
let path = require("path");
// Different types of folder to push the file into
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizefn(dirpath) {
    //mkdir, mkdirsync
    // orgfilepath - path to create the "organized_files" folder 
    let orgfilepath  = path.join(dirpath, "organized_files");
    //  creates the "organized_files"       
    dircreator(orgfilepath);  
    // creating the different folders - media, archives...etc                                     
    for(let key in types){
        let innerdirpath = path.join(orgfilepath, key);
        dircreator(innerdirpath);
    }

    // creating others folder
    let otherpath = path.join(orgfilepath, "others");
    dircreator(otherpath);
    // Calling orgainzed directory function to copy the file to destination folder/directory
    Organizedirectory(dirpath, orgfilepath);
}
// Function to create the folders/directory
function dircreator(dirpath){
    if(fs.existsSync(dirpath) == false){
        fs.mkdirSync(dirpath);
    }
}

// function to get the extension of each file getting parsed and put it in the respective type folder
function GetDirectory(dirpath){
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    //console.log(ext)
    // path.extname(dirpath);
    for(let type in types){
        // types[type].includes(ext);
        for(let i = 0; i<types[type].length; i++){
            if(types[type][i] == ext){
                return type;
            }
        }
    }
    return "others";
}

// function to know whether the current selected element is file(like - .doc, .xslx) or not
function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

// Read the contents of a directory
function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}

// To copy the files to the selected folder - 
//It is done because we are creating a copy of the file to the new folder created and not moving the file from its original folder
function copyfiletofolder(dirpath, destination){
   let orgfilename = path.basename(dirpath);
   let destfilepath = path.join(destination, orgfilename);
   fs.copyFileSync(dirpath , destfilepath) 
}

function Organizedirectory(dirpath, orgfilepath){
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // identify -> destination directory
        let foldername = GetDirectory(dirpath);  
        console.log(dirpath, "->", foldername);
        // Getting final destination directory
        let destination = path.join(orgfilepath, foldername);
        copyfiletofolder(dirpath, destination);
    } else {
        // If a file is not found then moving further inside the folder/directory
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            
            let childPath = path.join(dirpath, content[i]);
            Organizedirectory(childPath, orgfilepath, "\t");
        }
    }
}



module.exports = {
    organize : organizefn
} 