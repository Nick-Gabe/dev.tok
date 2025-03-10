import { ArrowLeft } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  // ADD SEARCH LOGIC

  const returnHandler = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={returnHandler}
        className="block mr-auto p-6"
      >
        <ArrowLeft size={32} color="#fff" />
      </button>
    </div>
  )
}
