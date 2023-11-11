import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwt"); // O de donde sea que obtengas tu token
const config = {
  headers: {
    Authorization: `${token}`,
  },
};

const getState = ({ getStore, getActions, setStore }) => {
  const API_AUTH = "http://localhost:5000/api/auth";
  const API = "http://localhost:5000/api";
  return {
    store: {
      patients: [],
      patient: [],
      employees: [],
      employee: [],
      isAuth: false,
    },
    actions: {
      getAllPatients: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/patients`, config);
          if (response.status === 200) {
            const responseData = response.data;
            // console.log("GET ALL Patients", responseData);
            setStore({ patients: responseData.results });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getAllEmployees: async () => {
        try {
          const response = await axios.get(`${API_AUTH}/employees`, config);
          if (response.status === 200) {
            const data = response.data;
            console.log("all employees", data);
            const store = getStore();
            setStore({ ...store, employees: data });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getEmployeeById: async (id) => {
        try {
          const response = await axios.get(`${API_AUTH}/employee/${id}`);
          if (response.status === 200) {
            const data = response.data;
            console.log("Employee by ID", data);
            const store = getStore();
            setStore({ ...store, employee: data });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getPatientById: async (id) => {
        try {
          const response = await axios.get(`${API_AUTH}/patient/${id}`);
          if (response.status === 200) {
            const data = response.data;
            console.log("Patient by ID", data);
            const store = getStore();
            setStore({ ...store, patient: data });
            return true;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      registerPatient: async (
        firstname,
        lastname,
        email,
        dni,
        address,
        birthday
      ) => {
        try {
          const res = await axios.post(`${API_AUTH}/register`, {
            firstname,
            lastname,
            email,
            dni,
            address,
            birthday,
          });

          if (res.status === 201) {
            console.log("Register OK", res);
            return true;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      login: async (personalID, password) => {
        try {
          const response = await axios.post(`${API_AUTH}/login`, {
            personalID: personalID,
            password: password,
          });
          if (response.status === 201) {
            const data = response.data;
            // console.log(data);

            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);
            setStore({ ...store, isAuth: true, employee: data.employees });
            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      loginPatient: async (dni, password) => {
        try {
          const response = await axios.post(`${API_AUTH}/login-patient`, {
            dni: dni,
            password: password,
          });
          if (response.status === 201) {
            const data = response.data;
            console.log(data);

            const store = getStore();
            Cookies.set("jwt", data.token);
            console.log(data);

            setStore({ ...store, isAuth: true, patients: data.patients });

            return data;
          }
        } catch (error) {
          console.log(error);
        }
      },
      isAuth: async () => {
        let token = Cookies.get("jwt");
        if (token) {
          try {
            const response = await axios.get(`${API}/private`, {
              headers: { Authorization: `${token}` },
            });
            if (response.status === 200) {
              const data = await response.data;
              const store = getStore();
              if (data.user.specialist) {
                setStore({ ...store, isAuth: true, employee: data.user });
                console.log("log from isAuth", store.employee);
              } else {
                setStore({ ...store, isAuth: true, patient: data.user });
                console.log("log from isAuth", store.patient);
              }
            }
          } catch (error) {
            // Gérer l'erreur ici
            console.log(error);
          }
        }
      },
      logout: () => {
        let token = Cookies.remove("jwt");
        setStore({ isAuth: false });
        return token != null ? true : false;
      },
      deleteEmployee: async (employeeId) => {
        try {
          const response = await axios.delete(`${API_AUTH}/delete`, config, {
            data: { id: employeeId }, // Pasar el id del empleado que deseas eliminar
          });

          if (response.status === 200) {
            console.log("¡Empleado eliminado con éxito!");
            // window.location.reload();
            // Realizar cualquier otra acción necesaria después de eliminar
          }
        } catch (error) {
          console.error("Error al eliminar empleado", error);
          throw error;
        }
      },
    },
  };
};

export default getState;
