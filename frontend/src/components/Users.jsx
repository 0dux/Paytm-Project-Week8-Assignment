import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  //debouncing
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Contacts</h1>
      <input
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Users"
        type="text"
        className="w-full border border-gray-300 rounded-2xl mt-3 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {users.map((user) => {
        return (
          <div
            key={user._id}
            className="flex justify-between items-center mt-4"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
            <button
              onClick={() =>
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
              }
              className="bg-green-600 px-2 hover:scale-105 py-1 duration-200 rounded-2xl text-white hover:bg-green-500"
            >
              Send Money
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
