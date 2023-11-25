import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
// import Cookies from "js-cookie";
import PatientDetails from "../../components/admin/PatientDetails";

const AdminAllPatients = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllPatients();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting patient with ID:", id);
    try {
      await actions.deletePatient(id);
    } catch (error) {
      console.error("Error al eliminar paciente", error);
    }
  };

  return (
    <div className="admin-patient-content">
      <h1 className="text-center font-bold my-4" style={{ fontSize: "2.5rem" }}>
        Lista de pacientes:
      </h1>
      <div
        className="table-responsive"
        style={{ width: "100%", margin: "0 auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th className="th-id">ID</th>
              <th className="th-patient-name th-general">Firstname</th>
              <th className="th-patient-name th-general">Lastname</th>
              <th className="th-patient-name th-general">DNI</th>
              <th className="th-patient-name th-general">Address</th>
              <th className="th-patient-name th-general">Birthday</th>
              <th className="th-email th-general">Email</th>
              <th className="th-patient-name th-general">Created at</th>
              <th className="th-patient-name th-general">Updated at</th>
              <th className="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.patients &&
              store.patients.length >= 1 &&
              store.patients.map((patient) => (
                <React.Fragment key={patient.id}>
                  <tr className="infos-contain" >
                    <td>{patient.id}</td>
                    <td>{patient.firstname}</td>
                    <td>{patient.lastname}</td>
                    <td>{patient.dni}</td>
                    <td>{patient.address}</td>
                    <td>{actions.dateFormater(patient.birthday)}</td>
                    <td>{patient.email}</td>
                    <td>{actions.dateFormater(patient.createdAt)}</td>
                    <td>{actions.dateFormater(patient.updatedAt)}</td>
                    <td className="text-center">
                      <button
                        style={{
                          background: "blue",
                          color: "white",
                          border: " 2px solid white",
                          padding: "2px 3px",
                          borderRadius: "6px",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target={"#patientData-" + patient.id}
                      >
                        &#9998;
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        style={{
                          background: "red",
                          color: "white",
                          border: " 2px solid white",
                          padding: "2px 3px",
                        }}
                      >
                        &#10008;
                      </button>
                    </td>
                  </tr>
                  <PatientDetails patientData={patient} />
                  </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllPatients;