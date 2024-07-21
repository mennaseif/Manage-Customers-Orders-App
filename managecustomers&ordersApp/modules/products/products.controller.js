import { dbconnection } from "../../database/dbconnection.js"
const conn = dbconnection()

const addProduct =(req,res) =>{

    conn.query(`insert into products set ?`, req.body)
    res.status(201).json({message:"success"})
}


const getTotalRevenueProducts = (req,res) =>{

    conn.execute(`SELECT products.category, SUM(orderitems.quantity * orderitems.unitPrice) AS total_revenue
      FROM products JOIN orderitems ON products.id = orderitems.productId
      GROUP BY products.category`, (err, data) =>{
        res.status(201).json({message:"sucsess", totalRevenueProducts:data})
      })
}

const itemsSoldByProduct = (req, res) =>{

    conn.execute(` SELECT p.productName, SUM(oi.quantity) AS total_items_sold
          FROM products p
          JOIN orderitems oi ON p.id = oi.productId
          GROUP BY p.productName`, (err, data) =>{
          res.status(201).json({message:"sucsess", itemsSoldByProduct:data})
        })

}

export {
    addProduct,
    getTotalRevenueProducts,
    itemsSoldByProduct
}