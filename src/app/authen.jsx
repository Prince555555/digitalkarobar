import mysql from 'mysql';
import bcrypt from 'bcryptjs';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'finance_data',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE username = ?';
    db.query(query, [username], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve({ success: false, message: 'User not found' });
        } else {
          const user = results[0];
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            resolve({ success: true });
          } else {
            resolve({ success: false, message: 'Invalid password' });
          }
        }
      }
    });
  });
};
