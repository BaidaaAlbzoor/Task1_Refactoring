const fs = require('fs');
let values = [];
let invalidUsers = [];
let validUsers = [];
let invalidUResult = "";
let validationMsg = "";
let usersasString;



main();

function main() {
    let content = fs.readFileSync('./data.csv', 'utf8');
    let { lines, headers, keys } = parseFileContent(content);
    let users = parseLinesToUsers(lines, keys);
    let { validUsers, invalidUsers } = validation(users);
    writeUsersToJsonfile(validUsers);
}

function parseFileContent(fileContent) {
    let lines = content.split("\n");
    let headers = lines.shift();
    let keys = headers.split(",");
    return { lines, headers, keys };
}

function parseLinesToUsers(lines, keys) {

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

// sort users to valid and invalid users
let validOnes = users.forEach(user => {
    if ((emailValidation(user.email) && !(idValidation(user.id)) && ageValidation(user.age)) === true) {

        validUsers.push(user);
    }

    else {


        invalidUsers.push(user);
    }
});


//store valid users in json file
usersasString = JSON.stringify(validUsers);
fs.writeFileSync("./users.json", usersasString);


//email validation function 
function emailValidation(email) {

    if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
        validationMsg = "valid email";
        // console.log(validationMsg);
        return true;
    } else {
        validationMsg = "invalid email";
        //console.log(validationMsg);
        return false;

    }
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
