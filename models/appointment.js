module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("appointment", {
        user_account_id: DataTypes.STRING(100),
        office_id: DataTypes.STRING(100),
        probable_start_time: DataTypes.DATE,
        actual_end_time: {type: DataTypes.DATE, allowNull: true},
        appointment_status_id: DataTypes.STRING(100),
        appointment_taken_date: DataTypes.DATE,
        app_booking_channel_id: DataTypes.STRING(100)
    }, {
        freezeTableName: true
    });
    return Appointment;
};
