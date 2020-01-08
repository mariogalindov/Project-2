// =============================================================
// Routing modules
// =============================================================

// DEPENDENCIES
// =============================================================
var db = require("../models");
var dottie = require("dottie");
var moment = require('moment');
var bodyParser = require('body-parser')
var path = require("path");

// Dependencies
// =============================================================
var path = require("path");


// PATIENT ROUTES 
// =============================================================

module.exports = function (app) {

  // index route loads HOME page (GET method)
  app.get("/", function (req, res) {
    res.render("index");
    console.log("rendering views/index.handlebars from routes/htmlRoutes.js");
  });

  // Search speciality + city from HOME and render search results and availability
  function IsValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  app.get("/specializations/:specialization_id/doctors/offices/availability", function (req, res) {
    db.sequelize.query("SELECT s.id as `id`, s.specialization_name as `name`," +
        " d.id as `doctor.id`, concat(d.first_name,  '  ',d.last_name) as `doctor.name`," +
        " o.id as `doctor.office.id`, concat(o.street_address, ' ', o.city, ' ', o.country, ' ' , o.zip) as `doctor.office.address`," +
        " ap.id as `doctor.office.availability.appointment_id`," +
        " DAYOFWEEK(oda.start_time) as `doctor.office.availability.week_day_number`," +
        " DAYNAME(oda.start_time) as `doctor.office.availability.week_day_name`," +
        " DATE_FORMAT(oda.start_time, '%M %d %Y') as `doctor.office.availability.date`," +
        " TIME(DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE)) as `doctor.office.availability.timeslot`" +
        " FROM doctor_specialization ds inner join office o on (ds.doctor_id = o.doctor_id)" +
        " inner join specialization s on (ds.specialization_id = s.id)" +
        " inner join doctor d on (ds.doctor_id=d.id)" +
        " inner join office_doctor_availability oda on(o.id=oda.office_id  )" +
        " inner join consec con on((TIME_TO_SEC(TIMEDIFF(oda.end_time, oda.start_time))/(60*o.time_slot_per_client_in_min))>con.consec  )" +
        " left outer join appointment ap on(oda.office_id = ap.office_id and oda.start_time<= ap.probable_start_time " +
        " and oda.end_time>= ap.probable_start_time and ap.appointment_status_id in(1,2)" +
        " and ap.probable_start_time =DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE) )" +
        " WHERE ds.specialization_id = " + req.params.specialization_id + " and DATE_ADD(oda.start_time, INTERVAL con.consec*o.time_slot_per_client_in_min MINUTE)>CURRENT_TIME()" +
        " order by s.id,o.doctor_id,o.id,DAYOFWEEK(oda.start_time),oda.start_time,con.consec")
      .then(([results, metadata]) => {
        var resultlen = results.length;
        var idspeAnt = null;
        var iddoctorAnt = null;
        var idofficeAnt = null;
        var weekdaynumberAnt = null;
        var jsonresp = "[";
        var idspeUnion = "";
        var iddoctorUnion = "";
        var idofficeUnion = "";
        var idofficeUnionUnion = "";
        var idappUnion = "";
        for (var index = 0; resultlen > index; index++) {
          var rowresult = results[index];
          var idspe = rowresult['id'];
          var namespe = rowresult['name'];
          var iddoctor = rowresult['doctor.id'];
          var namedoctor = rowresult['doctor.name'];
          var idoffice = rowresult['doctor.office.id'];
          var weekdaynumber = rowresult['doctor.office.availability.week_day_number'];
          var weekdayname = rowresult['doctor.office.availability.week_day_name'];
          var date = rowresult['doctor.office.availability.date'];
          var officeaddress = rowresult['doctor.office.address'];
          var idappoint = rowresult['doctor.office.availability.appointment_id'];
          var timeslot = rowresult['doctor.office.availability.timeslot'];
          if (idspeAnt != idspe) {
            jsonresp = jsonresp + idspeUnion + "{";
            idspeUnion = "]}]}]}]},";
            jsonresp = jsonresp + "\"id\":" + idspe + "," + "\"name\":\"" + namespe + "\",\"doctor\":[";
            idspeAnt = idspe;
            iddoctorUnion = "";
            iddoctorAnt = null;
          } else {}
          if (iddoctorAnt != iddoctor) {
            jsonresp = jsonresp + iddoctorUnion + "{";
            iddoctorUnion = "]}]}]},";
            jsonresp = jsonresp + "\"id\":" + iddoctor + "," + "\"name\":\"" + namedoctor + "\",\"office\":[";
            iddoctorAnt = iddoctor;
            idofficeUnion = "";
            idofficeAnt = null;
          } else {}
          if (idofficeAnt != idoffice) {
            jsonresp = jsonresp + idofficeUnion + "{";
            idofficeUnion = "]}]},";
            jsonresp = jsonresp + "\"id\":" + idoffice + "," + "\"address\":\"" + officeaddress + "\",\"availability\":[";
            idofficeAnt = idoffice;
            idappUnion = "";
            idofficeUnionUnion = "";
            dayoftheweekAnt = null;
            weekdaynumberAnt = null;
          } else {}
          if (weekdaynumberAnt != weekdaynumber) {
            jsonresp = jsonresp + idofficeUnionUnion + "{";
            idofficeUnionUnion = "]},";
            jsonresp = jsonresp + "\"weekdaynumber\":" + weekdaynumber + "," + "\"weekdayname\":\"" + weekdayname + "\"" + "," + "\"date\":\"" + date + "\",\"availability\":[";
            weekdaynumberAnt = weekdaynumber;
            idappUnion = "";
          } else {}
          var idappointtxt;
          if (idappoint == null) {
            idappointtxt = 'null';
          } else {
            idappointtxt = idappoint;
          }
          jsonresp = jsonresp + idappUnion + "{\"id\":" + idappointtxt + "," + "\"timeslot\":\"" + timeslot + "\"}";
          idappUnion = ",";
          if (resultlen == index + 1) {
            jsonresp = jsonresp + "]";
            jsonresp = jsonresp + "}";
            jsonresp = jsonresp + "]";
            jsonresp = jsonresp + "}";
            jsonresp = jsonresp + "]";
            jsonresp = jsonresp + "}";
            jsonresp = jsonresp + "]";
            jsonresp = jsonresp + "}";
          }
        }
        jsonresp += "]";
        console.log(jsonresp);
        console.log("MEMO <routes/<htmlRoutes.js> route is in use >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        if (IsValidJSONString(jsonresp)) {
          jsonresp = JSON.parse(jsonresp);
        }
        res.render("search",{jsonresp, helpers: {
          datifier: function(expression){
            return moment(expression).format("DD/MM/YY")
          },
          time: function(expression){
            return moment(expression, "HH:mm:ss").format("HH:mm")
          },
          timeId: function(dateExp, timeExp){
            var dateId = moment(dateExp).format("DDMMYYYY");
            var timeId = moment(timeExp, "HH:mm:ss").format("HHmm");
            return dateId + timeId;
          },
          datesCarousel: function(officeId){
            return "datesCarouselOf" + officeId
          },
          htDatesCarousel: function(officeId){
            return "#datesCarouselOf" + officeId
          },
          lengthOfArray: function(v1,v2,options){
            'use strict';
            if(v1.length>v2){
              return options.fn(this);
            }
            return options.inverse(this);
          },
          hasAppointment: function(arg1,arg2,options){
            return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
          },
          join: function(string){
            return string.split(" ").join("_");
          }
        }
        });
      })
  });

  // Create an appointment route renders appointment form (GET method)
  app.get("/patient/create_appointment/:drid/:drname/:drsp/:office/:address/:timeslot", function (req, res) {
    var selectedDoctorID = req.params.drid;
    var rawName = req.params.drname;
    var selectedDoctorName = rawName.replace(/_/g, " ");
    var rawSpecialty = req.params.drsp;
    var selectedDoctorSpecialty = rawSpecialty.replace(/_/g, " ");
    var selectedDoctorOffice = req.params.office;
    var rawAddress = req.params.address;
    var address = rawAddress.replace(/_/g, " ");
    var timestamp = parseInt(req.params.timeslot);


    var formatted = moment(timestamp).format('LLLL');
    console.log(formatted);
    var timeslot = formatted;


    console.log("Selected Doctor: " + selectedDoctorID);
    console.log("Selected Doctor: " + selectedDoctorName);
    console.log("Selected Office: " + selectedDoctorSpecialty);
    console.log("Selected Office: " + selectedDoctorOffice);
    console.log("Selected Office: " + address);
    console.log("Timeslot: " + timeslot);

    // appointment page injection with selected appointment data
    res.render("appointment", {
      selectedDoctorID: selectedDoctorID,
      selectedDoctorName: selectedDoctorName,
      selectedDoctorSpecialty: selectedDoctorSpecialty,
      selectedDoctorOffice: selectedDoctorOffice,
      address: address,
      timeslot: timeslot
    });
    console.log("rendering views/appointment.handlebars from routes/htmlRoutes.js");
  });

  // Submit an appointment route posts appointment data from form and renders confirmation form
  app.post("/patient/submit_appointment_form", function (req, res) {
    var appointmentObj = {
      patientName: req.body.name_field,
      patientLastName: req.body.lastName_field,
      patientDOB: req.body.birth_date_field,
      patientGenre: req.body.genre_field,
      patientReason: req.body.reason_field,
      patientEmail: req.body.email_field,
      patientPhone: req.body.phone_field,
    }
    res.render("confirm_appointment", appointmentObj);
    console.log(appointmentObj);
  });
};
