import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ILoaderProps } from "../interfaces/MoviesInterface";
import "../css/Search.css";

export default function Header(props: ILoaderProps) {
	const [search, setSearch] = useState<string>("");
	const navigate = useNavigate();

	const handleSearch = (e: any) => {
		e.preventDefault();
		if (search) {
			// console.log('search:', search);
			return navigate("/search/" + search);
		}
		return false;
	};
	return (
		<>
			<header>
				<div className="row">
					<div className="col-md-2 logo">
						<Link to="/">
							<h2>WOOKIE MOVIES</h2>
						</Link>
					</div>
					<div className="col-md-5 searchIconContainer">
						<FontAwesomeIcon icon={faSearch} className="searchIcon" onClick={handleSearch} />
					</div>
					<div className="col-md-5 inputContainer">
						<form onSubmit={handleSearch}>
							<input type="text" name="search" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with movie name like: The Dark Knight" />
						</form>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<hr />
					</div>
				</div>
			</header>
			<div className="loaderContainer" style={{ display: props.loader ? "block" : "none" }}>
				<img src="/loading.gif" alt="loader" width="100" />
			</div>
		</>
	);
}
