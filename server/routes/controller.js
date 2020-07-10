const express = require('express')
	const bodyParser = require('body-parser')
	const nano = require('nano')('http://localhost:5984')
	const myDB = nano.db.use('db_name');
	const cors = require('cors')
  const router = express.Router();
  const mssql = require('mssql');
  const moment = require('moment');
	

    router.use(cors()); //Cross-Origin Resource Sharing (CORS)
    router.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    var sql = require("mssql");
    var config = {
    user: 'sa',
    password: '81at84',
    server: 'wknsql1', 
    database: 'WukongGlulamReportManagement'
    };
    router.use(bodyParser.json());
	    const wknsql1 = mssql.connect({
        server: 'wknsql1',
        user: 'sa',
        password: '81at84',
        database: 'WukongGlulamReportManagement'
        }, (err) => {
        if (err) {
          console.log("ERROR", err.message);
        } else {
          console.log("GOOD-wknsql1");
        }
          })

      const hrdsql = mssql.connect({
        server: 'hrdsql',
        user: 'sa',
        password: '81at84',
        database: 'GroupCompanyInformation'
        }, (err) => {
        if (err) {
          console.log("ERROR", err.message);
        } else {
          console.log("GOOD-hrdsql");
        }
          })
          
      // Rena
        // LOG IN
    router.post("/login", (request, response) => {
      let req = new mssql.Request();
      
		  req.query(
      "Select * from wknsql1.WukongGlulamReportManagement.dbo.UserAccounts " +
      "where  RetiredDate IS NULL AND " +
			"EmployeeCode = '" +
			request.body.User +
			"' AND Password = '" +
			request.body.Pass +
			"'",
		  (err, result) => {

			  if (err) {
			    console.log(err.message);
			  } else {
          response.send(result.recordset);
          console.log(result.recordset)
			  }
		  }
		  );
    }); 
    // SearchLoginEmp
    router.post("/SearchLoginEmp", (request, response) => {
      let req = new mssql.Request();
      req.query(
        "Select * from wknsql1.WukongGlulamReportManagement.dbo.UserAccounts " +
      "where  RetiredDate IS NULL AND " +
			"EmployeeCode = '" +
			  request.body.PRGetEmp +
        "'",
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          response.send(result.recordset);
        }
      }
    );
  }); 
    // SIGN-UP
    router.post("/SearchEmp", (request, response) => {
        console.log(request.body.PRGetEmp)
        let req = new mssql.Request();
        req.query(
          "Select * from hrdsql.GroupCompanyInformation.dbo.Employees " +
          "where  RetiredDate IS NULL AND CompanyCode = '004' AND " +
          "EmployeeCode = '" +
          request.body.PRGetEmp +
          "'",
        (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            response.send(result.recordset);
          }
        }
      );
    }); 
        // Master Maintenance User
    router.get("/UserAccounts", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * from wknsql1.WukongGlulamReportManagement.dbo.UserAccounts " 
          + "where  RetiredDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.post('/insertInfo',(request,res)=>{
        let req = new mssql.Request();
          req.query("INSERT INTO UserAccounts(EmployeeCode,Password,EmployeeName, UserLevel,CreatedDate,UpdatedDate,UpdatedBy) " + 
          "VALUES('" + request.body.PRInsert.UserID + "'," +
          "'" + request.body.PRInsert.Password + "', '" + request.body.PRInsert.Name + "'," +
          "'" + request.body.PRInsert.UserLevel + "', getdate(), getdate(), "+
          "'" + request.body.PRUpdatedBy + "')" 
          , (err, result) => { 
            if(err){
              res.send(false)
              console.log(err.message)
            } else {
              res.send(true)
              console.log(result)
            }
          }
        ); 
    });    
    router.get("/DeleteHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * from wknsql1.WukongGlulamReportManagement.dbo.UserAccounts " 
          + "where  RetiredDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.post("/UpdateAccounts", (request, response) => {
      console.log(request.body.PRUpdateAccounts)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.UserAccounts " +
            "SET Password = " +
            "'" + request.body.PRUpdateAccounts.Password + "'" +
            ",UserLevel =  " +
            "'" + request.body.PRUpdateAccounts.UserLevel + "'" + 
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "EmployeeCode = '" +
            request.body.PRUpdateAccounts.UserID +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteAccounts", (request, response) => {
      console.log(request.body.PRDeleteAccounts)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.UserAccounts " +
            "SET DeletedDate = getdate() " +
            ",RetiredDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where " +
            "EmployeeCode = '" +
            request.body.PRDeleteAccounts +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedAccounts", (request, response) => {
      console.log(request.body.PRRetrievedAccounts)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.UserAccounts " +
            "SET DeletedDate = NULL " +
            ",RetiredDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where " +
            "EmployeeCode = '" +
            request.body.PRRetrievedAccounts +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    // Master Maintenance Machines
    router.get("/Machines", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Machines " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/MachineHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Machines " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
                  
    router.post("/UpdateMachines", (request, response) => {
      console.log(request.body.PRUpdateMachines)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Machines " +
            "SET MachineName = " +
            "'" + request.body.PRUpdateMachines.Name + "'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "MachineNo = '" +
            request.body.PRUpdateMachines.MachineNo +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteMachines", (request, response) => {
      console.log(request.body.PRDeleteMachines)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Machines " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where MachineNo = '" +
            request.body.PRDeleteMachines +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedMachines", (request, response) => {
      console.log(request.body.PRRetrievedMachines)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Machines " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where MachineNo = '" +
            request.body.PRRetrievedMachines+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertMachines',(request,res)=>{
      console.log(request.body.PRInsertMachines)
        let req = new mssql.Request();
          req.query("EXECUTE dbo.Insert_Machines " + 
          "@PRMachineName = '" + request.body.PRInsertMachines.Name + "'," +
          "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" 
          , (err, result) => { 
            if(err){
              res.send(false)
              console.log(err.message)
            } 
            else {
              res.send(true)
              console.log(result)
            }
          }
        ); 
    });
    // Master Maintenance Sawmills
    router.get("/Sawmills", (request,res) => {
      let req = new mssql.Request();
       req.query(
          "Select * FROM Sawmills " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/SawmillHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Sawmills " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.post("/UpdateSawmills", (request, response) => {
      console.log(request.body.PRUpdateSawmills)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Sawmills " +
            "SET SawmillName = " +
            "'" + request.body.PRUpdateSawmills.Name + "'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "SawmillCode = '" +
            request.body.PRUpdateSawmills.SawmillCode +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteSawmills", (request, response) => {
      console.log(request.body.PRDeleteSawmills)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Sawmills " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SawmillCode = '" +
            request.body.PRDeleteSawmills +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedSawmills", (request, response) => {
      console.log(request.body.PRRetrievedSawmills)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Sawmills " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SawmillCode = '" +
            request.body.PRRetrievedSawmills+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertSawmills',(request,res)=>{
      console.log(request.body.PRInsertSawmills)
        let req = new mssql.Request();
          req.query("INSERT INTO dbo.Sawmills (SawmillCode, SawmillName, CreatedDate, UpdatedDate, UpdatedBy) " + 
            "VALUES ('" + request.body.PRInsertSawmills.SawmillCode + "'," +
            "'" + request.body.PRInsertSawmills.Name + "', getdate(), getdate(), "+
            "'" + request.body.PRUpdatedBy + "')" 
            , (err, result) => { 
              if(err){
                res.send(false)
                console.log(err.message)
              } 
              else {
                res.send(true)
                console.log(result)
              }
            }
          ); 
    });
    // Master Maintenance Species
    router.get("/Species", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Species " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/SpecieHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Species " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
                  
    router.post("/UpdateSpecies", (request, response) => {
      console.log(request.body.PRUpdateSpecies)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Species " +
            "SET SpecieName = " +
            "'" + request.body.PRUpdateSpecies.Name + "'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "SpecieID = '" +
            request.body.PRUpdateSpecies.SpecieID +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteSpecies", (request, response) => {
      console.log(request.body.PRDeleteSpecies)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Species " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SpecieID = '" +
            request.body.PRDeleteSpecies +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedSpecies", (request, response) => {
      console.log(request.body.PRRetrievedSpecies)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Species " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SpecieID = '" +
            request.body.PRRetrievedSpecies+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertSpecies',(request,res)=>{
      console.log(request.body.PRInsertSpecies)
        let req = new mssql.Request();
          req.query("EXECUTE dbo.Insert_Species " + 
          "@PRSpecieName = '" + request.body.PRInsertSpecies.Name + "'," +
          "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" 
          , (err, result) => { 
            if(err){
              res.send(false)
              console.log(err.message)
            } 
            else {
              res.send(true)
              console.log(result)
            }
          }
        ); 
    });
    // Master Maintenance Suppliers
    router.get("/Suppliers", (request,res) => {
      let req = new mssql.Request();
       req.query(
          "Select * FROM Suppliers " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/SupplierHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM Suppliers " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.post("/UpdateSuppliers", (request, response) => {
      console.log(request.body.PRUpdateSuppliers)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Suppliers " +
            "SET SupplierName = " +
            "'" + request.body.PRUpdateSuppliers.Name + "'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "SupplierCode = '" +
            request.body.PRUpdateSuppliers.SupplierCode +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteSuppliers", (request, response) => {
      console.log(request.body.PRDeleteSuppliers)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Suppliers " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SupplierCode = '" +
            request.body.PRDeleteSuppliers +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedSuppliers", (request, response) => {
      console.log(request.body.PRRetrievedSuppliers)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.Suppliers " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where SupplierCode = '" +
            request.body.PRRetrievedSuppliers+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertSuppliers',(request,res)=>{
      console.log(request.body.PRInsertSuppliers)
        let req = new mssql.Request();
          req.query("INSERT INTO dbo.Suppliers (SupplierCode, SupplierName, CreatedDate, UpdatedDate, UpdatedBy) " + 
            "VALUES ('" + request.body.PRInsertSuppliers.SupplierCode + "'," +
            "'" + request.body.PRInsertSuppliers.Name + "', getdate(), getdate(), "+
            "'" + request.body.PRUpdatedBy + "')" 
            , (err, result) => { 
              if(err){
                res.send(false)
                console.log(err.message)
              } 
              else {
                res.send(true)
                console.log(result)
              }
            }
          ); 
    });
    // Master Maintenance BreakdownTypes
    router.get("/BreakdownTypes", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM BreakdownTypes " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/BreakdownTypeHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM BreakdownTypes " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.post("/UpdateBreakdownTypes", (request, response) => {
      console.log(request.body.PRUpdateBreakdownTypes)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.BreakdownTypes " +
            "SET BreakdownTypeName = " +
            "'" + request.body.PRUpdateBreakdownTypes.Name + "'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "BreakdownTypeID = '" +
            request.body.PRUpdateBreakdownTypes.BreakdownTypeID +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteBreakdownTypes", (request, response) => {
      console.log(request.body.PRDeleteBreakdownTypes)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.BreakdownTypes " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where BreakdownTypeID = '" +
            request.body.PRDeleteBreakdownTypes +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedBreakdownTypes", (request, response) => {
      console.log(request.body.PRRetrievedBreakdownTypes)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.BreakdownTypes " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where BreakdownTypeID = '" +
            request.body.PRRetrievedBreakdownTypes+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertBreakdownTypes',(request,res)=>{
      console.log(request.body.PRInsertBreakdownTypes)
        let req = new mssql.Request();
          req.query("EXECUTE dbo.Insert_BreakdownTypes " + 
          "@PRBreakdownTypeName = '" + request.body.PRInsertBreakdownTypes.Name + "'," +
          "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" 
          , (err, result) => { 
            if(err){
              res.send(false)
              console.log(err.message)
            } 
            else {
              res.send(true)
              console.log(result)
            }
          }
        ); 
    });
    // Master Maintenance ShiftSchedules
    router.get("/ShiftSchedules", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM ShiftSchedules " 
          + "where  DeletedDate IS NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    }); 
    router.get("/ShiftScheduleHistory", (request,res) => {
      let req = new mssql.Request();
        req.query(
          "Select * FROM ShiftSchedules " 
          + "where  DeletedDate IS NOT NULL " 
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.post("/UpdateShiftSchedules", (request, response) => {
      console.log(request.body.PRUpdateShiftSchedules)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.ShiftSchedules " +
            "SET ShiftName = " +
            "'" + request.body.PRUpdateShiftSchedules.Name + "'" +
            ",ShiftTime = " +
            "'" + request.body.PRUpdateShiftSchedules.TimeStart + "H - " + 
            request.body.PRUpdateShiftSchedules.TimeEnd + "H'" +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = " +
            "'" + request.body.PRUpdatedBy + "'" + 
            "where " +
            "ShiftID = '" +
            request.body.PRUpdateShiftSchedules.ShiftID +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/DeleteShiftSchedules", (request, response) => {
      console.log(request.body.PRDeleteShiftSchedules)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.ShiftSchedules " +
            "SET DeletedDate = getdate() " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where ShiftID = '" +
            request.body.PRDeleteShiftSchedules +
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post("/RetrievedShiftSchedules", (request, response) => {
      console.log(request.body.PRRetrievedShiftSchedules)
        let req = new mssql.Request();
          req.query(
            "UPDATE dbo.ShiftSchedules " +
            "SET DeletedDate = NULL " +
            ",UpdatedDate = getdate() " +
            ",UpdatedBy = '" + request.body.PRUpdatedBy + "'" +
            "where ShiftID = '" +
            request.body.PRRetrievedShiftSchedules+
            "'", 
            (err, result) => {
              if (err) {
                response.send(false)
                console.log(err.message);
              } else {
                response.send(true)
                console.log(result)
              }
            }
          );
    }); 
    router.post('/InsertShiftSchedules',(request,res)=>{
      console.log(request.body.PRInsertShiftSchedules)
        let req = new mssql.Request();
          req.query("EXECUTE dbo.Insert_ShiftSchedules " + 
          "@PRShiftName = '" + request.body.PRInsertShiftSchedules.Name + "'," +
          "@PRShiftTime = " +
          "'" + request.body.PRInsertShiftSchedules.TimeStart + "H - " + 
          request.body.PRInsertShiftSchedules.TimeEnd + "H'," +
          "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" 
          , (err, result) => { 
            if(err){
              res.send(false)
              console.log(err.message)
            } 
            else {
              res.send(true)
              console.log(result)
            }
          }
        ); 
    });
    // NF019-00Entry Combo box 
    router.get('/Machine',(request,res)=>{
      let req = new mssql.Request();
        req.query(
          "SELECT MachineNo,MachineName FROM Machines where DeletedDate IS NULL"
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.get('/Shift',(request,res)=>{
      let req = new mssql.Request();
        req.query(
          "SELECT ShiftID,ShiftName,ShiftTime FROM ShiftSchedules where DeletedDate IS NULL"
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              res.send(result.recordset);
            }
          }
        ); 
    });

    // NF019-00Entry Table
    router.get('/MSR',(request,res)=>{
      let req = new mssql.Request();
        req.query(
          "SELECT M.MachineNo,M.MachineName,MH.MSRDate,MH.ShiftID,SS.ShiftName,MH.OutputPieces,MH.OperatorCode,UAO.EmployeeName AS Operator, " +
          "UAL.EmployeeName AS Leader FROM MSRHeaders MH " +
          "INNER JOIN Machines M ON MH.MachineNo = M.MachineNo " +
          "INNER JOIN ShiftSchedules SS ON MH.ShiftID = SS.ShiftID " +
          "LEFT JOIN UserAccounts UAO ON MH.OperatorCode = UAO.EmployeeCode " +
          "LEFT JOIN UserAccounts UAL ON MH.LeaderCode = UAL.EmployeeCode"
          , (err, result) => { 
            if(err){
              console.log(err.message)
            } else {
              // console.log(result.recordset)
              res.send(result.recordset);
            }
          }
        ); 
    });
    router.post("/GetOperatorName", (request, response) => {
      // console.log(request.body.PRGetAccounts)
        let req = new mssql.Request();
          req.query(
            "SELECT * FROM dbo.UserAccounts " +
            "where  RetiredDate IS NULL AND UserLevel = 'Operator' AND " +
            "EmployeeCode = '" +
            request.body.PRGetOperator +
            "'",
            (err, result) => {
              if (err) {
                  console.log(err.message);
              } else {
                  response.send(result.recordset);
              }
            }
          );
    });
    router.post("/GetLeaderName", (request, response) => {
      // console.log(request.body.PRGetAccounts)
        let req = new mssql.Request();
          req.query(
            "SELECT * FROM dbo.UserAccounts " +
            "where  RetiredDate IS NULL AND UserLevel = 'Leader' AND " +
            "EmployeeCode = '" +
            request.body.PRGetLeader +
            "'",
            (err, result) => {
              if (err) {
                  console.log(err.message);
              } else {
                  response.send(result.recordset);
              }
            }
          );
    });
    router.get("/SelectOperatorName", (request, response) => {
        let req = new mssql.Request();
          req.query(
            "SELECT * FROM dbo.UserAccounts " +
            "where  RetiredDate IS NULL AND UserLevel = 'Operator'",
            (err, result) => {
              if (err) {
                  console.log(err.message);
              } else {
                  response.send(result.recordset);
              }
            }
          );
    });
    router.get("/SelectLeaderName", (request, response) => {
        let req = new mssql.Request();
          req.query(
            "SELECT * FROM dbo.UserAccounts " +
            "where  RetiredDate IS NULL AND UserLevel = 'Leader'",
            (err, result) => {
              if (err) {
                  console.log(err.message);
              } else {
                  response.send(result.recordset);
              }
            }
          );
    });
    router.post('/insertEntry',(request,res)=>{
      var OperatorID = request.body.PRInsertEntry.OperatorID.toString(7)
      var LeaderID = request.body.PRInsertEntry.LeaderID.toString(7)
        // console.log(request.body.PRInsertEntry)
        let req = new mssql.Request();
          req.query("INSERT INTO dbo.MSRHeaders (MachineNo, MSRDate, ShiftID,OutputPieces, OperatorCode,LeaderCode, CreatedDate, UpdatedDate,UpdatedBy ) " + 
            "VALUES('" + request.body.PRInsertEntry.MachineNo + "'," +
            "'" + request.body.PRInsertEntry.MSRDate + "', " + request.body.PRInsertEntry.Shift + ", " +
            "" + 0 + ", '" + OperatorID + "', '" + LeaderID + "', " +
            "getdate(), getdate(), "+
            "'" + request.body.PRUpdatedBy + "')"
            , (err, result) => { 
              if(err){
                res.send(false)
                console.log(err.message)
              } else {   
                res.send(true) 
                console.log(result)
              }
            }
          ); 
    });
    // combo box MachineBreakdownEntry
    router.get('/BreakdownTypes',(request,res)=>{
      let req = new mssql.Request();
        req.query(
          "SELECT BreakdownTypeID,BreakdownTypeName FROM BreakdownTypes where DeletedDate IS NULL"
            , (err, result) => { 
              if(err){
                console.log(err.message)
              } else {
                res.send(result.recordset);
              }
            }
        ); 
    });
    // MachineBreakdownEntry
    router.post('/insertBreakdown',(request,res)=>{
        let req = new mssql.Request();
          req.query("INSERT INTO MachineBreakdowns(MachineNo,MSRDate,ShiftID,BreakdownTypeID,Time,StartTime,EndTime,Details,ActionTaken,ReportedBy,CreatedDate,UpdatedDate,UpdatedBy) " + 
          "VALUES('" + request.body.PRInsertBreakdown.MachineNo + "'," +
          "'" + request.body.PRInsertBreakdown.MSRDate + "'," +
          "'" + request.body.PRShiftID + "', " +
          "'" + request.body.PRInsertBreakdown.Type + "', " +
          "'" + request.body.PRInsertBreakdown.Time + "', " +
          "'" + request.body.PRInsertBreakdown.Start + "', " +
          "'" + request.body.PRInsertBreakdown.End + "', " + 
          "'" + request.body.PRInsertBreakdown.Details + "', " + 
          "'" + request.body.PRInsertBreakdown.Action + "', " + 
          "'" + request.body.PRInsertBreakdown.ReportedBy + "', " +
          " getdate() , getdate(), " + 
          "'" + request.body.PRUpdatedBy + "')"
          , (err, result) => { 
            if(err){
              res.send(false)
                console.log(err.message)
              } else {
                res.send(true)
                console.log(result)
              }
            }
          ); 
    });

    // Rena
    router.post("/ShiftTime", (request, response) => {
        let req = new mssql.Request();
          req.query(
            "Select ShiftTime FROM ShiftSchedules "  +
            "where  DeletedDate IS NULL AND " +
            "ShiftName = '" +
            request.body.PRShiftName +
            "'",
            (err, result) => {
              if (err) {
                  console.log(err.message);
              } else {
                  response.send(result.recordset);
              }
            }
          );
    });
     // Reynan
    router.get("/generateEntrySupplier", (request, response) => {
      sql.connect(config, function (err) {
      if (err) console.log(err);
      var strSql = new sql.Request(); 
      strSql.query(
        "SELECT * FROM wknsql1.WukongGlulamReportManagement.dbo.Suppliers WHERE DeletedDate IS NULL",
        (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            response.send(result.recordset);
          }
         })
        })
      }); 
  
    router.get("/generateEntrySpecie", (request, response) => {
      sql.connect(config, function (err) {
        if (err) console.log(err);
        var strSql = new sql.Request(); 
        strSql.query(
          "SELECT * FROM wknsql1.WukongGlulamReportManagement.dbo.Species WHERE DeletedDate IS NULL",
          (err, result) => {
            if (err) {
              console.log(err.message);
            } else {
              response.send(result.recordset);
            }
          })
      })
     }); 
  
    router.get("/generateSawmills", (request, response) => {
      sql.connect(config, function (err) {
        if (err) console.log(err);
        var strSql = new sql.Request(); 
        strSql.query(
          "SELECT * FROM wknsql1.WukongGlulamReportManagement.dbo.Sawmills WHERE DeletedDate IS NULL",
          (err, result) => {
            if (err) {
              console.log(err.message);
            } else {
              response.send(result.recordset);
            }
          })
      })
      }); 
      router.post("/generateMSRDetails", (request, response) => {
        sql.connect(config, function (err) {
          if (err) console.log(err);
          var strSql = new sql.Request(); 
          strSql.query(
            "SELECT MD.MachineNo, MD.MSRDate,MD.ShiftID,MD.MSRSequence, " +
            "MD.Batch,MD.PressureGauge1,MD.PressureGauge2,MD.DeflectionLoadMeter1,MD.DeflectionLoadMeter2, " +
            "MD.FactorA,MD.FactorB,MD.Height,MD.Width,MD.Length,MD.SpecieID,S.SpecieName,MD.SupplierCode,SP.SupplierName, " +
            "MD.SawmillCode,SM.SawmillName,MD.Total,MD.Below,MD.L60,MD.L70,MD.L80,MD.L90,MD.L100,MD.L110,MD.L125, " +
            "MD.L140,MD.L160,MD.L180,MD.L200 " +
            "FROM wknsql1.WukongGlulamReportManagement.dbo.MSRDetails MD " +
            "left join wknsql1.WukongGlulamReportManagement.dbo.Species S " +
            "on MD.SpecieID = S.SpecieID  " +
            "left join wknsql1.WukongGlulamReportManagement.dbo.Sawmills SM " +
            "on MD.SawmillCode = SM.SawmillCode  " +
            "left join wknsql1.WukongGlulamReportManagement.dbo.Suppliers SP " +
            "on MD.SupplierCode = SP.SupplierCode " +
            "WHERE MD.DeletedDate IS NULL " +
            "AND MD.MachineNo = '" + request.body.PRMSRDetails.MachineNo + "' " +
            "AND MD.MSRDate = '" + request.body.PRMSRDate + " 0:00:00' " +
            "AND MD.ShiftID = " + request.body.PRMSRDetails.ShiftID +
            "ORDER BY MD.CreatedDate ASC",
              (err, result) => {
                if (err) {
                  console.log(err.message);
                } else {
                  response.send(result.recordset);
                }
              })
        })
      }); 
      router.post("/getMachineBreakdown", (request, response) => {
        sql.connect(config, function (err) {
        if (err) console.log(err);
        var strSql = new sql.Request(); 
        strSql.query(
          "SELECT * FROM MachineBreakdowns MB, BreakdownTypes BT " +
          "WHERE MB.BreakdownTypeID = BT.BreakdownTypeID	" +
          "AND MB.MachineNo = '"+ request.body.PRBreakdowns.MachineNo + "' " +
          "AND MB.MSRDate = '"+ request.body.PRBreakdownDate + " 0:00:00' " +
          "AND MB.ShiftID = "+ request.body.PRBreakdowns.ShiftID,
          (err, result) => {
            if (err) {
              console.log(err.message);
            } else {
              response.send(result.recordset);
            }
           })
          })
        }); 
      router.post("/computeTotalCountMonitoring", (request, response) => {
        sql.connect(config, function (err) {
        if (err) console.log(err);
        var strSql = new sql.Request(); 
        strSql.query(
          "SELECT sum(total) AS Total, " +
          "sum(below) AS Below, " +
          "sum(L60) AS L60,  " +
          "sum(L70) AS L70, " +
          "sum(L80) AS L80, " +
          "sum(L90) AS L90, " +
          "sum(L100) AS L100, " +
          "sum(L110) AS L110, " +
          "sum(L125) AS L125,  " +
          "sum(L140) AS L140,  " +
          "sum(L160) AS L160, " +
          "sum(L180) AS L180, " +
          "sum(L200) AS L200 " +
          "FROM MSRDetails MD where MD.DeletedDate is NULL " +
          "AND MD.MachineNo = '"+ request.body.PRTotalCount.MachineNo + "' " +
          "AND MD.MSRDate = '"+ request.body.PRTotalCountDate + " 0:00:00' " +
          "AND MD.ShiftID = "+ request.body.PRTotalCount.ShiftID,
          (err, result) => {
            if (err) {
              console.log(err.message);
            } else {
              response.send(result.recordset);
            }
           })
          })
        }); 
        
    router.post("/insertBatchEntry", (request, response) => {
      // console.log(request.body.PRinsertParams)
        sql.connect(config, function (err) {
        if (err) console.log(err);
        var strSql = new sql.Request(); 
        strSql.query(
        "EXECUTE dbo.Insert_MSRDetails " +
	      "@PRMachineNo = " + "'" + request.body.PRMachine + "', " +
        "@PRMSRDate = " + "'" + request.body.PRMSRDate + "', " +
        "@PRShiftID = " + request.body.PRShift + ", " +
        "@PRHeight = " + request.body.PRinsertParams.inH + ", " +
        "@PRWidth = " + request.body.PRinsertParams.inW + ", " +
        "@PRLength = " + request.body.PRinsertParams.inL + ", " +
        "@PRSpecieID = " + request.body.PRinsertParams.cmbSpecie + ", " +
        "@PRTotal = " + request.body.PRinsertParams.tvTotal + ", " +
        "@PRSupplierCode = " + "'" + request.body.PRinsertParams.cmbSupCD + "', " +
        "@PRSawmillCode = " + "'" + request.body.PRinsertParams.cmbSawCD + "', " +
        "@PRBelow = " + request.body.PRinsertParams.inBelow + ", " +
        "@PRL60 = " + request.body.PRinsertParams.inL60 + ", " +
        "@PRL70 = " + request.body.PRinsertParams.inL70 + ", " +
        "@PRL80 = " + request.body.PRinsertParams.inL80 + ", " +
        "@PRL90 = " + request.body.PRinsertParams.inL90 + ", " +
        "@PRL100 = " + request.body.PRinsertParams.inL100 + ", " +
        "@PRL110 = " + request.body.PRinsertParams.inL110 + ", " +
        "@PRL125 = " + request.body.PRinsertParams.inL125 + ", " +
        "@PRL140 = " + request.body.PRinsertParams.inL140 + ", " +
        "@PRL160 = " + request.body.PRinsertParams.inL160 + ", " +
        "@PRL180 = " + request.body.PRinsertParams.inL180 + ", " +
        "@PRL200 = " + request.body.PRinsertParams.inL200 + ", " +
        "@PRPressureGauge1 = " + request.body.PRinsertParams.inGauge1 + ", " +
        "@PRPressureGauge2 = " + request.body.PRinsertParams.inGauge2 + ", " +
        "@PRDeflectionLoadMeter1 = " + request.body.PRinsertParams.inMeter1 + ", " +
        "@PRDeflectionLoadMeter2 = " + request.body.PRinsertParams.inMeter2 + ", " +
        "@PRFactorA = " + request.body.PRinsertParams.inA + ", " +
        "@PRFactorB = " + request.body.PRinsertParams.inB + ", " +
        "@PRUpdatedBy = " + "'" + request.body.PRUpdatedBy + "'" ,
          (err, result) => {
            console.log(result);

            if (err) {
              response.send(false);
              console.log(err.message);
            } else {
              response.send(true);
              console.log(response.recordset)
            }
           })
          })
      }); 
      router.post("/UpdateBatch", (request, response) => {
        // console.log(request.body.PReditParams)
        // console.log(request.body.PReditParams[0].Height , "-",request.body.PReditParams[0].Width,"-",request.body.PReditParams[0].Length )
          let req = new mssql.Request();
            req.query(
              "EXECUTE dbo.Update_MSRDetails " +
              "@PRMachineNo = '" + request.body.PRMachine + "', " + 
              "@PRMSRDate = '" + request.body.PRMSRDate + "', "+
              "@PRShiftID = " + request.body.PRShift + ", " +
              "@PRMSRSequence = " + request.body.PReditParams[0].MSRSequence + ", " + 
              "@PRHeight = " + request.body.PReditParams[0].Height + ", " +
              "@PRWidth = " + request.body.PReditParams[0].Width + ", " +
              "@PRLength = " + request.body.PReditParams[0].Length + ", " +
              "@PRSpecieID = " + request.body.PReditParams[0].SpecieID + ", " +
              "@PRTotal = " + request.body.PReditParams[0].Total + ", " +
              "@PRSupplierCode = '" + request.body.PReditParams[0].SupplierCode + "', " +
              "@PRSawmillCode = '" + request.body.PReditParams[0].SawmillCode + "', " +
              "@PRBelow = " + request.body.PReditParams[0].Below + ", " +
              "@PRL60 = " + request.body.PReditParams[0].L60 + ", " +
              "@PRL70 = " + request.body.PReditParams[0].L70 + ", " +
              "@PRL80 = " + request.body.PReditParams[0].L80 + ", " +
              "@PRL90 = " + request.body.PReditParams[0].L90 + ", " +
              "@PRL100 = " + request.body.PReditParams[0].L100 + ", " +
              "@PRL110 = " + request.body.PReditParams[0].L110 + ", " +
              "@PRL125 = " + request.body.PReditParams[0].L125 + ", " +
              "@PRL140 = " + request.body.PReditParams[0].L140 + ", " +
              "@PRL160 = " + request.body.PReditParams[0].L160 + ", " +
              "@PRL180 = " + request.body.PReditParams[0].L180 + ", " +
              "@PRL200 = " + request.body.PReditParams[0].L200 + ", " +
              "@PRPressureGauge1 = " + request.body.PReditParams[0].PressureGauge1 + ", " +
              "@PRPressureGauge2 = " + request.body.PReditParams[0].PressureGauge2 + ", " +
              "@PRDeflectionLoadMeter1 = " + request.body.PReditParams[0].DeflectionLoadMeter1 + ", " +
              "@PRDeflectionLoadMeter2 = " + request.body.PReditParams[0].DeflectionLoadMeter2 + ", " +
              "@PRFactorA = " + request.body.PReditParams[0].FactorA + ", " +
              "@PRFactorB = " + request.body.PReditParams[0].FactorB + ", " +
              "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" ,
              (err, result) => {
                if (err) {
                  response.send(false)
                  console.log(err.message);
                } else {
                  response.send(true)
                  console.log(result)
                }
              }
            );
      }); 
      // TOLERANCE PAGE
      router.post("/getTotalBreakdown", (request, response) => {
        sql.connect(config, function (err) {
          if (err) console.log(err);
            var strSql = new sql.Request(); 
              strSql.query(
              " SELECT count(*) AS TotalBreakdown FROM MachineBreakdowns " +
              "WHERE " +
              "MachineNo = '"+ request.body.PRTotal.MachineNo + "' " +
              "AND MSRDate = '"+ request.body.PRTotalDate + " 0:00:00' " +
              "AND ShiftID = "+ request.body.PRTotal.ShiftID, 
                (err, result) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    //console.log(result.recordset);
                    response.send(result.recordset);
                  }
               })
        })
      }); 
      router.post("/getResult", (request, response) => {
        sql.connect(config, function (err) {
          if (err) console.log(err);
            var strSql = new sql.Request(); 
              strSql.query(
                "EXECUTE dbo.GetResult @PRMachineNo =  '"+ request.body.PRResult.MachineNo + "', " +
                "@PRMSRDate = '"+ request.body.PRResultDate + " 0:00:00', " +
                "@PRShiftID = "+ request.body.PRResult.ShiftID, 
              // "SELECT ROUND(Max(Total) / Min(Total),2) AS Result FROM ToleranceDetails " +
              // "MachineNo = '"+ request.body.PRResult.MachineNo + "' " +
              // "AND MSRDate = '"+ request.body.PRResultDate + " 0:00:00' " +
              // "AND ShiftID = "+ request.body.PRResult.ShiftID, 
                (err, result) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    // console.log(result.recordset);
                    response.send(result.recordset);
                  }
               })
        })
      }); 
    router.post("/getToleranceDetails", (request, response) => {
      sql.connect(config, function (err) {
        if (err) console.log(err);
          var strSql = new sql.Request(); 
            strSql.query(
              "SELECT TD.MachineNo, TD.MSRDate,TD.ShiftID,TD.MSRSequence, " +
              "TD.Batch,TD.PressureGauge1,TD.PressureGauge2,TD.DeflectionLoadMeter1,TD.DeflectionLoadMeter2, " +
              "TD.FactorA,TD.FactorB,TD.Height,TD.Width,TD.Length,TD.SpecieID,S.SpecieName,TD.SupplierCode,SP.SupplierName, " +
              "TD.SawmillCode,SM.SawmillName,TD.Total,TD.Below,TD.L60,TD.L70,TD.L80,TD.L90,TD.L100,TD.L110,TD.L125, " +
              "TD.L140,TD.L160,TD.L180,TD.L200 " +
              "FROM wknsql1.WukongGlulamReportManagement.dbo.ToleranceDetails TD " +
              "left join wknsql1.WukongGlulamReportManagement.dbo.Species S " +
              "on TD.SpecieID = S.SpecieID  " +
              "left join wknsql1.WukongGlulamReportManagement.dbo.Sawmills SM " +
              "on TD.SawmillCode = SM.SawmillCode  " +
              "left join wknsql1.WukongGlulamReportManagement.dbo.Suppliers SP " +
              "on TD.SupplierCode = SP.SupplierCode " +
              "WHERE TD.DeletedDate IS NULL " +
              "AND TD.MachineNo = '"+ request.body.PRTolerance.MachineNo + "' " +
              "AND TD.MSRDate = '"+ request.body.PRMSRDate + " 0:00:00' " +
              "AND TD.ShiftID = "+ request.body.PRTolerance.ShiftID ,
              (err, result) => {
                //console.log(result.recordset);
                if (err) {
                  console.log(err.message);
                } else {
                  // console.log(result.recordset);
                  response.send(result.recordset);
                }
              })
        })
    }); 
    router.post("/TotalTolerance", (request, response) => {
      sql.connect(config, function (err) {
      if (err) console.log(err);
      var strSql = new sql.Request(); 
      strSql.query(
        "SELECT " +
        "(SELECT CASE " +
        "WHEN sum(Total) <> 0 then Round(Max(Total) / Min(Total),2) " +
        "ELSE 0 END AS Total) Total, " +
        "(SELECT CASE " +
        "WHEN sum(Below) <> 0 then Round(Max(Below) / Min(Below),2) " +
        "ELSE 0 END AS Below) Below, " +
        "(SELECT CASE " +
        "WHEN sum(L60) <> 0 then Round(Max(L60) / Min(L60),2) " +
        "ELSE 0 END AS L60) L60, " +
        "(SELECT CASE " +
        "WHEN sum(L70) <> 0 then Round(Max(L70) / Min(L70),2) " + 
        "ELSE 0 END AS L70) L70, " + 
        "(SELECT CASE " + 
        "WHEN sum(L80) <> 0 then Round(Max(L80) / Min(L80),2)  " + 
        "ELSE 0 END AS L80) L80,  " + 
        "(SELECT CASE " + 
        "WHEN sum(L90) <> 0 then Round(Max(L90) / Min(L90),2) " + 
        "ELSE 0 END AS L90) L90,  " + 
        "(SELECT CASE " + 
        "WHEN sum(L100) <> 0 then Round(Max(L100) / Min(L100),2) " +  
        "ELSE 0 END AS L100) L100, " + 
        "(SELECT CASE " +  
        "WHEN sum(L110) <> 0 then Round(Max(L110) / Min(L110),2) " + 
        "ELSE 0 END AS L110) L110, " + 
        "(SELECT CASE " +  
        "WHEN sum(L125) <> 0 then Round(Max(L125) / Min(L125),2) " + 
        "ELSE 0 END AS L125) L125, " + 
        "(SELECT CASE " +  
        "WHEN sum(L140) <> 0 then Round(Max(L140) / Min(L140),2) " +  
        "ELSE 0 END AS L140) L140, " + 
        "(SELECT CASE " +  
        "WHEN sum(L160) <> 0 then Round(Max(L160) / Min(L160),2) " +  
        "ELSE 0 END AS L160) L160, " + 
        "(SELECT CASE " +  
        "WHEN sum(L180) <> 0 then Round(Max(L180) / Min(L180),2) " + 
        "ELSE 0 END AS L180) L180, " + 
        "(SELECT CASE " +  
        "WHEN sum(L200) <> 0 then Round(Max(L200) / Min(L200),2) " + 
        "ELSE 0 END AS L200) L200 " + 
        "FROM ToleranceDetails TD where TD.DeletedDate is NULL " +
        "AND TD.MachineNo = '"+ request.body.PRTotalCount.MachineNo + "' " +
        "AND TD.MSRDate = '"+ request.body.PRTotalCountDate + " 0:00:00' " +
        "AND TD.ShiftID = "+ request.body.PRTotalCount.ShiftID,
        (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            //console.log(result.recordset);
            response.send(result.recordset);
          }
         })
        })
      }); 
      
    router.post("/insertToleranceEntry", (request, response) => {
      // console.log(request.body.PRinsertParams)
          sql.connect(config, function (err) {
          if (err) console.log(err);
          var strSql = new sql.Request(); 
          strSql.query(
            "EXECUTE dbo.Insert_ToleranceDetails " +
            "@PRMachineNo = " + "'" + request.body.PRMachine + "', " +
            "@PRMSRDate = " + "'" + request.body.PRMSRDate + "', " +
            "@PRShiftID = " + request.body.PRShift + ", " +
            "@PRHeight = " + request.body.PRinsertParams.inTH + ", " +
            "@PRWidth = " + request.body.PRinsertParams.inTW + ", " +
            "@PRLength = " + request.body.PRinsertParams.inTL + ", " +
            "@PRSpecieID = " + request.body.PRinsertParams.cmbTSpecie + ", " +
            "@PRTotal = " + request.body.PRinsertParams.tvTTotal  + ", " +
            "@PRSupplierCode = " + "'" + request.body.PRinsertParams.cmbTSupCD + "', " +
            "@PRSawmillCode = " + "'" + request.body.PRinsertParams.cmbTSawCD + "', " +
            "@PRBelow = " + request.body.PRinsertParams.inTBelow + ", " +
            "@PRL60 = " + request.body.PRinsertParams.inTL60 + ", " +
            "@PRL70 = " + request.body.PRinsertParams.inTL70 + ", " +
            "@PRL80 = " + request.body.PRinsertParams.inTL80 + ", " +
            "@PRL90 = " + request.body.PRinsertParams.inTL90 + ", " +
            "@PRL100 = " + request.body.PRinsertParams.inTL100 + ", " +
            "@PRL110 = " + request.body.PRinsertParams.inTL110 + ", " +
            "@PRL125 = " + request.body.PRinsertParams.inTL125 + ", " +
            "@PRL140 = " + request.body.PRinsertParams.inTL140 + ", " +
            "@PRL160 = " + request.body.PRinsertParams.inTL160 + ", " +
            "@PRL180 = " + request.body.PRinsertParams.inTL180 + ", " +
            "@PRL200 = " + request.body.PRinsertParams.inTL200 + ", " +
            "@PRPressureGauge1 = " + request.body.PRinsertParams.inTGauge1 + ", " +
            "@PRPressureGauge2 = " + request.body.PRinsertParams.inTGauge2 + ", " +
            "@PRDeflectionLoadMeter1 = " + request.body.PRinsertParams.inTGauge1 + ", " +
            "@PRDeflectionLoadMeter2 = " + request.body.PRinsertParams.inTGauge2 + ", " +
            "@PRFactorA = " + request.body.PRinsertParams.inTA + ", " +
            "@PRFactorB = " + request.body.PRinsertParams.inTB + ", " +
            "@PRUpdatedBy = " + "'" + request.body.PRUpdatedBy + "'" ,
            (err, result) => {
              if (err) {
                response.send(false);
                console.log(err.message);
              } else {
                response.send(true);
                //console.log(response.recordset)
              }
             })
            })
    }); 
    router.post("/UpdateTolerance", (request, response) => {
          sql.connect(config, function (err) {
          strSql.query(
            "EXECUTE dbo.Update_ToleranceDetails " +
              "@PRMachineNo = '" + request.body.PRMachine + "', " + 
              "@PRMSRDate = '" + request.body.PRMSRDate + "', "+
              "@PRShiftID = " + request.body.PRShift + ", " +
              "@PRMSRSequence = " + request.body.PReditParams[0].MSRSequence + ", " + 
              "@PRHeight = " + request.body.PReditParams[0].Height + ", " +
              "@PRWidth = " + request.body.PReditParams[0].Width + ", " +
              "@PRLength = " + request.body.PReditParams[0].Length + ", " +
              "@PRSpecieID = " + request.body.PReditParams[0].SpecieID + ", " +
              "@PRTotal = " + request.body.PReditParams[0].Total + ", " +
              "@PRSupplierCode = '" + request.body.PReditParams[0].SupplierCode + "', " +
              "@PRSawmillCode = '" + request.body.PReditParams[0].SawmillCode + "', " +
              "@PRBelow = " + request.body.PReditParams[0].Below + ", " +
              "@PRL60 = " + request.body.PReditParams[0].L60 + ", " +
              "@PRL70 = " + request.body.PReditParams[0].L70 + ", " +
              "@PRL80 = " + request.body.PReditParams[0].L80 + ", " +
              "@PRL90 = " + request.body.PReditParams[0].L90 + ", " +
              "@PRL100 = " + request.body.PReditParams[0].L100 + ", " +
              "@PRL110 = " + request.body.PReditParams[0].L110 + ", " +
              "@PRL125 = " + request.body.PReditParams[0].L125 + ", " +
              "@PRL140 = " + request.body.PReditParams[0].L140 + ", " +
              "@PRL160 = " + request.body.PReditParams[0].L160 + ", " +
              "@PRL180 = " + request.body.PReditParams[0].L180 + ", " +
              "@PRL200 = " + request.body.PReditParams[0].L200 + ", " +
              "@PRPressureGauge1 = " + request.body.PReditParams[0].PressureGauge1 + ", " +
              "@PRPressureGauge2 = " + request.body.PReditParams[0].PressureGauge2 + ", " +
              "@PRDeflectionLoadMeter1 = " + request.body.PReditParams[0].DeflectionLoadMeter1 + ", " +
              "@PRDeflectionLoadMeter2 = " + request.body.PReditParams[0].DeflectionLoadMeter2 + ", " +
              "@PRFactorA = " + request.body.PReditParams[0].FactorA + ", " +
              "@PRFactorB = " + request.body.PReditParams[0].FactorB + ", " +
              "@PRUpdatedBy = '" + request.body.PRUpdatedBy + "'" ,
            (err, result) => {
              if (err) {
                response.send(false);
                console.log(err.message);
              } else {
                response.send(true);
                //console.log(response.recordset)
              }
             })
            })
    }); 
    // CountTotalTolerancePerMachine
    router.post("/CountTotal", (request, response) => {
      let req = new mssql.Request();
      req.query(
      "SELECT count(MachineNo) AS TotalPerMachine FROM ToleranceDetails " +
      "WHERE MachineNo = '" + request.body.PRCountTotalMachineNo + "'" +
      "AND MSRDate = '" + request.body.PRCountTotalMSRDate + "'" +
      "AND ShiftID = " + request.body.PRCountTotalShiftID + ""
      ,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          response.send(result.recordset);
        }
      }
    );
  }); 

// ==========================EXPORT TO EXCEL========================

var Excel = require('exceljs');
var workbook = new Excel.Workbook();

///////MRSOutputReport
router.post("/MRSOutputReport", (req, res) => {

  workbook.xlsx.readFile('temp/MRSOutputReportTemp.xlsx').then(function() {
    // var ClearRows=13
    // var ClearCols=27

    // ///COPY WORKSHEET
    // var ws1 = workbook.getWorksheet(1);
    // let copySheet = workbook.addWorksheet ('test');
  
    // copySheet.model = Object.assign(ws1.model, {
    //   mergeCells: ws1.model.merges
    // });
    // copySheet.name = 'new demo';

    // //CLEAR CELLS
    // for(var a=13;a<ClearRows+10;a++)
    // {
    //   for(var b=1;b<ClearCols;b++)
    //   {
    //     clearRow=copySheet.getRow(a);
    //     clearRow.getCell(b).value='';
    //   }
    // }
    // //END CLEAR

    var colsel =12
    var worksheet = workbook.getWorksheet(1);
    var row = worksheet.getRow(2);
    
    row.getCell(colsel).value = 'reynan'; // A5's value set to 5
    row.commit();

    // SAVE TEMPLATE
      workbook.xlsx.writeFile('temp/MRSOutputReportTemp_TEST.xlsx').then(()=>{                 
        const myPath = '../../temp/MRSOutputReportTemp_TEST.xlsx'
        res.send(myPath)
      });  
      //const testjson=JSON.parse(JSON.stringify(result.recordset));

    })
});

router.post("/WriteMSRXLSHeader", (req,res) => {

  workbook.xlsx.readFile('temp/MRSOutputReportTemp.xlsx').then(function() {

    var　colsel=12
    var worksheet = workbook.getWorksheet(1);
    var row = worksheet.getRow(7);
    
    row.getCell(1).value = 'reynan'; // A5's value set to 5
    row.commit();

      // for(var x=0;x<req.body.length;x++)
      // {
      //   if(LoopCounter<5)
      //   {
      //     console.log(req.body.Batch)
      //     row.getCell(1).value=req.body[x].Batch;
      //   }
      //   LoopCounter=LoopCounter+1
      // }

    })

    // SAVE TEMPLATE
    workbook.xlsx.writeFile('temp/MRSOutputReportTemp_TEST.xlsx').then(()=>{                 
      const myPath = '../../temp/MRSOutputReportTemp_TEST.xlsx'
      res.send("OK")
    });  
})

router.post("/WriteMSRXLSDetails", (req, res) => {

    workbook.xlsx.readFile('temp/MRSOutputReportTemp.xlsx').then(function() {
          var worksheet
          var row
          var clearRow
          
          var CellRow=12
          var RowCounter=0
          var SheetCounter=1
          var ClearRows=13
          var ClearCols=27

          var LastMachineNo=''
          var LastMSRDate=''
          var LastShift=0

          //DETAILS LOOP
          for(var x=0;x<req.body.length;x++)
          {
            worksheet = workbook.getWorksheet(SheetCounter);
            if(x==0)
            {
              if(RowCounter<10)
              {
                CellRow = CellRow+1
                row = worksheet.getRow(CellRow);
              }
            }
            else
            {
              if(((RowCounter<10)) && ((LastMachineNo==req.body[x].MachineNo)&&(LastMSRDate==req.body[x].MSRDate)&&(LastShift==req.body[x].ShiftID)))
              {
                CellRow = CellRow+1
                row = worksheet.getRow(CellRow);
              }
              else
              {
                //COPY WORKSHEET
                var ws1 = workbook.getWorksheet(SheetCounter);
                let copySheet = workbook.addWorksheet('test');
              
                copySheet.model = Object.assign(ws1.model, {
                  mergeCells: ws1.model.merges
                });
                copySheet.name = 'new demo '+SheetCounter;
                //END COPY WORKSHEET

                //CLEAR COPIED SHEET
                for(var a=13;a<ClearRows+10;a++)
                  {
                    for(var b=1;b<ClearCols;b++)
                    {
                      clearRow=copySheet.getRow(a);
                      clearRow.getCell(b).value='';
                    }
                  }
                //CLEAR COPIED SHEET
                
                SheetCounter=SheetCounter+1
                RowCounter=0

                worksheet = workbook.getWorksheet(SheetCounter);
                CellRow=13
                row = worksheet.getRow(CellRow);
              }
            }
            
            row.getCell(1).value=req.body[x].Batch;
            row.getCell(3).value=req.body[x].PressureGauge1;
            row.getCell(4).value=req.body[x].PressureGauge1;
            row.getCell(5).value=req.body[x].DeflectionLoadMeter1;
            row.getCell(6).value=req.body[x].DeflectionLoadMeter2;
            row.getCell(7).value=req.body[x].FactorA;
            row.getCell(8).value=req.body[x].FactorB;
            row.getCell(9).value=req.body[x].Height;
            row.getCell(10).value=req.body[x].Width;
            row.getCell(11).value=req.body[x].Length;
            row.getCell(12).value=req.body[x].SpecieName;
            row.getCell(13).value=req.body[x].SupplierName;
            row.getCell(14).value=req.body[x].SawmillName;
            row.getCell(15).value=req.body[x].Total;
            row.getCell(16).value=req.body[x].Below;
            row.getCell(17).value=req.body[x].L60;
            row.getCell(18).value=req.body[x].L70;
            row.getCell(19).value=req.body[x].L80;
            row.getCell(20).value=req.body[x].L90;
            row.getCell(21).value=req.body[x].L100;
            row.getCell(22).value=req.body[x].L110;
            row.getCell(23).value=req.body[x].L125;
            row.getCell(24).value=req.body[x].L140;
            row.getCell(25).value=req.body[x].L160;
            row.getCell(26).value=req.body[x].L180;
            row.getCell(27).value=req.body[x].L200;

            LastMachineNo=req.body[x].MachineNo
            LastMSRDate=req.body[x].MSRDate
            LastShift=req.body[x].ShiftID

            RowCounter=RowCounter+1
          }
          //END DETAILS LOOP

        // SAVE TEMPLATE
          workbook.xlsx.writeFile('temp/MRSOutputReportTemp_Details.xlsx').then(()=>{                 
            const myPath = '../../temp/MRSOutputReportTemp_Details.xlsx'
            res.send(myPath)
          });  
      })
})

router.post("/TestWriteXLS", (req, res) => {

  workbook.xlsx.readFile('temp/MRSOutputReportTemp.xlsx').then(function() {
        var worksheet
        var row
        var rowMachine
        var rowDate
        var rowShift

        var clearRow
        
        var headerRow = 7
        var headerloop = 1

        var CellRow=12
        var RowCounter=0
        var SheetCounter=1
        var HeaderSheetCounter=1
        var ClearRows=13
        var ClearCols=27

        var LastMachineNo=''
        var LastMSRDate=''
        var LastShift=0





        //DETAILS LOOP
        for(var x=0;x<req.body.length;x++)
        {
         

          //HEADER
          if(req.body[x].Type == 'A')
          {
            worksheet = workbook.getWorksheet(HeaderSheetCounter);
            if(headerloop==1)
            {
              rowDate = worksheet.getRow(1);
              rowShift = worksheet.getRow(2);
              rowMachine = worksheet.getRow(2);

              rowMachine.getCell(12).value=req.body[x].MachineName;
              rowShift.getCell(14).value=req.body[x].ShiftName;
              rowDate.getCell(14).value=req.body[x].MSRDate;
            }

            //#region data
              row = worksheet.getRow(headerRow);

              row.getCell(1).value=req.body[x].Batch;
              row.getCell(3).value=req.body[x].PressureGauge1;
              row.getCell(4).value=req.body[x].PressureGauge1;
              row.getCell(5).value=req.body[x].DeflectionLoadMeter1;
              row.getCell(6).value=req.body[x].DeflectionLoadMeter2;
              row.getCell(7).value=req.body[x].FactorA;
              row.getCell(8).value=req.body[x].FactorB;
              row.getCell(9).value=req.body[x].Height;
              row.getCell(10).value=req.body[x].Width;
              row.getCell(11).value=req.body[x].Length;
              row.getCell(12).value=req.body[x].SpecieName;
              row.getCell(13).value=req.body[x].SupplierName;
              row.getCell(14).value=req.body[x].SawmillName;
              row.getCell(15).value=req.body[x].Total;
              row.getCell(16).value=req.body[x].Below;
              row.getCell(17).value=req.body[x].L60;
              row.getCell(18).value=req.body[x].L70;
              row.getCell(19).value=req.body[x].L80;
              row.getCell(20).value=req.body[x].L90;
              row.getCell(21).value=req.body[x].L100;
              row.getCell(22).value=req.body[x].L110;
              row.getCell(23).value=req.body[x].L125;
              row.getCell(24).value=req.body[x].L140;
              row.getCell(25).value=req.body[x].L160;
              row.getCell(26).value=req.body[x].L180;
              row.getCell(27).value=req.body[x].L200;
            //#endregion data   

            headerloop=headerloop+1
            headerRow=headerRow+1
          }
          //END HEADER

          //DETAILS
          if(req.body[x].Type == 'B')
          {
            worksheet = workbook.getWorksheet(SheetCounter);

            //PARA MAG SKIP SA UNANG LOOP
            if(LastMachineNo=='')
            {
              if(RowCounter<10)
              {
                CellRow = CellRow+1
                row = worksheet.getRow(CellRow);
              }

            }
            else
            {

              if((RowCounter<10) && (LastMachineNo==req.body[x].MachineNo)&&(LastMSRDate==req.body[x].MSRDate)&&(LastShift==req.body[x].ShiftID))
              {
                CellRow = CellRow+1
                row = worksheet.getRow(CellRow);
              }
              else
              {
                
                //COPY WORKSHEET
                var ws1 = workbook.getWorksheet(SheetCounter);
                let copySheet = workbook.addWorksheet('test');
              
                copySheet.model = Object.assign(ws1.model, {
                  mergeCells: ws1.model.merges
                });
                copySheet.name = 'new demo '+SheetCounter;
                //END COPY WORKSHEET

                
                //CLEAR COPIED SHEET
                for(var a=13;a<ClearRows+10;a++)
                  {
                    for(var b=1;b<ClearCols;b++)
                    {
                      clearRow=copySheet.getRow(a);
                      clearRow.getCell(b).value='';
                    }
                  }
                //CLEAR COPIED SHEET
                
                SheetCounter=SheetCounter+1
                RowCounter=0
                
                HeaderSheetCounter=SheetCounter+1

                // headerloop=1       
                // headerRow=7                    


                //RESET VARIABLES
                worksheet = workbook.getWorksheet(SheetCounter);
                CellRow=13
                row = worksheet.getRow(CellRow);

                headerloop=1       
                headerRow=7    

                

              }
          
            }

              row.getCell(1).value=req.body[x].Batch;
              row.getCell(3).value=req.body[x].PressureGauge1;
              row.getCell(4).value=req.body[x].PressureGauge1;
              row.getCell(5).value=req.body[x].DeflectionLoadMeter1;
              row.getCell(6).value=req.body[x].DeflectionLoadMeter2;
              row.getCell(7).value=req.body[x].FactorA;
              row.getCell(8).value=req.body[x].FactorB;
              row.getCell(9).value=req.body[x].Height;
              row.getCell(10).value=req.body[x].Width;
              row.getCell(11).value=req.body[x].Length;
              row.getCell(12).value=req.body[x].SpecieName;
              row.getCell(13).value=req.body[x].SupplierName;
              row.getCell(14).value=req.body[x].SawmillName;
              row.getCell(15).value=req.body[x].Total;
              row.getCell(16).value=req.body[x].Below;
              row.getCell(17).value=req.body[x].L60;
              row.getCell(18).value=req.body[x].L70;
              row.getCell(19).value=req.body[x].L80;
              row.getCell(20).value=req.body[x].L90;
              row.getCell(21).value=req.body[x].L100;
              row.getCell(22).value=req.body[x].L110;
              row.getCell(23).value=req.body[x].L125;
              row.getCell(24).value=req.body[x].L140;
              row.getCell(25).value=req.body[x].L160;
              row.getCell(26).value=req.body[x].L180;
              row.getCell(27).value=req.body[x].L200;


              LastMachineNo=req.body[x].MachineNo
              LastMSRDate=req.body[x].MSRDate
              LastShift=req.body[x].ShiftID

              RowCounter=RowCounter+1
            
            
          }
          //END DETAILS
        }
        //END DETAILS LOOP

      // SAVE TEMPLATE
        workbook.xlsx.writeFile('temp/MRSOutputReportTemp_TEMP.xlsx').then(()=>{                 
          const myPath = '../../temp/MRSOutputReportTemp_TEMP.xlsx'
          res.send(myPath)
        });  
    })
})

router.post("/GetMSRHeader", (req, res) => {

  let request = new mssql.Request();
  request.query(
    `SELECT  
    TD.MachineNo, 
    TD.MSRDate, 
    TD.ShiftID, 
    TD.MSRSequence, 
    TD.Batch, 
    TD.PressureGauge1, 
    TD.PressureGauge2, 
    TD.DeflectionLoadMeter1, 
    TD.DeflectionLoadMeter2, 
    TD.FactorA, 
    TD.FactorB, 
    TD.Height, 
    TD.Width, 
    TD.Length, 
    S.SpecieName, 
    SUP.SupplierName, 
    SM.SawmillName , 
    TD.Total, 
    TD.Below, 
    TD.L60, 
    TD.L70, 
    TD.L80, 
    TD.L90, 
    TD.L100, 
    TD.L110, 
    TD.L125, 
    TD.L140, 
    TD.L160, 
    TD.L180, 
    TD.L200 
    FROM ToleranceDetails TD 
    left JOIN ShiftSchedules SS  
    ON SS.ShiftID  = TD.ShiftID	  
    left JOIN Species	S  
    ON S.SpecieID	= TD.SpecieID	  
    left JOIN Suppliers	SUP  
    ON SUP.SupplierCode	= TD.SupplierCode	  
    left JOIN Sawmills	SM  
    ON SM.SawmillCode	=	TD.SawmillCode	  
    Order by TD.MachineNo,TD.MSRDate,TD.ShiftID,TD.MSRSequence ASC  `
  ,
  (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result.recordset);
      }
    });
})

router.post("/GetMSRDetails", (req, res) => {

  let request = new mssql.Request();
  request.query(
    `SELECT 
    MD.Batch, 
    MD.PressureGauge1, 
    MD.PressureGauge2, 
    MD.DeflectionLoadMeter1, 
    MD.DeflectionLoadMeter2, 
    MD.FactorA, 
    MD.FactorB, 
    MD.Height, 
    MD.Width, 
    MD.Length, 
    S.SpecieName, 
    SUP.SupplierName, 
    SM.SawmillName , 
    MD.Total, 
    MD.Below, 
    MD.L60, 
    MD.L70, 
    MD.L80, 
    MD.L90, 
    MD.L100, 
    MD.L110, 
    MD.L125, 
    MD.L140, 
    MD.L160, 
    MD.L180, 
    MD.L200, 
    MD.MachineNo, 
    MD.MSRDate, 
    MD.ShiftID, 
    MD.MSRSequence 
    FROM MSRDetails MD 
    left JOIN ShiftSchedules SS 
    ON SS.ShiftID  = MD.ShiftID	 
    left JOIN Species	S 
    ON S.SpecieID	= MD.SpecieID	 
    left JOIN Suppliers	SUP 
    ON SUP.SupplierCode	= MD.SupplierCode	 
    left JOIN Sawmills	SM 
    ON SM.SawmillCode	=	MD.SawmillCode	 
    Order by MD.MachineNo,MD.MSRDate,MD.ShiftID,MD.MSRSequence ASC `
  ,
  (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result.recordset);
      }
    });

})

router.post("/getOutputReportDetails", (req, res) => {

  let request = new mssql.Request();
  request.query(
      `SELECT * FROM (
      SELECT  
      TD.MachineNo, 
      convert(varchar,TD.MSRDate,111) AS MSRDate, 
      TD.ShiftID, 
      TD.MSRSequence, 
      TD.Batch, 
      TD.PressureGauge1, 
      TD.PressureGauge2, 
      TD.DeflectionLoadMeter1, 
      TD.DeflectionLoadMeter2, 
      TD.FactorA, 
      TD.FactorB, 
      TD.Height, 
      TD.Width, 
      TD.Length, 
      S.SpecieName, 
      SUP.SupplierName, 
      SM.SawmillName , 
      TD.Total, 
      TD.Below, 
      TD.L60, 
      TD.L70, 
      TD.L80, 
      TD.L90, 
      TD.L100, 
      TD.L110, 
      TD.L125, 
      TD.L140, 
      TD.L160, 
      TD.L180, 
      TD.L200,
      M.MachineName,
      SS.ShiftName,
      'A' AS Type
      FROM ToleranceDetails TD 
      left JOIN ShiftSchedules SS  
      ON SS.ShiftID  = TD.ShiftID	  
      left JOIN Species	S  
      ON S.SpecieID	= TD.SpecieID	  
      left JOIN Suppliers	SUP  
      ON SUP.SupplierCode	= TD.SupplierCode	  
      left JOIN Sawmills	SM  
      ON SM.SawmillCode	=	TD.SawmillCode	  
      LEFT JOIN Machines M
      ON M.MachineNo = TD.MachineNo
      
      
      UNION ALL
      
      SELECT 
      MD.MachineNo, 
      convert(varchar,MD.MSRDate,111) AS MSRDate , 
      MD.ShiftID, 
      MD.MSRSequence ,
      MD.Batch, 
      MD.PressureGauge1, 
      MD.PressureGauge2, 
      MD.DeflectionLoadMeter1, 
      MD.DeflectionLoadMeter2, 
      MD.FactorA, 
      MD.FactorB, 
      MD.Height, 
      MD.Width, 
      MD.Length, 
      S.SpecieName, 
      SUP.SupplierName, 
      SM.SawmillName , 
      MD.Total, 
      MD.Below, 
      MD.L60, 
      MD.L70, 
      MD.L80, 
      MD.L90, 
      MD.L100, 
      MD.L110, 
      MD.L125, 
      MD.L140, 
      MD.L160, 
      MD.L180, 
      MD.L200,
      M.MachineName,
      SS.ShiftName,
      'B' AS Type
      FROM MSRDetails MD 
      left JOIN ShiftSchedules SS 
      ON SS.ShiftID  = MD.ShiftID	 
      left JOIN Species	S 
      ON S.SpecieID	= MD.SpecieID	 
      left JOIN Suppliers	SUP 
      ON SUP.SupplierCode	= MD.SupplierCode	 
      left JOIN Sawmills	SM 
      ON SM.SawmillCode	=	MD.SawmillCode
      LEFT JOIN Machines M
      ON M.MachineNo = MD.MachineNo
      ) A 
      ORDER BY MachineNo,MSRDate,ShiftID,Type ASC`
  ,
  (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result.recordset);
      }
    });

})


module.exports = router;