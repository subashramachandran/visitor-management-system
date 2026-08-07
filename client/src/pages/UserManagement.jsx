import { useEffect, useState } from "react";
import api from "../services/api";


const UserManagement = () => {


  const emptyForm = {

    name: "",
    email: "",
    password: "",
    role: "Employee"

  };



  const [users,setUsers] = useState([]);

  const [form,setForm] = useState(emptyForm);

  const [editId,setEditId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);





  const fetchUsers = async()=>{

    try{

      const res = await api.get(
        `/users?search=${search}`
      );


      setUsers(
        res.data
      );


    }
    catch(error){

      console.log(error);

    }

  };






  useEffect(()=>{

    fetchUsers();

  },[search]);







  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);



      if(editId){

        await api.put(
          `/users/${editId}`,
          form
        );

      }
      else{

        await api.post(
          "/users",
          form
        );

      }



      setForm(emptyForm);

      setEditId(null);

      fetchUsers();


    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };








  const editUser=(user)=>{


    setForm({

      name:user.name,

      email:user.email,

      password:"",

      role:user.role

    });


    setEditId(user._id);


  };







  const deleteUser=async(id)=>{


    try{


      await api.delete(
        `/users/${id}`
      );


      fetchUsers();


    }
    catch(error){

      console.log(error);

    }

  };







return (

<div className="min-h-screen bg-gray-100 p-6">



<h1 className="text-3xl font-bold mb-6 text-gray-800">

User Management

</h1>








<input

className="
w-full mb-6 p-3
rounded-xl
border
focus:ring-2
focus:ring-blue-500
"

placeholder="Search users..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

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
"Edit User"
:
"Create User"
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



<input

className="border p-3 rounded-xl"

placeholder="Name"

value={form.name}

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>





<input

className="border p-3 rounded-xl"

placeholder="Email"

type="email"

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>







<input

className="border p-3 rounded-xl"

placeholder="Password"

type="password"

value={form.password}

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

/>







<select

className="border p-3 rounded-xl"

value={form.role}

onChange={(e)=>

setForm({

...form,

role:e.target.value

})

}

>


<option>
Administrator
</option>


<option>
Receptionist
</option>


<option>
Employee
</option>


</select>






<button

className="
md:col-span-2
bg-blue-600
hover:bg-blue-700
text-white
p-3
rounded-xl
font-semibold
"


>


{

loading ?

"Saving..."

:

editId ?

"Update User"

:

"Create User"

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

Users List

</h2>







<div className="overflow-x-auto">


<table className="w-full">


<thead>

<tr className="bg-blue-600 text-white">


<th className="p-3 text-left">
Name
</th>


<th className="p-3 text-left">
Email
</th>


<th className="p-3 text-left">
Role
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>







<tbody>


{

users.map((user)=>(


<tr

key={user._id}

className="border-b hover:bg-gray-50"

>


<td className="p-3">
{user.name}
</td>



<td className="p-3">
{user.email}
</td>



<td className="p-3">


<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
">


{user.role}


</span>


</td>






<td className="p-3 flex gap-2">


<button

onClick={()=>editUser(user)}

className="
bg-green-600
text-white
px-4
py-2
rounded-lg
"

>

Edit

</button>





<button

onClick={()=>deleteUser(user._id)}

className="
bg-red-600
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



</div>





</div>

);

};


export default UserManagement;