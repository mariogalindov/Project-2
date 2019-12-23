module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("appointment", {
        user_account_id: DataTypes.INTEGER,
        office_id: DataTypes.INTEGER,
        probable_start_time: DataTypes.DATE,
        actual_end_time: {type: DataTypes.DATE, allowNull: true},
        appointment_status_id: DataTypes.INTEGER,
        appointment_taken_date: DataTypes.DATE,
        app_booking_channel_id: DataTypes.INTEGER
    }, {
        freezeTableName: true
    });
    return Appointment;
};