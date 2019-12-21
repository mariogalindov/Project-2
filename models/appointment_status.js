module.exports = function (sequelize, DataTypes) {
    var AppointmentStatus = sequelize.define("appointment_status", {
        status: DataTypes.STRING(10)
    }, {
        freezeTableName: true
    });
    return AppointmentStatus;
};