import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import VisitorRegistration from "../pages/VisitorRegistration";
import VisitorList from "../pages/VisitorList";
import PendingRequests from "../pages/PendingRequests";
import CheckIn from "../pages/CheckIn";
import CheckOut from "../pages/CheckOut";
import Reports from "../pages/Reports";
import ActivityHistory from "../pages/ActivityHistory";
import UserManagement from "../pages/UserManagement";
import Profile from "../pages/Profile";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";


const AppRoutes = () => {


  return (

    <Routes>


      {/* Public Route */}

      <Route
        path="/login"
        element={<Login />}
      />



      {/* Protected Layout */}

      <Route

        path="/"

        element={

          <ProtectedRoute>

            <MainLayout />

          </ProtectedRoute>

        }

      >



        {/* Dashboard */}

        <Route

          index

          element={<Dashboard />}

        />





        {/* Employees - Admin */}

        <Route

          path="employees"

          element={

            <ProtectedRoute
              roles={[
                "Administrator"
              ]}
            >

              <Employees />

            </ProtectedRoute>

          }

        />






        {/* Visitor Registration */}

        <Route

          path="visitor-registration"

          element={

            <ProtectedRoute

              roles={[
                "Receptionist",
                "Administrator"
              ]}

            >

              <VisitorRegistration />

            </ProtectedRoute>

          }

        />







        {/* Visitor List */}

        <Route

          path="visitors"

          element={

            <ProtectedRoute

              roles={[
                "Receptionist",
                "Employee",
                "Administrator"
              ]}

            >

              <VisitorList />

            </ProtectedRoute>

          }

        />







        {/* Pending Requests */}

        <Route

          path="pending"

          element={

            <ProtectedRoute

              roles={[
                "Employee",
                "Administrator"
              ]}

            >

              <PendingRequests />

            </ProtectedRoute>

          }

        />







        {/* Check In */}

        <Route

          path="check-in"

          element={

            <ProtectedRoute

              roles={[
                "Receptionist",
                "Administrator"
              ]}

            >

              <CheckIn />

            </ProtectedRoute>

          }

        />








        {/* Check Out */}

        <Route

          path="check-out"

          element={

            <ProtectedRoute

              roles={[
                "Receptionist",
                "Administrator"
              ]}

            >

              <CheckOut />

            </ProtectedRoute>

          }

        />







        {/* Reports */}

        <Route

          path="reports"

          element={

            <ProtectedRoute

              roles={[
                "Employee",
                "Administrator"
              ]}

            >

              <Reports />

            </ProtectedRoute>

          }

        />







        {/* Activity History */}

        <Route

          path="activity"

          element={

            <ProtectedRoute

              roles={[
                "Administrator"
              ]}

            >

              <ActivityHistory />

            </ProtectedRoute>

          }

        />








        {/* User Management */}

        <Route

          path="users"

          element={

            <ProtectedRoute

              roles={[
                "Administrator"
              ]}

            >

              <UserManagement />

            </ProtectedRoute>

          }

        />







        {/* Profile */}

        <Route

          path="profile"

          element={<Profile />}

        />



      </Route>






      {/* Unauthorized */}

      <Route

        path="/unauthorized"

        element={<Unauthorized />}

      />






      {/* 404 */}

      <Route

        path="*"

        element={<NotFound />}

      />



    </Routes>

  );

};


export default AppRoutes;