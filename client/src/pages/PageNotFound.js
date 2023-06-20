import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-2">
            <div className="text-8xl font-bold">404</div>
            <div className="text-4xl">Oops! Page Not Found</div>
            <div
                onClick={() => {
                    navigate(-1);
                }}
                className="text-2xl border-black border-2 rounded-md p-2 select-none cursor-pointer"
            >
                Go Back
            </div>
        </div>
    );
};

export default PageNotFound;
