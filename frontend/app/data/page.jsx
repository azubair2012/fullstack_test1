"use client";
import React, { useState } from "react";
import Link from "next/link";

const Datapull = () => {
  const [response, setResponse] = useState(null);

  //handle change
  const submitContact = async (event) => {
    event.preventDefault();
    const country = event.target.name.value;
    const res = await fetch("http://localhost:5000/data", {
      body: JSON.stringify({
        country: country,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
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
      setResponse(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href="/">Back to Home</Link>
      <button
        onClick={getData}
        className="w-32 h-16 rounded-lg bg-slate-500 text-white"
      >
        Fetch Data
      </button>
      {response && <div>{JSON.stringify(response)}</div>}
      <button
        onClick={() => {
          setResponse(null);
        }}
        className="w-32 h-16 rounded-lg bg-slate-500 text-white"
      >
        Clear Data
      </button>
      {/* form data */}
      <form className="flex flex-col" onSubmit={submitContact}>
        <input
          className="mb-4 border-b-2"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
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
  );
};

export default Datapull;
