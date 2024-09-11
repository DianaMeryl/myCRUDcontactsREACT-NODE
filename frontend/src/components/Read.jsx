import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Read() {
  const [contact, setContact] = useState(null);
  const { contactId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/contacts/${contactId}`)
      .then((res) => {
        if (res.data) {
          setContact(res.data);
          console.log(res.data);
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

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen bg-thistle bg-opacity-25 flex flex-col justify-center items-center">
      <div className="w-full mx-auto p-4">
        {contact && (
          <div>
            <h2 className="text-3xl text-pink-900 font-bold text-center italic underline decoration-4 decoration-dotted decoration-pink-800/20 mb-24 uppercase">
              Contact Details
            </h2>
            <table className="w-full bg-indigo-200 border border-gray-200 rounded-lg shadow-md">
              <thead className="text-indigo-900 text-2xl font-bold">
                <tr className="divide-x divide-pink-700">
                  <th className="px-6 py-6 border-b">FirstName</th>
                  <th className="px-6 py-6 border-b">LastName</th>
                  <th className="px-6 py-6 border-b">Email</th>
                  <th className="px-6 py-6 border-b">PhoneNumber</th>
                  <th className="px-6 py-6 border-b">Country</th>
                  <th className="px-6 py-6 border-b">City</th>
                </tr>
              </thead>
              <tbody className="bg-red-100 mt-3 mb-6 text-2xl text-pink-900 text-center font-bold italic divide-y divide-purple-500">
                <tr className="divide-x divide-pink-700">
                  <td className="px-4 py-6">{contact.firstName}</td>
                  <td className="px-4 py-6">{contact.lastName}</td>
                  <td className="px-4 py-6">{contact.email}</td>
                  <td className="px-4 py-6">{contact.phoneNumber}</td>
                  <td className="px-4 py-6">{contact.country}</td>
                  <td className="px-4 py-6">{contact.city}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3 mb-6 text-2xl text-teal-600 font-bold text-end uppercase mr-24 mt-16">
              <Link
                to="/"
                className="w-[100px] px-8 py-2 bg-teal-600 text-yellow-100 font-bold rounded-3xl hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto shadow-lg shadow-slate-400"
              >
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
