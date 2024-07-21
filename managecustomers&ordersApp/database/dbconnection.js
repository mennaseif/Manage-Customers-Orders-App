import mysql from 'mysql2'
export const dbconnection =()=>{

     const conn=  mysql.createConnection({
        host: "localhost",
        database: "managecustomers&ordres",
        user:"root",
        password:""
    })

    conn.connect((err) =>{
        if (err) return console.log("database error");
        console.log("database connected successfully.")
    })

    return conn

}