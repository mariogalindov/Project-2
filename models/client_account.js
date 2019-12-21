module.exports = function (sequelize, DataTypes) {
    var ClientAccount = sequelize.define("client_account", {
        first_name: DataTypes.STRING(50),
        last_name: DataTypes.STRING(50),
        contact_number: DataTypes.INTEGER,
        email: DataTypes.STRING(50)
    }, {
        freezeTableName: true
    });
    return ClientAccount;
};