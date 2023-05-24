import React from "react";

const SubmitButton = ({ status = "none", children }) => {
  return (
    <>
      {status === "none" && (
        <button type="submit" className="btn btn-primary">
          {children}
        </button>
      )}
      {status === "loading" && (
        <button className="btn btn-primary" disabled>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin w-10 h-10 mx-auto"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      )}
      {status === "success" && (
        <button className="btn btn-primary" type="button">
          {children}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
