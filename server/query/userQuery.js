const UQUERY = {
    SELECT_USERS: 'SELECT * FROM User;',
    SELECT_USER: 'SELECT * FROM patients WHERE idUser = ?',
    CREATE_USER: 'INSERT INTO User(Email, Password, PhoneNumber, FirstName, LastName, Address) VALUES (?, ?, ?, ?, ?, ?)',
    SELECT_USER_BY_EMAIL: 'SELECT * FROM User WHERE Email = ?',
};

module.exports = UQUERY;