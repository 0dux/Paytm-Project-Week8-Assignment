import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const handleTransfer = async () => {
    try {
      if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
      }

      console.log(`Transferring ${amount} to ${name} with ID ${id}`);

      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { to: id, amount: parseInt(amount, 10) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(res.data.message || "Transfer successful ✅");
    } catch (err) {
      console.error("Transfer failed ❌", err.response?.data || err.message);
      alert(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-300">
      <div className="p-6 bg-gray-200 rounded-2xl h-2/4 w-2/5">
        <Header title={"Send Money"} />
        <div className="mx-6 mt-6 flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full text-xl font-bold text-white bg-blue-400 flex items-center justify-center">
            {name[0].toUpperCase()}
          </div>
          <p className="text-2xl font-bold">{name}</p>
        </div>
        <div className="mx-6 mt-4">
          <InputBox
            onChange={(e) => setAmount(e.target.value)}
            title={"Amount in (Rs)"}
            placeholder={"Enter amount"}
          />
        </div>
        <div className="mx-6 mt-4">
          <Button onClick={handleTransfer} title={"Initiate Transfer"} />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
