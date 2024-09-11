import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/contacts", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("Контакт уже існує");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="w-screen h-screen bg-thistle bg-opacity-25 flex flex-col justify-center items-center">
      <div className="w-full  flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-yellow-50 p-6 rounded-lg shadow-lg shadow-slate-400"
        >
          <h2 className="text-3xl text-pink-900 font-bold text-center italic underline decoration-4 decoration-dotted decoration-pink-800/20 mb-6 uppercase">
            Add Contact
          </h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="text-[20px] font-bold text-purple-800"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="text-[20px] font-bold text-purple-800"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-[20px] font-bold text-purple-800"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="text-[20px] font-bold text-purple-800"
            >
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter Phone"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="text-[20px] font-bold text-purple-800"
            >
              Country
            </label>
            <input
              type="text"
              placeholder="Enter Country"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) =>
                setValues({ ...values, country: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="text-[20px] font-bold text-purple-800"
            >
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              className="w-full p-2 border border-gray-300 rounded text-2xl hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-purple-800"
              onChange={(e) => setValues({ ...values, city: e.target.value })}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-1">
            <button
              type="submit"
              className="w-[150px] px-2 py-2 bg-green-600 text-xl text-yellow-100 font-bold rounded-3xl hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto shadow-lg shadow-slate-400"
            >
              Add
            </button>
            <Link
              to="/"
              className="w-[150px] px-12 py-2 bg-teal-600 text-xl text-yellow-100 font-bold rounded-3xl hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto shadow-lg shadow-slate-400"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
