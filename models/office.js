module.exports = function (sequelize, DataTypes) {
    var Office = sequelize.define("office", {
        doctor_id: DataTypes.INTEGER,
        hospital_affiliation_id: { type: DataTypes.INTEGER, allowNull: true },
        time_slot_per_client_in_min: DataTypes.INTEGER,
        first_consultation_fee: DataTypes.INTEGER,
        followup_consultation_fee: DataTypes.INTEGER,
        street_address: DataTypes.STRING(500),
        city: DataTypes.STRING(100),
        state: DataTypes.STRING(100),
        country: DataTypes.STRING(100),
        zip: DataTypes.STRING(50)
    }, {
        freezeTableName: true
    });
    return Office;
};