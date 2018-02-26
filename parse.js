const fs = require('fs');


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
        if (isValidUser(users, user)) {
            validUsers.push(user);
        }
        else {
            invalidUsers.push(user);
        }
    });
}

function isValidUser(users, user) {
    return emailValidation(user.email) && !(idValidation(users, user.id)) && ageValidation(user.age);

}

function emailValidation(email) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}

function idValidation(users, id) {
    let count = 0;
    let duplicatID = false;
    users.forEach(users => {
        if (users.id === id) {
            count++;
        }
    });
    if (count > 1) {
        duplicatID = true;
    }
    return duplicatID;
}

function ageValidation(age) {
    return age > 0;
}

function writeUsersToJsonfile(validUsers) {

    let usersasString = JSON.stringify(validUsers);
    fs.writeFileSync("./users.json", usersasString);
}