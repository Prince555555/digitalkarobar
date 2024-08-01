import { useState } from 'react';
import { useRouter } from 'next/router';
import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

const Transaction = () => {
  const router = useRouter();

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [paymentType, setPaymentType] = useState('online');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Insert data into transactions table
    const query = 'INSERT INTO transactions (item, quantity, price, payment_type) VALUES (?, ?, ?, ?)';
    db.query(query, [item, quantity, price, paymentType], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully');
        router.push('/'); // Redirect back to homepage or any other page
      }
    });
  };

  return (
    <div>
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentType">Payment Type:</label>
          <select
            id="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Transaction;
