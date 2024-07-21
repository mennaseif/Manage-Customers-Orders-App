import { dbconnection } from "../../database/dbconnection.js" 
import bcrypt from 'bcrypt'
const connection = dbconnection()

const signup = (req, res) =>{

    connection.query('insert into customers set ?', req.body)
    res.status(201).json({message:"signed up successfully"})
}

const login = (req, res) => {

    connection.execute(`select id, email, password from customers where email= '${req.body.email}'`,(err,data) =>{
        if(data.length != 0){
            let match= bcrypt.compareSync(req.body.password, data[0].password)
            if(match){
                res.json({message:"login", customersId:data[0].id})
            }else{
                res.status(401).json({message:"password is not correct please try again"})
            }
        }else{
            req.status(401).json({message:"account is not found"})
        }
    })
}

export {
    signup,
   login
}