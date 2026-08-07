import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


const VisitorList = () => {

  const { user } = useAuth();


  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  const fetchVisitors = async () => {

    try {

      const response = await api.get("/visitors");

      setVisitors(response.data);

    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchVisitors();

  },[]);





  const updateStatus = async(id,status)=>{

    try{

      await api.put(
        `/visitors/${id}/status`,
        {
          status,
          remarks:`Visitor ${status.toLowerCase()}`
        }
      );


      fetchVisitors();


    }
    catch(error){

      console.log(error);

    }

  };






  const checkIn = async(id)=>{

    try{

      await api.put(
        `/visitors/${id}/checkin`
      );


      fetchVisitors();


    }
    catch(error){

      alert(
        error.response?.data?.message ||
        "Check in failed"
      );

    }

  };







  const checkOut = async(id)=>{

    try{

      await api.put(
        `/visitors/${id}/checkout`
      );


      fetchVisitors();


    }
    catch(error){

      alert(
        error.response?.data?.message ||
        "Check out failed"
      );

    }

  };







  const filteredVisitors = visitors.filter(visitor =>

    visitor.name
    ?.toLowerCase()
    .includes(search.toLowerCase())

    ||

    visitor.mobile
    ?.includes(search)

  );






  const statusColor = (status)=>{

    switch(status){

      case "APPROVED":
        return "bg-green-100 text-green-700";


      case "PENDING":
        return "bg-yellow-100 text-yellow-700";


      case "REJECTED":
        return "bg-red-100 text-red-700";


      case "CHECKED_IN":
        return "bg-blue-100 text-blue-700";


      case "CHECKED_OUT":
        return "bg-gray-100 text-gray-700";


      case "CANCELLED":
        return "bg-red-200 text-red-800";


      default:
        return "bg-gray-100";

    }

  };







return (

<div className="p-6">



<div className="flex justify-between items-center mb-6">


<h1 className="text-3xl font-bold text-gray-800">

Visitor List

</h1>



<input

type="text"

placeholder="Search visitor..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border rounded-lg px-4 py-2 w-72 focus:ring-2 focus:ring-blue-500 outline-none"

/>


</div>






<div className="bg-white shadow-xl rounded-xl overflow-hidden">



{
loading ?


<div className="p-8 text-center text-gray-500">

Loading visitors...

</div>



:


<table className="w-full">


<thead className="bg-blue-600 text-white">


<tr>

<th className="p-3 text-left">
Visitor
</th>

<th className="p-3 text-left">
Mobile
</th>

<th className="p-3 text-left">
Company
</th>

<th className="p-3 text-left">
Employee
</th>

<th className="p-3 text-left">
Date
</th>

<th className="p-3 text-left">
Purpose
</th>

<th className="p-3 text-left">
Status
</th>

<th className="p-3 text-left">
Actions
</th>


</tr>


</thead>





<tbody>



{
filteredVisitors.length === 0 ?


<tr>

<td
colSpan="8"
className="text-center py-8 text-gray-500"
>

No visitors found

</td>

</tr>



:



filteredVisitors.map(visitor=>(


<tr

key={visitor._id}

className="border-b hover:bg-gray-50"

>



<td className="p-3 font-semibold">

{visitor.name}

</td>




<td className="p-3">

{visitor.mobile}

</td>





<td className="p-3">

{visitor.company || "-"}

</td>





<td className="p-3">

{visitor.employeeToVisit?.name || "-"}

</td>





<td className="p-3">

{
new Date(visitor.visitDate)
.toLocaleDateString()
}

</td>





<td className="p-3">

{visitor.purpose}

</td>






<td className="p-3">


<span

className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(visitor.status)}`}

>

{visitor.status}

</span>


</td>






<td className="p-3 space-x-2">



{/* APPROVE / REJECT */}

{

(user?.role==="Employee" ||
user?.role==="Administrator")

&&

visitor.status==="PENDING"

&&

<>


<button

onClick={()=>updateStatus(visitor._id,"APPROVED")}

className="bg-green-600 text-white px-3 py-1 rounded-lg"

>

Approve

</button>



<button

onClick={()=>updateStatus(visitor._id,"REJECTED")}

className="bg-red-600 text-white px-3 py-1 rounded-lg"

>

Reject

</button>


</>

}







{/* CHECK IN */}

{

(user?.role==="Receptionist" ||
user?.role==="Administrator")

&&

visitor.status==="APPROVED"

&&


<button

onClick={()=>checkIn(visitor._id)}

className="bg-blue-600 text-white px-3 py-1 rounded-lg"

>

Check In

</button>


}







{/* CHECK OUT */}

{

(user?.role==="Receptionist" ||
user?.role==="Administrator")

&&

visitor.status==="CHECKED_IN"

&&


<button

onClick={()=>checkOut(visitor._id)}

className="bg-gray-700 text-white px-3 py-1 rounded-lg"

>

Check Out

</button>


}





</td>





</tr>


))


}



</tbody>



</table>


}



</div>


</div>

);


};


export default VisitorList;