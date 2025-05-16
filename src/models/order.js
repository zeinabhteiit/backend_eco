import db from "../db.js";

const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.execute("SELECT * FROM Orders", (err, results) => {
      if (err) return reject(err);
       console.log("DEBUG Orders:", results); 
      resolve(results);

    });
  });
};

const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.execute("SELECT * FROM Orders WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// const createOrder = (orderData) => {
//   const { subtotal_amount, total_amount, order_date, status, user_id } = orderData;
//   return new Promise((resolve, reject) => {
//     db.execute(
//       "INSERT INTO Orders (subtotal_amount, total_amount, order_date, status, user_id) VALUES (?, ?, ?, ?, ?)",
//       [subtotal_amount, total_amount, order_date, status, user_id],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve({ id: result.insertId, ...orderData });
//       }
//     );
//   });
// };

const createOrder = (orderData) => {
  const { subtotal_amount, total_amount, order_date, status, user_id, products } = orderData;

  return new Promise((resolve, reject) => {
    // Step 1: Insert into Orders table
    db.execute(
      "INSERT INTO Orders (subtotal_amount, total_amount, order_date, status, user_id) VALUES (?, ?, ?, ?, ?)",
      [subtotal_amount, total_amount, order_date, status, user_id],
      (err, result) => {
        if (err) return reject(err);

        const orderId = result.insertId;

        // Step 2: If no products, just return
        if (!products || products.length === 0) {
          return resolve({ id: orderId, ...orderData });
        }

        // Step 3: Insert each product into OrderDetails
        const orderDetailsPromises = products.map((product) => {
          return new Promise((res, rej) => {
            db.execute(
              "INSERT INTO OrderDetails (product_id, order_id, quantity) VALUES (?, ?, ?)",
              [product.product_id, orderId, product.quantity],
              (err) => {
                if (err) return rej(err);
                res();
              }
            );
          });
        });

        // Step 4: Wait for all product insertions to complete
        Promise.all(orderDetailsPromises)
          .then(() => {
            resolve({ id: orderId, ...orderData });
          })
          .catch(reject);
      }
    );
  });
};


const updateOrder = (id, updatedData) => {
  const { subtotal_amount, total_amount, order_date, status, user_id } = updatedData;
  return new Promise((resolve, reject) => {
    db.execute(
      "UPDATE Orders SET subtotal_amount = ?, total_amount = ?, order_date = ?, status = ?, user_id = ? WHERE id = ?",
      [subtotal_amount, total_amount, order_date, status, user_id, id],
      (err) => {
        if (err) return reject(err);
        resolve({ id, ...updatedData });
      }
    );
  });
};

const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.execute("DELETE FROM Orders WHERE id = ?", [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
