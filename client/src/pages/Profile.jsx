import { useAuth } from '../context/AuthContext';

const Profile = () => {

  const { user } = useAuth();


  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold mb-4">
        Profile
      </h1>

      <p>
        Name: {user?.name}
      </p>

      <p>
        Role: {user?.role}
      </p>

      <p>
        Email: {user?.email}
      </p>

    </div>
  );
};

export default Profile;