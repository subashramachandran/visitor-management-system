import { useEffect, useState } from "react";
import api from "../services/api";


const Reports = () => {


  const [visitors,setVisitors] = useState([]);

  const [filteredVisitors,setFilteredVisitors] = useState([]);

  const [fromDate,setFromDate] = useState("");

  const [toDate,setToDate] = useState("");

  const [loading,setLoading] = useState(true);





  const fetchVisitors = async()=>{

    try{


      const response =
      await api.get("/visitors");


      setVisitors(response.data);

      setFilteredVisitors(response.data);



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







  const generateReport = ()=>{


    let data = visitors;



    if(fromDate){

      data =
      data.filter(visitor=>

        new Date(visitor.visitDate)
        >=
        new Date(fromDate)

      );

    }




    if(toDate){

      data =
      data.filter(visitor=>

        new Date(visitor.visitDate)
        <=
        new Date(toDate)

      );

    }



    setFilteredVisitors(data);


  };








  const totalVisitors =
  filteredVisitors.length;



  const pending =
  filteredVisitors.filter(
    v=>v.status==="PENDING"
  ).length;



  const approved =
  filteredVisitors.filter(
    v=>v.status==="APPROVED"
  ).length;



  const inside =
  filteredVisitors.filter(
    v=>v.status==="CHECKED_IN"
  ).length;







return (


<div className="p-6">



<h1 className="text-3xl font-bold text-gray-800 mb-6">

Visitor Reports

</h1>







<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">



<div className="bg-blue-600 text-white rounded-xl p-5 shadow">

<p className="text-sm">

Total Visitors

</p>


<h2 className="text-3xl font-bold">

{totalVisitors}

</h2>


</div>







<div className="bg-yellow-500 text-white rounded-xl p-5 shadow">

<p className="text-sm">

Pending Requests

</p>


<h2 className="text-3xl font-bold">

{pending}

</h2>


</div>








<div className="bg-green-600 text-white rounded-xl p-5 shadow">

<p className="text-sm">

Approved Visits

</p>


<h2 className="text-3xl font-bold">

{approved}

</h2>


</div>








<div className="bg-purple-600 text-white rounded-xl p-5 shadow">

<p className="text-sm">

Visitors Inside

</p>


<h2 className="text-3xl font-bold">

{inside}

</h2>


</div>



</div>









<div className="bg-white rounded-xl shadow p-6 mb-6">



<h2 className="text-xl font-bold mb-4">

Generate Report

</h2>





<div className="flex flex-wrap gap-4">



<input

type="date"

value={fromDate}

onChange={(e)=>
setFromDate(e.target.value)
}

className="border p-3 rounded-lg"

/>





<input

type="date"

value={toDate}

onChange={(e)=>
setToDate(e.target.value)
}

className="border p-3 rounded-lg"

/>





<button

onClick={generateReport}

className="bg-blue-600 text-white px-6 rounded-lg"

>

Generate

</button>



</div>



</div>








<div className="bg-white rounded-xl shadow overflow-hidden">



{

loading ?


<div className="p-8 text-center">

Loading reports...

</div>



:


<table className="w-full">



<thead className="bg-gray-800 text-white">


<tr>


<th className="p-3 text-left">
Visitor
</th>


<th className="p-3 text-left">
Company
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


</tr>


</thead>





<tbody>



{

filteredVisitors.map(visitor=>(



<tr

key={visitor._id}

className="border-b hover:bg-gray-50"

>


<td className="p-3">

{visitor.name}

</td>


<td className="p-3">

{visitor.company || "-"}

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

<span className="px-3 py-1 bg-gray-100 rounded-full">

{visitor.status}

</span>

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


export default Reports;