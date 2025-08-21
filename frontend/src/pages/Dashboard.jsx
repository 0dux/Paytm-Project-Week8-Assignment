import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import DisplayBalance from "../components/DisplayBalance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
        setFirstName(response.data.firstName);
      })
      .catch((error) => {
        console.error("There was an error fetching the balance!", error);
      });
  }, []);

  return (
    <div>
      <AppBar userName={firstName} />
      <DisplayBalance Balance={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
