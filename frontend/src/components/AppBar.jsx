import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppBar = ({ userName }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Drop down menu which closes when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    // Add event listener while mounting the component
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // and remove it when unmounting
      // This prevents memory leaks
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 hover:bg-blue-700 duration-500 flex justify-between items-center bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">Payments App</h1>
      <div ref={menuRef} className="relative flex items-center space-x-4">
        <p className="font-bold hover:scale-110 duration-200">
          Hello, {userName}
        </p>
        <div
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer justify-center items-center bg-blue-600 rounded-full h-8 w-8 hover:scale-110 duration-200"
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        {open && (
          <div
            onClick={() => {
              localStorage.removeItem("token");
              //useNavigate hook to redirect to signup page
              navigate("/signup", { replace: true });
            }}
          >
            <ul className="absolute w-fit right-0 bg-white text-black rounded-lg shadow-lg mt-4 ">
              <li className="px-4 rounded-lg py-2 hover:bg-gray-200 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
