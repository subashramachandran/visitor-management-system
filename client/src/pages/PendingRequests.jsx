import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";


const PendingRequests = () => {


  const { user } = useAuth();


  const [visitors, setVisitors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  const [remarks, setRemarks] = useState({});





  const fetchRequests = async()=>{

    try{

      const response =
      await api.get("/visitors");


      const pending =
      response.data.filter(
        visitor =>
        visitor.status === "PENDING"
      );


      setVisitors(pending);


    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };







  useEffect(()=>{

    fetchRequests();

  },[]);








  const updateStatus = async(id,status)=>{


    try{


      setActionLoading(id);



      await api.put(

        `/visitors/${id}/status`,

        {

          status,

          remarks:
          remarks[id] ||
          `Visitor ${status.toLowerCase()}`

        }

      );



      setRemarks({

        ...remarks,

        [id]:""

      });



      fetchRequests();



    }
    catch(error){


      alert(

        error.response?.data?.message ||
        "Update failed"

      );


    }
    finally{


      setActionLoading(null);


    }


  };









  return (


<div className="p-6">



<h1 className="
text-3xl
font-bold
text-gray-800
mb-6
">

Pending Visitor Requests

</h1>







<div className="
bg-white
rounded-xl
shadow-lg
overflow-x-auto
">



{

loading ?


(

<div className="
p-10
text-center
text-gray-500
">

Loading requests...

</div>

)



:


visitors.length===0 ?



(

<div className="
p-10
text-center
text-gray-500
">

No pending visitor requests

</div>

)



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
Employee
</th>


<th className="p-3 text-left">
Purpose
</th>


<th className="p-3 text-left">
Remarks
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>






<tbody>



{

visitors.map(visitor=>(


<tr

key={visitor._id}

className="
border-b
hover:bg-gray-50
"

>



<td className="p-3 font-semibold">

{visitor.name}

</td>





<td className="p-3">

{visitor.mobile}

</td>






<td className="p-3">

{
visitor.employeeToVisit?.name ||
"-"
}

</td>






<td className="p-3">

{visitor.purpose}

</td>







<td className="p-3">


<input

type="text"

placeholder="Remarks"

value={
remarks[visitor._id] || ""
}

onChange={(e)=>

setRemarks({

...remarks,

[visitor._id]:
e.target.value

})

}


className="
border
rounded-lg
p-2
w-44
"

/>


</td>








<td className="p-3">


{

(user?.role==="Employee" ||
user?.role==="Administrator")

&&


<div className="
flex
gap-2
">


<button


disabled={
actionLoading===visitor._id
}


onClick={()=>updateStatus(

visitor._id,

"APPROVED"

)}


className="
bg-green-600
text-white
px-3
py-2
rounded-lg
hover:bg-green-700
disabled:opacity-50
"

>

{

actionLoading===visitor._id

?

"Updating..."

:

"Approve"

}


</button>








<button


disabled={
actionLoading===visitor._id
}


onClick={()=>updateStatus(

visitor._id,

"REJECTED"

)}


className="
bg-red-600
text-white
px-3
py-2
rounded-lg
hover:bg-red-700
disabled:opacity-50
"

>

Reject

</button>



</div>


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


export default PendingRequests;