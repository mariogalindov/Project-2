module.exports = function (sequelize, DataTypes) {
    var Consec = sequelize.define("consec", {
        consec: DataTypes.INTEGER,
    }, {
        freezeTableName: true
    });
    return Consec;
};