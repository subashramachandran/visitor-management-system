const SearchBox = ({ value, onChange, placeholder="Search..." }) => {

  return (
    <input
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder={placeholder}
      className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
};

export default SearchBox;