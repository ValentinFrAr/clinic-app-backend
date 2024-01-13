/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import ConfirmUpdateMyInfo from "./ConfirmUpdateMyInfo";
import { useNavigate, useParams } from "react-router";

const PatientModal = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const funcioncita = async () => {
    if (id) {
      await actions.getPatientById(id);
      const patientData = store.patientData?.patientData;
      if (patientData) {
        setFirstname(patientData.firstname || "");
        setLastname(patientData.lastname || "");
        setEmail(patientData.email || "");
        setPassword(patientData.password || "");
        setAddress(patientData.address || "");
      }
    }
  };

  useEffect(() => {
    if (id) {
      funcioncita();
    }
  }, [id]); // Modification de la dépendance pour inclure id

  const handleUpdatePatient = async () => {
    try {
      const response = await actions.updatePatient(
        firstname,
        lastname,
        email,
        address,
        password,
        id
      );
      navigate("/dashboard-patient");
      window.location.reload();
      return response;
    } catch (error) {
      console.log("Error updating patient", error);
    }
  };

  return (
    <>
      {store.patient?.id === store.patientData?.patientData?.id &&
      store.patientData ? (
        <>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Ficha de {firstname} {lastname}
                </h1>
              </div>
              <div className="modal-body">
                <form className="mx-auto w-75">
                  <div className="input-group mb-3">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control border-l-0"
                      aria-label="firstname"
                      aria-describedby="patient-firstname"
                      placeholder="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control border-l-0"
                      aria-label="lastname"
                      aria-describedby="patient-lastname"
                      placeholder="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label>E-mail</label>
                    <input
                      type="email"
                      className="form-control border-l-0"
                      aria-label="email"
                      aria-describedby="patient-email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label>Dirección</label>
                    <input
                      type="text"
                      className="form-control border-l-0"
                      aria-label="address"
                      aria-describedby="patient-address"
                      placeholder="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group mb-3">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control border-l-0"
                      aria-label="password"
                      aria-describedby="patient-password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard-patient")}
                >
                  VOLVER
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={"#confirmPatient-" + id}
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </div>
          </div>

          <ConfirmUpdateMyInfo editPatientData={handleUpdatePatient} />
        </>
      ) : (
        <h1>denegado</h1>
      )}
    </>
  );
};

export default PatientModal;