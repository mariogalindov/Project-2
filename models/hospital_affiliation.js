module.exports = function (sequelize, DataTypes) {
    var HospitalAffiliation = sequelize.define("hospital_affiliation", {
        doctor_id: DataTypes.INTEGER,
        hospital_name: DataTypes.STRING(100),
        city: DataTypes.STRING(50),
        country: DataTypes.STRING(50),
        start_date: DataTypes.DATEONLY,
        end_date: { type: DataTypes.DATEONLY, allowNull: true }
    }, {
        freezeTableName: true
    });
    return HospitalAffiliation;
};