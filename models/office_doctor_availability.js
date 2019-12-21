module.exports = function (sequelize, DataTypes) {
    var OfficeDoctorAvailability = sequelize.define("office_doctor_availability", {
        office_id: DataTypes.INTEGER,
        day_of_week: DataTypes.STRING(10),
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        is_available: DataTypes.BOOLEAN,
        reason_of_unavailablity: DataTypes.STRING(500)
    }, {
        freezeTableName: true
    });
    return OfficeDoctorAvailability;
};