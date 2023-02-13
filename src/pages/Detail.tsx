import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FaRegStar } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";
import { IMoviesData, IParams } from "../interfaces/MoviesInterface";
import "../css/Detail.css";

interface IProps {
	rating: Array<Float32Array>;
}
function StarShow(props: IProps) {
	let fullStar = new Array(1, 2, 3, 4, 5);
	let currentRating = Number(props.rating) / 2;
	return (
		<>
			{fullStar.map((i) =>
				Math.floor(currentRating) >= i ? (
					<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#F7B500", fontSize: "25px" }} />
				) : Math.ceil(currentRating) === i ? (
					<FontAwesomeIcon key={i} icon={faStarHalfStroke} style={{ color: "#F7B500", fontSize: "25px" }} />
				) : (
					<FaRegStar key={i} style={{ color: "#F7B500", fontSize: "25px", verticalAlign: "top" }} />
				)
			)}
		</>
	);
}

export default function Detail() {
	const { title, id } = useParams<IParams | any>();
	const [loader, setLoader] = useState<boolean>(false);
	const [movie, setMovie] = useState<Array<IMoviesData>>([]);

	useLayoutEffect(() => {
		if(title && id) {
			setLoader(true);
			axios
				.get(`https://wookie.codesubmit.io/movies?q=${title}`, {
					headers: {
						Authorization: "Bearer Wookie2021",
					},
				})
				.then((res) => {
					// console.log(res?.data?.movies);
					if (res?.data?.movies) {
						for (let i in res?.data?.movies) {
							if (res?.data?.movies[i]?.id === id) {
								setMovie([res?.data?.movies[i]]);
								break;
							}
						}
						setLoader(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoader(false);
				});
		}
	}, []);

	useEffect(()=> {
	//     console.log('movie:', movie, movie.length);
	}, [movie]);

	return (
		<div className="container-fluid">
			<Header loader={loader} />
			{movie && movie.length > 0 ? (
				<div className="row middlepart">
					<div className="col-md-3">
						<img src={movie[0].poster} alt={movie[0].genres[0]} width="300" />
					</div>
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-6">
								<p className="movieTitle">
									{movie[0].title} ({movie[0].imdb_rating})
								</p>
							</div>
							<div className="col-md-6 ratingBox">
								<StarShow rating={movie[0].imdb_rating} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<p className="releaseDate">
									{new Date(movie[0].released_on).getFullYear()} | {movie[0].length} | {typeof movie[0].director == "string" ? movie[0].director : movie[0].director.join(", ")}
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<p className="description">{movie[0].overview}</p>
							</div>
						</div>
					</div>
				</div>
			) : title ? (
				<center>No record found</center>
			) : null}
		</div>
	);
}
