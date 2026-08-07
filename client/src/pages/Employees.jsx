import { useEffect, useState } from "react";
import api from "../services/api";


const Employees = () => {

  const emptyForm = {
    employeeId: "",
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: ""
  };


  const [employees,setEmployees] = useState([]);

  const [form,setForm] = useState(emptyForm);

  const [editId,setEditId] = useState(null);

  const [search,setSearch] = useState("");

  const [page,setPage] = useState(1);

  const [pages,setPages] = useState(1);

  const [loading,setLoading] = useState(false);



  const fetchEmployees = async()=>{

    try{

      const res = await api.get(
        `/employees?search=${search}&page=${page}&limit=5`
      );


      setEmployees(
        res.data.employees || []
      );


      setPages(
        res.data.pages || 1
      );


    }
    catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchEmployees();

  },[search,page]);






  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);


      if(editId){

        await api.put(
          `/employees/${editId}`,
          form
        );

      }
      else{

        await api.post(
          "/employees",
          form
        );

      }


      setForm(emptyForm);

      setEditId(null);

      fetchEmployees();


    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };







  const editEmployee=(employee)=>{


    setForm({

      employeeId:employee.employeeId,

      name:employee.name,

      email:employee.email,

      mobile:employee.mobile,

      department:employee.department,

      designation:employee.designation

    });


    setEditId(employee._id);

  };






  const deleteEmployee=async(id)=>{

    try{

      await api.delete(
        `/employees/${id}`
      );

      fetchEmployees();

    }
    catch(error){

      console.log(error);

    }

  };






return (

<div className="min-h-screen bg-gray-100 p-6">


<h1 className="text-3xl font-bold text-gray-800 mb-6">
Employee Management
</h1>





<input

className="
w-full mb-6 p-3 rounded-xl
border border-gray-300
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="Search employee..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);

setPage(1);

}}

/>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
mb-8
">


<h2 className="text-xl font-semibold mb-5">

{
editId ?
"Edit Employee"
:
"Add Employee"
}

</h2>




<form

onSubmit={handleSubmit}

className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"


>


{

Object.keys(form).map((field)=>(


<input

key={field}

className="
border
rounded-xl
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder={
field
}

value={
form[field]
}

onChange={(e)=>

setForm({

...form,

[field]:e.target.value

})

}

/>


))

}







<button

className="
md:col-span-2
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
font-semibold
transition
"

>

{

loading ?

"Saving..."

:

editId ?

"Update Employee"

:

"Add Employee"

}


</button>



</form>



</div>









<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<h2 className="text-xl font-semibold mb-5">
Employees List
</h2>





<div className="overflow-x-auto">


<table className="w-full">


<thead>


<tr className="
bg-blue-600
text-white
">


<th className="p-3 text-left">
ID
</th>


<th className="p-3 text-left">
Name
</th>


<th className="p-3 text-left">
Email
</th>


<th className="p-3 text-left">
Department
</th>


<th className="p-3 text-left">
Designation
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>





<tbody>


{

employees.map((emp)=>(


<tr
key={emp._id}
className="
border-b
hover:bg-gray-50
"
>


<td className="p-3">
{emp.employeeId}
</td>


<td className="p-3">
{emp.name}
</td>


<td className="p-3">
{emp.email}
</td>


<td className="p-3">
{emp.department}
</td>


<td className="p-3">
{emp.designation}
</td>



<td className="p-3 flex gap-2">


<button

onClick={()=>editEmployee(emp)}

className="
bg-green-600
hover:bg-green-700
text-white
px-4
py-2
rounded-lg
"

>

Edit

</button>





<button

onClick={()=>deleteEmployee(emp._id)}

className="
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-lg
"

>

Delete

</button>



</td>



</tr>


))


}



</tbody>


</table>


</div>









<div className="
flex
justify-center
items-center
gap-4
mt-6
">


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
bg-gray-700
disabled:bg-gray-300
text-white
px-5
py-2
rounded-lg
"

>

Previous

</button>




<span className="font-semibold">

Page {page} of {pages}

</span>




<button

disabled={page===pages}

onClick={()=>setPage(page+1)}

className="
bg-gray-700
disabled:bg-gray-300
text-white
px-5
py-2
rounded-lg
"

>

Next

</button>


</div>



</div>



</div>

);

};


export default Employees;