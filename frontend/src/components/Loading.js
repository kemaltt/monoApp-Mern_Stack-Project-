import React from "react";

export default function Loading() {
  return (
    <div className="mt-5">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h2>Loading...</h2>
    </div>
  );
}
