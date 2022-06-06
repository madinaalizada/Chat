const pool = require("./connect");

class UserService {
  async getAllUsers() {
    const conn = await pool.getConnection();
    const [response] = await conn.query("SELECT * FROM users");
    conn.release();
    return response;
  }

  async getUserById(username) {
    const conn = await pool.getConnection();

    const [response] = await conn.query(
      "SELECT userID FROM users WHERE username = ?",
      username
    );

    conn.release();
    return response;
  }

  async addUser(user) {
    if (user.username && user.password) {
      const conn = await pool.getConnection();
      const [users] = await conn.query("SELECT * FROM users");
      const _user = users.filter((u) => u.username == user.username);
      if (!_user.length) {
        const [response] = await conn.query(
          "INSERT INTO users (username, password) VALUES (? ,?)",
          [user.username, user.password]
        );
        return response.insertId;
      } else {
        if (_user[0].password == user.password) {
          return _user[0].userID;
        }
      }
      conn.release();
      throw new Error("This passord is incorrect!");
    }
    throw new Error("This model is invalid!");
  }

  async addMessage(message) {
    if (message.from && message.to && message.title) {
      const conn = await pool.getConnection();
      const [response] = await conn.query(
        "INSERT INTO message (messageTitle, messageFrom, messageTo) VALUES (? , ?, ?)",
        [message.title, message.from, message.to]
      );
      conn.release();
      return response;
    } else {
      throw new Error("This model is invalid!");
    }
  }

  async getMessages(users) {
    if (users.userName && users.partnerName) {
      const conn = await pool.getConnection();
      const [response] = await conn.query(
        "select * from message WHERE (messageFrom = ? AND messageTo = ?) OR (messageFrom = ? AND messageTo = ?)",
        [users.userName, users.partnerName, users.partnerName, users.userName]
      );
      conn.release();
      console.log(response);
      return response;
    } else {
      throw new Error("These username or partnername are invalid!");
    }
  }
}

module.exports = new UserService();
