import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
  });

  const navigate = useNavigate();
  const { contactId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/contacts/${contactId}`)
      .then((res) => {
        if (res.data) {
          const contact = res.data;
          setValues({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phoneNumber: contact.phoneNumber,
            country: contact.country,
            city: contact.city,
          });
        } else {
          console.error("Неочікуваний формат даних:", res.data);
          setError("Помилка формату даних");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Не вдалося отримати дані");
        setLoading(false);
      });
  }, [contactId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/contacts/${contactId}`, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Не вдалося оновити дані");
      });
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen bg-thistle bg-opacity-25 flex flex-col justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-xl bg-yellow-50 p-6 rounded-lg shadow-lg shadow-slate-400"
      >
        <h2 className="text-3xl text-pink-900 font-bold text-center italic underline decoration-4 decoration-dotted decoration-pink-800/20 mb-6 uppercase">
          Update Contact
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
            id="firstName"
            value={values.firstName}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                firstName: e.target.value,
              })
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
            id="lastName"
            value={values.lastName}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                lastName: e.target.value,
              })
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
            type="email"
            id="email"
            value={values.email}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="text-[20px] font-bold text-purple-800"
          >
            Phone
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={values.phoneNumber}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                phoneNumber: e.target.value,
              })
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
            id="country"
            value={values.country}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                country: e.target.value,
              })
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
            id="city"
            value={values.city}
            className="w-full p-2 border border-gray-300 rounded text-gray-400 text-2xl hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:text-gray-900"
            onChange={(e) =>
              setValues({
                ...values,
                city: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-[150px] px-2 py-2 bg-green-600 text-xl text-yellow-100 font-bold rounded-3xl hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto shadow-lg shadow-slate-400"
          >
            Update
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
  );
}
