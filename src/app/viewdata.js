import { useState, useEffect } from 'react';
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

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = () => {
    let query = 'SELECT * FROM transactions';
    if (filter === 'last7') {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      query += ` WHERE DATE(date) >= '${last7Days.toISOString().split('T')[0]}'`;
    } else if (filter === 'last15') {
      const last15Days = new Date();
      last15Days.setDate(last15Days.getDate() - 15);
      query += ` WHERE DATE(date) >= '${last15Days.toISOString().split('T')[0]}'`;
    } else if (filter === 'last30') {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      query += ` WHERE DATE(date) >= '${last30Days.toISOString().split('T')[0]}'`;
    }

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setTransactions(results);
      }
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h1>Transaction List</h1>
      <div>
        <button onClick={() => handleFilterChange('last7')}>Last 7 Days</button>
        <button onClick={() => handleFilterChange('last15')}>Last 15 Days</button>
        <button onClick={() => handleFilterChange('last30')}>Last 30 Days</button>
        <button onClick={() => handleFilterChange('all')}>All Transactions</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.item}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.price}</td>
              <td>{transaction.payment_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
