import React from "react";

const Result = (props) => {
  let data = props.data;
  let deleted = props.delete;
  let input = props.input;
  let update = props.update;
  return (
    <>
      <div className="flex gap-4 text-lg font-bold border-b-4 mb-2">
        <h1>Country name</h1>
        <h1>Rank</h1>
      </div>
      <div>
        {data?.map((country) => {
          return (
            <div className="flex  items-center border-b-2 relative">
              <p className="pr-12" key={country}>
                {country.name}
              </p>
              <p className=" -right-4 absolute ">{country.rank}</p>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <h1 className="font-bold text-xl border-b-4 mt-6">Message</h1>
        <p className="mt-2 text-red-700 font-semibold w-[200px]">
          {deleted?.message || input.message || update.message}
        </p>
        <p className="mt-4 w-[200px]">
          Press{" "}
          <span className="px-4 py-2 font-bold rounded-full bg-green-900 text-white">
            Fetch Data
          </span>{" "}
          button for updated result.
        </p>
      </div>
      {/* clear button */}
      <div className="border-t-4 mt-4">
        <button
          onClick={props.onClick}
          className="shadow-xl mt-2 px-4 py-2 font-bold rounded-full bg-red-700 text-white"
        >
          Clear Data
        </button>
      </div>
    </>
  );
};

export default Result;
