//MODULES
import { useContext } from 'react';
import { Link } from 'react-router-dom';
//CONTEXTS
import { MainContext } from '../context/MainContext';
//COMPONENTS
import FavButton from '../components/FavButton';
//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilm, faStar } from '@fortawesome/free-solid-svg-icons';

const MovieCardDetails = ({ listForRender, listTitle }) => {
	const { favsMovieList } = useContext(MainContext);
	return (
		<div className='container'>
			<div className='flex flex-col gap-5 croll-smooth touch-auto px-5 pt-5 pb-10'>
				{listForRender.map((movie) => {
					const isFav = favsMovieList.some(
						(favMovie) => favMovie.id == movie.id
					);
					return (
						<div
							key={movie.id}
							// className='grid grid-cols-1 ring-2 ring-slate-300 hover:ring-violet-500 rounded-b-lg'>
							className='relative h-48 w-full rounded-lg bg-blue-950 hover:ring-4 hover:ring-purple-500 card-animation shadow-md'>
							<Link to={`/details/${movie.id}`}>
								<figure>
									<img
										id='backdrop_path'
										className='backdrop_path w-full h-48 object-cover rounded-lg'
										src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
										alt={movie.title}
									/>
									<img
										id='poster_path'
										className='hidden'
										src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										alt={movie.title}
									/>
									<div className='absolute bottom-0 h-2/3 w-full rounded-lg bg-gradient-to-t from-slate-900 to-transparent'></div>
								</figure>
							</Link>
							<FavButton
							className={'absolute text-xs p-1 -top-1 -right-1'}
								isFav={isFav}
								movieId={movie.id}
							/>
							<div className='absolute bottom-0 flex flex-col gap-2 w-full py-3 px-3'>
								<div className='flex flex-row gap-5 justify-start'>
									<div className='flex items-center text-xs font-semibold bg-yellow-500 rounded-full px-2 py-1'>
										<FontAwesomeIcon
											className='text-white mr-1'
											icon={faStar}
										/>
										<span
											id='ranked'
											className='ranked'>
											{movie.vote_average.toFixed(1)}
										</span>
									</div>
									<div className='flex items-center text-xs font-semibold'>
										<FontAwesomeIcon
											className='text-blue-500 mr-1'
											icon={faFilm}
										/>
										<span
											id='releaseDate'
											className='releaseDate'>
											{movie.release_date.substring(0, 4)}
										</span>
									</div>
								</div>
								<h1
									id='movieTitle'
									className='movieTitle font-semibold text-md'>
									{movie.title}
								</h1>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MovieCardDetails;
