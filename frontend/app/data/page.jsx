"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Result from "./../../components/Result";
import Animation from "./../../components/Animation";

const Datapull = () => {
  const [response, setResponse] = useState();
  const [result, setResult] = useState("");
  const [deleted, setDeleted] = useState();
  const [updateResult, setUpdateResult] = useState("");
  const [countries, setCountries] = useState([]);
  let nameRef = useRef(null);
  let rankRef = useRef(null);
  let updateName = useRef(null);
  let updateRank = useRef(null);
  let deleteRef = useRef(null);

  //handle change
  const submitData = async (event) => {
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
  //updating data
  const handleUpdate = async (event) => {
    event.preventDefault();
    let name = updateName.current.value;
    let rank = updateRank.current.value;
    if (name == "" && rank == "") {
      alert("Enter a name please.");
    } else {
      try {
        const response = await fetch(`http://localhost:5000/data/${name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            rank: rank,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setUpdateResult(result);
          updateRank.current.value = "";
          updateName.current.value = "";
        } else {
          console.error("Failed to update data");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  //reading data
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
    } catch (error) {
      console.log(error);
    }
  };

  //deleting data
  const handleDelete = async () => {
    let deletedValue = deleteRef.current.value;
    if (deletedValue == "") {
      alert("Enter a name please.");
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/data/${deletedValue}`,
          {
            method: "DELETE",
          }
        );

        const deletedResult = await response.json();
        setDeleted(deletedResult);
        if (response.ok) {
          // Data deleted successfully, perform any necessary UI updates
          deleteRef.current.value = "";
        } else {
          console.error("Failed to delete data");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  //Clean up function
  const clearData = (event) => {
    setResponse(null);
    setResult("");
    setDeleted("");
    setUpdateResult("");
  };

  return (
    <div>
      <h1 className="text-center font-extrabold text-5xl">CRUD Operations</h1>
      <br />
      <p className="text-center mx-[10vw] lg:mx-[20vw] text-xl">
        Excuse the UI/UX. This application is a demonstration of CRUD operation
        using MERN stack. In no way, shape or form it represents the design
        capability of the programmer. Asthetic aspect has not been the priority
        in this project.
      </p>

      <br />
      <div className="flex justify-center items-center h-full gap-4">
        <div className=" flex flex-col items-center border-black rounded-3xl border-4 p-6">
          <Result
            data={response}
            delete={deleted}
            input={result}
            update={updateResult}
          />
        </div>
        <div className="flex flex-col justify-center items-center border-black rounded-3xl border-4 p-6">
          <div className="flex w-[250px] border-2 border-gray-700 rounded-md bg-blue-500 justify-center items-center mb-4">
            <button
              onClick={getData}
              className="my-4 px-4 py-2 font-bold rounded-full bg-white text-black"
            >
              Fetch Data
            </button>
          </div>

          {/* deleting form */}

          <div className="flex flex-col border-2 border-gray-700 rounded-md bg-slate-600 justify-center items-center">
            <input
              className="my-4 border-4 rounded-xl border-blue-500 h-10 text-center"
              id="deletedName"
              name="name"
              type="text"
              placeholder="Delete Data"
              ref={deleteRef}
            />
            <button
              onClick={handleDelete}
              className="mb-4  px-4 py-2 font-bold rounded-full bg-red-700 text-white"
            >
              Delete Data
            </button>
          </div>
          <button
            onClick={clearData}
            className="mt-6 px-4 py-2 font-bold rounded-full bg-slate-500 text-white"
          >
            Clear Data
          </button>
          {/* Updating form */}

          <div className="mt-6 flex flex-col border-2 border-gray-500 rounded-md bg-orange-400 justify-center items-center">
            <input
              className="text-center my-4 border-4 rounded-xl border-blue-500 h-10"
              id="cName"
              name="name"
              type="text"
              placeholder="Country"
              ref={updateName}
            />{" "}
            <input
              className="text-center border-4 rounded-xl border-blue-500 h-10"
              id="cRank"
              name="name"
              type="number"
              placeholder="Updated rank"
              ref={updateRank}
            />
            <button
              onClick={handleUpdate}
              className="mb-4 mt-6 px-4 py-2 font-bold rounded-full bg-red-700 text-white"
            >
              Update Data
            </button>
          </div>

          {/* form data */}
          <div className="mt-6 flex flex-col border-2 border-gray-500 rounded-md bg-slate-950 justify-center items-center">
            <form className="flex flex-col" onSubmit={submitData}>
              <input
                className="text-center mb-2 mt-4 border-4 rounded-xl border-blue-500 h-10"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                ref={nameRef}
                required
              />
              <input
                className="text-center my-2 border-4 rounded-xl border-blue-500 h-10"
                id="rank"
                name="rank"
                type="number"
                placeholder="Rank"
                ref={rankRef}
                required
              />
              <button
                type="submit"
                className="mb-4 mt-4 px-4 py-2 font-bold rounded-full bg-blue-500 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* <div className="w-[250px] h-[500px] flex flex-col items-center border-black rounded-3xl border-4 p-6">
          <Animation />
        </div> */}
      </div>
    </div>
  );
};

export default Datapull;
