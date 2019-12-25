var db = require("../models");

module.exports = function(app) {

    // Specializations
    app.get("/api/specializations", function(req, res) {
      db.specialization.findAll({}).then(function(dbExamples) {
        // res.json(dbExamples);
        res.json(dbExamples);
      });
    });

    // Doctors per specialization
    app.get("/api/specializations/:specialization_id/doctors", function(req, res) {
      db.sequelize.query(`SELECT s.id as specialization_id, s.specialization_name, d.id as doctor_id
      , concat(d.first_name, ' ', d.last_name) as doctor_name FROM specialization s, doctor d
      , doctor_specialization ds WHERE d.id = ds.doctor_id AND s.id = ds.specialization_id
      AND s.id = ${req.params.specialization_id};`)
      .then(([results, metadata]) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        res.json(results)
      })
    });

    // Office availability per Doctor
    app.get("/api/doctor/:doctor/office_availability", function(req, res) {
      db.sequelize.query(`SELECT o.id as officeID, ap.id as apptID
      , DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE) as timeSlot
      FROM office o inner join office_doctor_availability oda on(o.id=oda.office_id )
      inner join consec con on((TIME_TO_SEC(TIMEDIFF(oda.end_time, oda.start_time))/(60*o.time_slot_per_client_in_min))>con.consec  )
      left outer join appointment ap on(oda.office_id = ap.office_id and oda.start_time<= ap.probable_start_time and oda.end_time>= ap.probable_start_time
      and ap.appointment_status_id in(1,2) and ap.probable_start_time =DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE) )
      WHERE o.doctor_id = ${req.params.doctor} and DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE)>CURRENT_TIME()
      order by o.doctor_id,o.id,oda.start_time,con.consec`)
      .then(([results, metadata]) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        res.json(results)
      })
    });

    //Doctors per specialization and handlebars render
    app.get("/specializations/:specialization_id/doctors", function(req, res) {
      db.sequelize.query(`SELECT s.id as specialization_id, s.specialization_name, d.id as doctor_id
      , concat(d.first_name, ' ', d.last_name) as doctor_name FROM specialization s, doctor d
      , doctor_specialization ds WHERE d.id = ds.doctor_id AND s.id = ds.specialization_id
      AND s.id = ${req.params.specialization_id};`)
      .then(([results, metadata]) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        res.render("search",{doctors: results});
      })
    });    

};
