const fs = require('fs');
let invalidUResult = "";
let validationMsg = "";
let usersasString;



main();

function main() {
    let content = fs.readFileSync('./data.csv', 'utf8');
    let { lines, headers, keys } = parseFileContent(content);
    let users = parseLinesToUsers(lines, keys);
    let { validUsers, invalidUsers } = UserValidation(users);
    writeUsersToJsonfile(validUsers);
}

function parseFileContent(fileContent) {
    let lines = content.split("\n");
    let headers = lines.shift();
    let keys = headers.split(",");
    return { lines, headers, keys };
}

function parseLinesToUsers(lines, keys) {
    let values = [];
    let users = lines.map(line => {
        let obj = {};
        values = line.split(",");
        keys.forEach((item, index) => {
            obj[item] = values[index];
        });
        return obj;
    });
    return users;
}


function UserValidation(users) {
    let invalidUsers = [];
    let validUsers = [];

    users.forEach(user => {
        if (isValidUser(users,user)) {
            validUsers.push(user);
        }
        else {
            invalidUsers.push(user);
        }
    });

}

function isValidUser(users,user){
    return emailValidation(user.email) && !(idValidation(users,user.id)) && ageValidation(user.age);
  
}


//store valid users in json file
usersasString = JSON.stringify(validUsers);
fs.writeFileSync("./users.json", usersasString);


//email validation function 
function emailValidation(email) {
  return  /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}

//id validation function 
function idValidation(id) {
    let count = 0;
    let duplicatID = false;
    users.forEach(users => {
        if (users.id === id) {
            count++;
        };

        if (count > 1) {
            duplicatID = true;

        }
        //console.log("dup?:"+duplicatID);
        return duplicatID;
    });

}

//age validation function 
function ageValidation(age) {
    if (age > 0) {
        //console.log("vaild age");
        return true;

    }
    else {
        // console.log("invaild age");
        return false;
    }
}
