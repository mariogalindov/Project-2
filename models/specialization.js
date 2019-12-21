module.exports = function (sequelize, DataTypes) {
    var Specialization = sequelize.define("specialization", {
        specialization_name: DataTypes.STRING(100)
    }, {
        freezeTableName: true
    });
    return Specialization;
};