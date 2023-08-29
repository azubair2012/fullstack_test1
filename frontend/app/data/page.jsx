"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

const Datapull = () => {
  const [response, setResponse] = useState();
  const [result, setResult] = useState("");
  let nameRef = useRef(null);
  let rankRef = useRef(null);

  //handle change
  const submitContact = async (event) => {
    event.preventDefault();

    let name = nameRef.current.value;
    let rank = rankRef.current.value;
    const res = await fetch("http://localhost:5000/data", {
      body: JSON.stringify({
        name: name,
        rank: rank,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    setResult(result);
    console.log(result);
    nameRef.current.value = "";
    rankRef.current.value = "";
  };
  //handle change end

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/data", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setResponse(result);
    } catch (error) {
      console.log(error);
    }
  };
  const [countries, setCountries] = useState([]);
  //deleting data
  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/data/1693287402555", {
        method: "DELETE",
      });

      if (response.ok) {
        // Data deleted successfully, perform any necessary UI updates
        setCountries(countries.filter((country) => country.id !== id));
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  //Clean up function
  const clearData = (event) => {
    setResponse(null);
    setResult("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center border-black rounded-3xl border-4 p-6">
        <Link
          href="/"
          className="px-4 py-2 font-bold text-white bg-purple-400 rounded-full hover:bg-purple-700"
        >
          Back to Home
        </Link>
        <button
          onClick={getData}
          className=" my-4 px-4 py-2 font-bold rounded-full bg-slate-500 text-white"
        >
          Fetch Data
        </button>
        {response && <div>{JSON.stringify(response)}</div>}
        <button
          onClick={clearData}
          className="mb-8 px-4 py-2 font-bold rounded-full bg-slate-500 text-white"
        >
          Clear Data
        </button>
        <button
          onClick={handleDelete}
          className="mb-8 px-4 py-2 font-bold rounded-full bg-red-700 text-white"
        >
          Delete Data
        </button>

        <div id="message">{result.message}</div>
        {/* form data */}
        <form className="flex flex-col" onSubmit={submitContact}>
          <input
            className="my-6 border-4 rounded-xl border-blue-500 h-10"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            required
          />
          <input
            className="my-6 border-4 rounded-xl border-blue-500 h-10"
            id="name"
            name="rank"
            type="number"
            placeholder="Rank"
            ref={rankRef}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Datapull;
