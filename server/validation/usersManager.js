function getLocationByValue(value, array) {
    let i=0, location = null;
    array.forEach(arrayValue => {
        if (value === arrayValue) {
            location = i;
        }
        i++;
    });

    return location;
}

class UserManager {
    constructor() {
        this.users = {
            usernames: [],
            passwords: [] 
        };
    }
    
    registerNewUser(username, password) {
        let response = false;
        if(getLocationByValue(username, this.users.usernames) === null) {
            this.users.usernames.push(username);
            this.users.passwords.push(password);
            response = true;
        }
    
        return response;
    }
    
    getUserById = (username) => {
        let returnVal = null,
            location=getLocationByValue(username, this.users.usernames);
        if(location !== null) {
            returnVal = {
                username: this.users.usernames[location],
                password: this.users.passwords[location]
            };
        }
    
        return returnVal;
    }
}

module.exports = new UserManager();