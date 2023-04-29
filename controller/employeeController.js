const db = require("../db");

//Get all Employees
exports.getAllEmployee = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

//Get a Particular employee
exports.getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.status(404).send("Employee and Record not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [deleteResult] = await db.query(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );
    if (deleteResult.affectedRows === 0) {
      res.status(404).send("Employee not found");
    } else {
      res.send("Employee deleted successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Add or edit an employee
// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, employee_code, salary } = req.body;
    const [[{ newId }], { affectedRows }] = await db.query(
      "CALL usp_employee_add_or_edit(?, ?, ?, ?)",
      [null, name, employee_code, salary]
    );
    if (affectedRows === 0) {
      res.status(500).send("Employee not added");
    } else {
      res.send({ message: "Employee created successfully", id: newId, affectedRows });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};


// Edit an existing employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id, name, employee_code, salary } = req.body;
    const [[{ affectedRows }]] = await db.query(
      "CALL usp_employee_add_or_edit(?, ?, ?, ?)",
      [id, name, employee_code, salary]
    );
    if (affectedRows === 0) {
      res.status(500).send("Employee not updated");
    } else {
      res.send({ message: "Employee updated successfully", id, affectedRows });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

