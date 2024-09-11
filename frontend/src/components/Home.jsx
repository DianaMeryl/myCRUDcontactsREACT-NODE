import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let deleteId = null;

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts")
      .then((res) => {
        if (res.data) {
          const contactsArray = Object.values(res.data);
          setData(contactsArray);
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
  }, []);

  const handleDelete = (id) => {
    deleteId = id;
    openModal();
  };

  function openModal() {
    document.getElementById("deleteModal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("deleteModal").classList.add("hidden");
  }

  function confirmDelete() {
    if (deleteId !== null) {
      axios
        .delete(`http://localhost:3000/contacts/${deleteId}`)
        .then((res) => {
          console.log("Елемент видалено", res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          closeModal();
          deleteId = null;
        });
    }
  }

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen bg-thistle bg-opacity-25">
      <div className="w-full mx-auto p-4 flex flex-col justify-center items-center">
        <h2 className="text-3xl text-pink-900 font-bold text-center italic underline decoration-4 decoration-dotted decoration-pink-800/20 mb-24 uppercase">
          All Contacts
        </h2>
        <table className="w-full bg-rebeccaPurple border border-gray-200 rounded-lg shadow-md">
          <thead className="text-teal-100 text-2xl font-bold">
            <tr className="divide-x divide-black">
              <th className="px-6 py-6 border-b">FirstName</th>
              <th className="px-6 py-6 border-b">LastName</th>
              <th className="px-6 py-6 border-b">Email</th>
              <th className="px-6 py-6 border-b">PhoneNumber</th>
              <th className="px-6 py-6 border-b">Country</th>
              <th className="px-6 py-6 border-b">City</th>
              <th className="w-[350px] px-6 py-6 border-b"></th>
            </tr>
          </thead>
          <tbody className="bg-yellow-50 mt-3 mb-6 text-2xl text-pink-900 text-center font-bold italic divide-y divide-purple-500">
            {data.map((contact, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-yellow-200 divide-x hover:divide-pink-700"
                >
                  <td className="px-4 py-6">{contact.firstName}</td>
                  <td className="px-4 py-2">{contact.lastName}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.phoneNumber}</td>
                  <td className="px-4 py-2">{contact.country}</td>
                  <td className="px-4 py-2">{contact.city}</td>
                  <td className="flex flex-row justify-between py-4">
                    <Link
                      to={`/read/${contact.contactId}`}
                      className="w-[100px] px-2 py-2 bg-blue-500 text-yellow-100 rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/edit/${contact.contactId}`}
                      className="w-[100px] px-2 py-2 bg-green-500 text-yellow-100 rounded-3xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Edit
                    </Link>
                    <button
                      className="w-[100px] px-2 py-2 bg-red-500 text-yellow-100 rounded-3xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleDelete(contact.contactId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          id="deleteModal"
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center hidden"
        >
          <div className="bg-yellow-50 p-6 text-center border-8 border-yellow-300 rounded-xl shadow-lg">
            <h2 className="text-4xl font-semibold mb-4">
              Підтвердження видалення
            </h2>
            <p className="mb-6 text-3xl">
              Ви впевнені, що хочете видалити цей контакт?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => closeModal()}
                className="bg-green-100 text-2xl text-gray-700 font-bold px-4 py-2 rounded shadow-lg shadow-slate-400"
              >
                Скасувати
              </button>
              <button
                onClick={() => confirmDelete()}
                className="bg-red-500 text-2xl text-white font-bold px-4 py-2 rounded shadow-lg shadow-slate-400"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-6 text-2xl text-teal-600 font-bold text-end uppercase mr-24 mt-16">
        <Link
          to="/create"
          className="w-[300px] px-2 py-4 bg-richlilac text-2xl text-yellow-100 text-center font-bold rounded-2xl hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mx-auto"
        >
          Add Contact
        </Link>
      </div>
    </div>
  );
}
