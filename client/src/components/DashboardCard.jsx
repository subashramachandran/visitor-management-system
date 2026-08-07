const DashboardCard = ({ title, value, color = "blue" }) => {

  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
  };

  return (
    <div className={`${colors[color]} text-white rounded-xl p-6 shadow`}>
      <h3 className="text-sm font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;