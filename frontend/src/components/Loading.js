import React from "react";

export default function Loading() {
  return (
    <div className="mt-5">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h2>Loading...</h2>
    </div>
  );
}
