import React from "react";

const Spinner = () => {
    return (
        <div>
            <svg
                stroke="#000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary h-14 w-14"
            >
                <g className="spinner_V8m1">
                    <circle
                        stroke="currentColor"
                        cx="12"
                        cy="12"
                        r="9.5"
                        fill="none"
                        strokeWidth="2.5"
                    ></circle>
                </g>
            </svg>
        </div>
    );
};

export default Spinner;
