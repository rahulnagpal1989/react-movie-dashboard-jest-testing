import React from "react";
import { Link } from "react-router-dom";
import { IMoviesData } from "../interfaces/MoviesInterface";
import { SeoUrl } from "./SeoUrl";

interface IProps {
	movies: Array<IMoviesData>;
	genre: string;
}
export default function Movies(props: IProps) {
	// console.log("movies", props.movies[0].poster);
	return (
		<>
			<div className="row">
				{props.movies.map((data, movieIndex) =>
					data.genres.indexOf(props.genre) !== -1 ? (
						<div className="col-md-2" key={movieIndex}>
							<Link to={`/detail/${SeoUrl(data.title)}/${data.id}`}>
								<img src={data.poster} alt={props.genre} className="thumbnails" />
							</Link>
						</div>
					) : null
				)}
			</div>
		</>
	);
}
