const pool = require("./pool");

async function insertUser(username, password, email, date_of_birth){

    
    await pool.query("INSERT INTO users (username, password, email, date_of_birth) VALUES ($1, $2 ,$3 ,$4)", [username, password, email, date_of_birth]);

};

async function selectAllUsers(){


    const {rows} = await pool.query("SELECT * FROM users");
    return rows;
}



module.exports = {insertUser, selectAllUsers};