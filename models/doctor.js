module.exports = function (sequelize, DataTypes) {
  var Doctor = sequelize.define("doctor", {
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    professional_statement: DataTypes.STRING(4000),
    practicing_from: DataTypes.DATEONLY
  }, {
    freezeTableName: true
  });
  return Doctor;
};