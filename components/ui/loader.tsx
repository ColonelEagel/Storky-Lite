"use client";

import { ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="h-screen">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};
