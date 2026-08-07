import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import {
  Users,
  UserCheck,
  Clock,
  LogIn,
  UserPlus,
  XCircle
} from "lucide-react";


const Dashboard = () => {


  const { user } = useAuth();


  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);



  const fetchDashboard = async () => {

    try {

      const response = await api.get(
        "/dashboard"
      );


      setStats(response.data);


    } catch(error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchDashboard();

  },[]);







  const adminCards = [

    {
      title:"Total Employees",
      value:stats.totalEmployees || 0,
      color:"bg-blue-600",
      icon:<Users/>
    },

    {
      title:"Total Visitors",
      value:stats.totalVisitors || 0,
      color:"bg-green-600",
      icon:<UserPlus/>
    },

    {
      title:"Pending Requests",
      value:stats.pendingRequests || 0,
      color:"bg-orange-500",
      icon:<Clock/>
    },

    {
      title:"Today's Visitors",
      value:stats.todayVisitors || 0,
      color:"bg-purple-600",
      icon:<UserCheck/>
    },

    {
      title:"Visitors Inside",
      value:stats.visitorsInside || 0,
      color:"bg-indigo-600",
      icon:<LogIn/>
    }

  ];






  const receptionistCards = [

    {
      title:"Today's Visitors",
      value:stats.todayVisitors || 0,
      color:"bg-blue-600",
      icon:<Users/>
    },

    {
      title:"Pending Check-In",
      value:stats.pendingCheckIns || 0,
      color:"bg-orange-500",
      icon:<Clock/>
    },

    {
      title:"Checked-In Visitors",
      value:stats.checkedInVisitors || 0,
      color:"bg-green-600",
      icon:<LogIn/>
    }

  ];







  const employeeCards = [

    {
      title:"Pending Approvals",
      value:stats.pendingApprovals || 0,
      color:"bg-orange-500",
      icon:<Clock/>
    },


    {
      title:"Approved Today",
      value:stats.approvedToday || 0,
      color:"bg-green-600",
      icon:<UserCheck/>
    },


    {
      title:"Rejected Today",
      value:stats.rejectedToday || 0,
      color:"bg-red-600",
      icon:<XCircle/>
    }

  ];







  let cards=[];


  if(user?.role==="Administrator")
  {
    cards=adminCards;
  }


  else if(user?.role==="Receptionist")
  {
    cards=receptionistCards;
  }


  else if(user?.role==="Employee")
  {
    cards=employeeCards;
  }







  return (

    <div className="space-y-6">



      <div className="
        bg-white
        rounded-xl
        shadow
        p-6
      ">

        <h1 className="
          text-2xl
          font-bold
          text-gray-800
        ">

          Welcome, {user?.name || "User"}

        </h1>


        <p className="
          text-gray-500
          mt-2
        ">

          Visitor Management System Dashboard

        </p>


        <p className="
          mt-3
          text-sm
          text-blue-600
          font-semibold
        ">

          Role : {user?.role}

        </p>


      </div>







      {
        loading ?


        (

          <div className="
            bg-white
            rounded-xl
            shadow
            p-10
            text-center
          ">

            Loading dashboard...

          </div>

        )


        :


        (

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          xl:grid-cols-5
          gap-6
        ">


        {

        cards.map((card,index)=>(


          <div

            key={index}

            className={`
              ${card.color}
              text-white
              rounded-xl
              shadow-lg
              p-6
              flex
              justify-between
              items-center
            `}

          >

            <div>


              <h2 className="
                text-sm
                font-medium
                opacity-90
              ">

                {card.title}

              </h2>



              <p className="
                text-4xl
                font-bold
                mt-3
              ">

                {card.value}

              </p>


            </div>



            <div className="
              bg-white/20
              p-3
              rounded-full
            ">

              {card.icon}

            </div>



          </div>


        ))

        }


        </div>

        )

      }



    </div>

  );

};


export default Dashboard;