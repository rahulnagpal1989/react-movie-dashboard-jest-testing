import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Movies from "../components/Movies";
import { IMoviesData, IParams } from "../interfaces/MoviesInterface";
import "../css/Home.css";

export default function Home() {
	const { title } = useParams<IParams | any>();
	const [loader, setLoader] = useState<boolean>(false);
	const [genre, setGenre] = useState<Array<string>>([]);
	const [movies, setMovies] = useState<Array<IMoviesData>>([]);

	useLayoutEffect(() => {
		setLoader(true);

		let url = `https://wookie.codesubmit.io/movies`;
		if (title) {
			url += `?q=${title}`;
		}
		axios
			.get(`${url}`, {
				headers: {
					Authorization: "Bearer Wookie2021",
				},
			})
			.then((res) => {
				// console.log(res?.data?.movies);
				if (res?.data?.movies) {
					setMovies(res?.data?.movies);
					let genreArr = [];
					for (let i in res?.data?.movies) {
						for (let j in res?.data?.movies[i].genres) {
							if (genreArr.indexOf(res?.data?.movies[i].genres[j]) === -1) {
								genreArr.push(res?.data?.movies[i].genres[j]);
							}
						}
					}
					setGenre(genreArr);
					setLoader(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoader(false);
			});
	}, [title]);

	// useEffect(() => {
		// console.log('movies:', movies);
	// }, [movies]);
	return (
		<div className="container-fluid">
			<Header loader={loader} />
			{movies && movies.length > 0 ? (
				<>
					{genre.map((data, genreIndex) => (
						<div key={genreIndex}>
							<div className="row">
								<div className="col-md-12">
									<h4>{data}</h4>
								</div>
							</div>
							<Movies movies={movies} genre={data} />
							<br />
						</div>
					))}
				</>
			) : title ? (
				<center>No record found</center>
			) : null}
		</div>
	);
}
