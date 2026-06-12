import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";

export default function SearchBar() {
  const dispatch = useDispatch();

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) =>
          dispatch(setSearchTerm(e.target.value))
        }
      />
    </div>
  );
}