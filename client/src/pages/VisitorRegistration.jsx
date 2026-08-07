import { useEffect, useState } from "react";
import api from "../services/api";

const VisitorRegistration = () => {

  const emptyForm = {
    name: "",
    mobile: "",
    email: "",
    company: "",
    employeeToVisit: "",
    visitDate: "",
    expectedArrivalTime: "",
    purpose: ""
  };


  const [form, setForm] = useState(emptyForm);

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);


  const today = new Date()
    .toISOString()
    .split("T")[0];



  useEffect(() => {

    fetchEmployees();

  }, []);




  const fetchEmployees = async () => {

    try {

      const response = await api.get("/employees");

      setEmployees(
        response.data.employees || response.data
      );

    } catch(error) {

      console.log(error);

    }

  };





  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };






  const handleSubmit = async (e) => {

    e.preventDefault();



    // Date validation

    if(form.visitDate < today){

      alert(
        "Visit date cannot be earlier than today"
      );

      return;

    }




    // Time validation for today

    const currentTime =
      new Date()
      .toTimeString()
      .slice(0,5);



    if(
      form.visitDate === today &&
      form.expectedArrivalTime < currentTime
    ){

      alert(
        "Arrival time cannot be earlier than current time"
      );

      return;

    }





    try {


      setLoading(true);



      await api.post(
        "/visitors",
        form
      );



      alert(
        "Visitor Registered Successfully"
      );



      setForm(emptyForm);



    } catch(error){


      alert(

        error.response?.data?.message ||
        "Registration Failed"

      );


    } finally {


      setLoading(false);


    }


  };







  return (

    <div className="max-w-5xl mx-auto p-6">


      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">



        <div className="bg-blue-600 p-5">


          <h1 className="text-3xl font-bold text-white">

            Visitor Registration

          </h1>


          <p className="text-blue-100 mt-1">

            Register a visitor for today's meeting

          </p>


        </div>





        <form

          onSubmit={handleSubmit}

          className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6"

        >




          <div>

            <label className="block mb-2 font-semibold">

              Visitor Name

            </label>


            <input

              type="text"

              name="name"

              value={form.name}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>





          <div>

            <label className="block mb-2 font-semibold">

              Mobile Number

            </label>


            <input

              type="tel"

              name="mobile"

              value={form.mobile}

              onChange={handleChange}

              required

              maxLength="10"

              pattern="[0-9]{10}"

              placeholder="10 digit mobile number"

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>






          <div>

            <label className="block mb-2 font-semibold">

              Email

            </label>


            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>







          <div>

            <label className="block mb-2 font-semibold">

              Company

            </label>


            <input

              type="text"

              name="company"

              value={form.company}

              onChange={handleChange}

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>







          <div>


            <label className="block mb-2 font-semibold">

              Employee To Visit

            </label>



            <select

              name="employeeToVisit"

              value={form.employeeToVisit}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            >


              <option value="">

                Select Employee

              </option>



              {
                employees.map(emp => (

                  <option

                    key={emp._id}

                    value={emp._id}

                  >

                    {emp.name} ({emp.department})


                  </option>


                ))
              }



            </select>


          </div>








          <div>


            <label className="block mb-2 font-semibold">

              Visit Date

            </label>


            <input

              type="date"

              name="visitDate"

              min={today}

              value={form.visitDate}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>








          <div>


            <label className="block mb-2 font-semibold">

              Expected Arrival Time

            </label>



            <input

              type="time"

              name="expectedArrivalTime"

              value={form.expectedArrivalTime}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>








          <div>


            <label className="block mb-2 font-semibold">

              Purpose

            </label>



            <input

              type="text"

              name="purpose"

              value={form.purpose}

              onChange={handleChange}

              required

              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

            />


          </div>







          <div className="md:col-span-2">


            <button

              type="submit"

              disabled={loading}

              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"

            >

              {
                loading
                ? "Registering..."
                : "Register Visitor"
              }


            </button>


          </div>





        </form>



      </div>



    </div>

  );

};


export default VisitorRegistration;