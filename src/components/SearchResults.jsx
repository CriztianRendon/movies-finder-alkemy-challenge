//MODULES
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//LIBS
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MainContext } from '../context/MainContext';

const SearchResults = () => {
	const { keyword } = useParams();
	const { addOrRemFromFavs} = useContext(MainContext);

  //SEARCH A MOVIE
  const navigate = useNavigate();
  const [movieSearchResults, setMovieSearchResults] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/search/movie?api_key=06419c9c5f3e99fd614ed7eead050900&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1&query=${keyword}`
			)
			.then((resp) => {
				setMovieSearchResults(resp.data.results);
				if (resp.data.results.length === 0) {
					toast.error(
						'No hay resultados para tu busqueda. Intenta con otra palabra',
						{
							position: toast.POSITION.BOTTOM_CENTER,
							autoClose: 5000,
						}
					);
					navigate(`/`, { replace: false });
				}
			})
			.catch((error) => {
				toast.error('Algo falló en la busqueda. Intenta de nuevo', {
					position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3000,
				});
				navigate(`/`, { replace: false });
			});
	}, [keyword]);
  // END SEARCH A MOVIE

	return (
		<>
			{movieSearchResults.length !== 0 && (
				<div className='container'>
					<h2 className='text-xl mb-5'>
						Acá tenes los resultados para <b>{keyword}</b>
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:space-y-0 justify-items-center md:px-0 mx-auto'>
						{movieSearchResults.map((movie, idx) => {
							return (
								<div
									key={idx}
									className='grid grid-cols-1 ring-2 ring-slate-300 hover:ring-violet-500 rounded-b-lg'>
									<button
										className='absolute text-xl p-2 justify-self-end'
										onClick={addOrRemFromFavs}
										data-movie-id={movie.id}>
										💜
									</button>
									<figure>
										<img
											src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
											alt={movie.title}
										/>
									</figure>
									<div className='px-3'>
										<h1 className='font-semibold text-center text-xl my-3'>
											{movie.title}
										</h1>
										<div className='text-xs flex justify-between mb-3'>
											<span>🎬 {movie.release_date}</span>
											<span>⭐ {movie.vote_average.toFixed(1)} </span>
										</div>
										<p className='text-sm'>
											{movie.overview.substring(0, 150)}...
										</p>
									</div>
									<div className='p-3 self-end justify-self-end'>
										<Link
											className='text-sm font-light hover:text-violet-300'
											to={`/details/${movie.id}`}>
											Más info ➡️
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
			<ToastContainer />
		</>
	);
};

export default SearchResults;
