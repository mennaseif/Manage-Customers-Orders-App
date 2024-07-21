import { dbconnection  } from "../../database/dbconnection.js";
const conn = dbconnection()

const addOrder = (req, res) =>{

    conn.query(`insert into orders set ?`, req.body)
    res.status(201).json({message:"success"})
}

const getAverageOrderValue =(req, res) =>{
    conn.query(`select avg (totalAmount) as average_order_value from orders`, (err,data) => {
        res.status(201).json({message:"sucsess", averageOrderValue:data})

    })
}

 const getCustomersWithNoOrders = (req,res) =>{
    conn.query(`select * from customers left join orders on customers.id = orders.customerId where orders.customerId is null`, (err,data) =>{
        res.status(201).json({message:"sucsess", getCustomersWithNoOrders:data})
    })
 }

    const getCustomerWithMostItems =(req, res) =>{
        conn.query(`SELECT c.id, c.firstName, c.lastName, c.email, c.phone, SUM(oi.quantity) AS total_items
                    FROM customers c JOIN orders o ON c.id = o.customerId JOIN orderitems oi ON o.id = oi.orderId
                    GROUP BY c.id, c.firstName, c.lastName, c.email, c.phone
                    ORDER BY total_items DESC
                    LIMIT 1`,(err,data) => {
            res.status(201).json({message:"sucsess", getCustomerWithMostItems:data})

        })
    }

    const getTopSpentMostMoneyCustomers =(req, res) =>{
        conn.query(`SELECT c.id, c.firstName, c.lastName, c.email, c.phone, SUM(o.totalAmount) AS total_spent FROM customers c
                    JOIN orders o ON c.id = o.customerId
                    GROUP BY c.id, c.firstName, c.lastName, c.email, c.phone
                    ORDER BY total_spent DESC
                    LIMIT 10`,(err,data) =>{
             res.status(201).json({message:"sucsess", getTopSpentMostMoneyCustomers:data})
                    })
    }

    const getCustomersWithAtLest5Orders = (req, res) =>{
        conn.query(`SELECT c.id, c.firstName, c.lastName, c.email, c.phone, COUNT(o.id) AS order_count FROM customers c 
                    JOIN orders o ON c.id = o.customerId 
                    GROUP BY c.id, c.firstName, c.lastName, c.email, c.phone 
                    HAVING order_count >= 5;`,(err,data) =>{
            res.status(201).json({message:"sucsess", getCustomersWithAtLest5Orders:data})

        })
    }

    const getPercentageOFCustomerswithOrders = (req, res) => {
        conn.query(`SELECT (SELECT COUNT(DISTINCT customerId) FROM orders
                    WHERE customerId IN ( SELECT customerId FROM orders
                    GROUP BY customerId
                    HAVING COUNT(*) > 1
                    )) * 100.0 / COUNT(DISTINCT customerId) AS percentage FROM orders`, (err,data) =>{
            res.status(201).json({message:"sucsess", getPercentageOFCustomerswithOrders:data})
                    })
    }

    const getCustomerWithEarliestOrder = (req, res) =>{
         conn.query(`SELECT customerId, orderDate FROM orders
                     WHERE orderDate = ( SELECT MIN(orderDate) FROM orders)`,(err,data)=>{
       res.status(201).json({message:"sucsess", getCustomerWithEarliestOrder:data})

         })
    }
    
 

export {
    addOrder,
    getAverageOrderValue,
    getCustomersWithNoOrders,
    getCustomerWithMostItems,
    getTopSpentMostMoneyCustomers,
    getCustomersWithAtLest5Orders,
    getPercentageOFCustomerswithOrders,
    getCustomerWithEarliestOrder
}