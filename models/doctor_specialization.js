module.exports = function (sequelize, DataTypes) {
    var DoctorSpecialization = sequelize.define("doctor_specialization", {
        doctor_id: DataTypes.INTEGER,
        specialization_id: DataTypes.INTEGER
    }, {
        freezeTableName: true
    });
    return DoctorSpecialization;
};