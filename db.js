const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sindhu@mysql",
    database: "project3_db"
});

connection.connect((err) => {
    if(err){
        console.log("Database connection failed");
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});

module.exports = connection;