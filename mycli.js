// commands ->

// view --tree --flat
            //organize -> same folder, multiple folder
            // help

// [node , mylci.js, view, dirname, node]
//node mycli.js organize -/foldername
// node mycli.js help

let input = process.argv.slice(2);
let cmd = input[0];
let {help} = require("./commands/help.js"); 
// another way to call
//let helpfile = require("./commands/help");
//helpfile.helpfn(); 
const {organize} = require("./commands/organize.js");
const {viewfn} = require("./commands/view.js");
switch(cmd){
    case "view":
        console.log(input[0], input[1])
        viewfn(input[2], input[1]);
        break;
    
    case "organize":
        organize(input[1]);
        break;
    
    case "help":
        help();
        break;
    
    default :
        console.log("Wrong command, enter help to see list of all commands");

}