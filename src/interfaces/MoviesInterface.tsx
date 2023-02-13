export interface IMoviesData {
	id: Array<string>;
	title: Array<string>;
	poster: string;
	backdrop: string;
	genres: Array<string>;
	imdb_rating: Array<Float32Array>;
	released_on: string;
	director: Array<string>;
	length: Array<string>;
	overview: Array<string>;
}

export interface IParams {
	title: string;
	id: string;
}

export interface ILoaderProps {
	loader: boolean;
}
