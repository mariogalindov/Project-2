module.exports = function (sequelize, DataTypes) {
    var ApptBookingChannel = sequelize.define("appt_booking_channel", {
        app_booking_channel_name: DataTypes.STRING(50)
    }, {
        freezeTableName: true
    });
    return ApptBookingChannel;
};