import { useEffect, useState } from "react";
import api from "../services/api";


const CheckOut = () => {


  const [visitors, setVisitors] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [checkoutId, setCheckoutId] = useState(null);







  const fetchVisitors = async()=>{


    try{


      const response =
      await api.get("/visitors");



      const checkedInVisitors =
      response.data.filter(

        visitor =>
        visitor.status === "CHECKED_IN"

      );



      setVisitors(checkedInVisitors);



    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }


  };









  useEffect(()=>{

    fetchVisitors();

  },[]);









  const checkOutVisitor = async(id)=>{


    try{


      setCheckoutId(id);



      await api.put(
        `/visitors/${id}/checkout`
      );



      alert(
        "Visitor Checked Out Successfully"
      );



      fetchVisitors();



    }
    catch(error){


      alert(

        error.response?.data?.message ||
        "Check Out Failed"

      );


    }
    finally{


      setCheckoutId(null);


    }


  };









  const filteredVisitors =
  visitors.filter(visitor =>


    visitor.name
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )


    ||

    visitor.mobile
    ?.includes(search)


  );









  return (


<div className="p-6">



<h1 className="
text-3xl
font-bold
text-gray-800
mb-6
">

Visitor Check Out

</h1>








<div className="mb-5">


<input


type="text"


placeholder="Search visitor..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}


className="
border
rounded-lg
p-3
w-80
focus:ring-2
focus:ring-blue-500
outline-none
"


/>


</div>









<div className="
bg-white
shadow-xl
rounded-xl
overflow-x-auto
">







{

loading ?


(

<div className="
p-8
text-center
text-gray-500
">

Loading visitors...

</div>

)



:


filteredVisitors.length===0 ?



(

<div className="
p-8
text-center
text-gray-500
">

No visitors currently inside

</div>


)



:


<table className="w-full">



<thead className="
bg-gray-700
text-white
">


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
Check In Time
</th>


<th className="p-3 text-left">
Action
</th>


</tr>


</thead>








<tbody>



{

filteredVisitors.map(visitor=>(



<tr

key={visitor._id}

className="
border-b
hover:bg-gray-50
"

>



<td className="
p-3
font-semibold
">

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

{

visitor.checkInTime

?

new Date(
visitor.checkInTime
)
.toLocaleString()

:

"-"

}


</td>








<td className="p-3">


<button


disabled={
checkoutId===visitor._id
}


onClick={()=>checkOutVisitor(visitor._id)}


className="
bg-gray-700
hover:bg-gray-800
text-white
px-4
py-2
rounded-lg
disabled:opacity-50
"


>


{

checkoutId===visitor._id

?

"Checking Out..."

:

"Check Out"

}



</button>


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


export default CheckOut;