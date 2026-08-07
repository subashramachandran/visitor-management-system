import { useEffect, useState } from "react";
import api from "../services/api";


const ActivityHistory = () => {


  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);





  const fetchActivities = async()=>{


    try{


      const response =
      await api.get("/activities");


      setActivities(response.data);



    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }


  };







  useEffect(()=>{

    fetchActivities();

  },[]);







  const actionColor = (action)=>{


    switch(action){


      case "CREATED":

        return "bg-blue-100 text-blue-700";



      case "APPROVED":

        return "bg-green-100 text-green-700";



      case "REJECTED":

        return "bg-red-100 text-red-700";



      case "CHECKED_IN":

        return "bg-purple-100 text-purple-700";



      case "CHECKED_OUT":

        return "bg-gray-100 text-gray-700";



      default:

        return "bg-gray-100 text-gray-700";


    }


  };








return (


<div className="p-6">



<h1 className="text-3xl font-bold text-gray-800 mb-6">

Activity History

</h1>







<div className="bg-white shadow-xl rounded-xl overflow-hidden">



{

loading ?


(

<div className="p-8 text-center text-gray-500">

Loading activities...

</div>

)



:



activities.length === 0 ?


(

<div className="p-8 text-center text-gray-500">

No activities found

</div>

)



:



<table className="w-full">



<thead className="bg-gray-800 text-white">


<tr>


<th className="p-3 text-left">
Visitor
</th>


<th className="p-3 text-left">
Action
</th>


<th className="p-3 text-left">
Performed By
</th>


<th className="p-3 text-left">
Remarks
</th>


<th className="p-3 text-left">
Date
</th>


</tr>


</thead>








<tbody>



{

activities.map(activity=>(



<tr

key={activity._id}

className="border-b hover:bg-gray-50"

>



<td className="p-3">


{

activity.visitorId?.name ||

"-"

}


</td>







<td className="p-3">


<span

className={`px-3 py-1 rounded-full text-sm font-semibold ${actionColor(activity.action)}`}

>

{activity.action}

</span>


</td>







<td className="p-3">


{

activity.performedBy?.name ||

"-"

}


</td>







<td className="p-3">

{activity.remarks || "-"}

</td>







<td className="p-3">


{

new Date(
activity.createdAt
)
.toLocaleString()

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


export default ActivityHistory;