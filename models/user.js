module.exports = function (sequelize, DataTypes) {
    var user  = sequelize.define("user", {
        name: DataTypes.STRING(50),
        password: DataTypes.STRING(30)
    }, {
        freezeTableName: true
    });
    return user;
};
