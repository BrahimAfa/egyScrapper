import React, { useEffect, useState } from 'react';
import Input from './input';
import styled from 'styled-components';
import axios from 'axios';
import { StyledGrid, StyledButton, Styledheading4 } from './styled';
const StyledMain = styled.div`
	font-family: 'Poppins', sans-serif;
	font-size: 1rem;
	background-color: #222222;
`;
const StyledMovieParent = styled.div`
	margin: auto;
	width: 175px;
`;

const StyledMovieLnk = styled.a`
	display: inline-block;
	max-width: 220px;
	border: 5px solid grey;
	transition: border 0.15s ease-in-out;
	-moz-transition: border 0.15s ease-in-out;
	-webkit-transition: border 0.15s ease-in-out;
	border-radius: 4px;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	font-size: 24px;
	&:hover figcaption {
		opacity: 1;
	}
	&:hover span.button-green-download-big {
		-moz-transform: translateY(-35px);
		-webkit-transform: translateY(-35px);
		transform: translateY(-35px);
	}
	&:hover {
		border: 5px solid #6ac045;
	}
	&:hover figure img {
		opacity: 0.2;
		width: 100%;
	}
`;

const StyeldStar = styled.span`
	position: relative;
	width: 100%;
	color: #6ac045;
	-webkit-transition: all 300ms ease;
	-moz-transition: all 300ms ease;
	transition: all 300ms ease;
`;
const Styledfigcaption = styled.figcaption`
	color: #fff;
	height: 100%;
	left: 0;
	text-align: center;
	opacity: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 2;
	width: 100%;
	-webkit-transition: all 300ms;
	-moz-transition: all 300ms;
	transition: all 300ms;
	-webkit-transition-delay: 100ms;
	-moz-transition-delay: 100ms;
	transition-delay: 100ms;
	padding-top: 20px;
	margin-top: 40px & span.icon-star {
		position: relative;
		width: 100%;
		color: #6ac045;
		-webkit-transition: all 300ms ease;
		-moz-transition: all 300ms ease;
		transition: all 300ms ease;
	}
`;
const StyledFigure = styled.figure`
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 0;
	& img {
		width: 100%;
		transition: opacity 0.15s ease-in-out;
		-moz-transition: opacity 0.15s ease-in-out;
		-webkit-transition: opacity 0.15s ease-in-out;
	}
	& figcaption h4 {
		font-size: 25px;
		position: relative;
		width: 100%;
		padding-left: 0 !important;
		padding-right: 0 !important;
		font-weight: bold;
		color: #fff;
	}
	& figcaption .rating {
		margin-bottom: 20px;
	}
`;
const StyledMovieBottom = styled.div`
	width: 100%;
	position: static;
	margin: 5px 0;
	text-align: center;
	border: 0;
	padding: 3px;
	& .browse-movie-year {
		font-size: 0.85em;
		color: #bcbcbc;
	}
`;
const StyledMovieTitle = styled.a`
	color: #fff;
	font-weight: 700;
	display: block;
	transition: color 0.15s ease-in-out;
	-moz-transition: color 0.15s ease-in-out;
	-webkit-transition: color 0.15s ease-in-out;
	overflow: hidden;
	text-overflow: ellipsis;
	&:hover {
		color: #919191;
	}
`;
const StyledTags = styled.div`
	& a {
		background: #111;
		display: inline-block;
		color: #bcbcbc;
		font-weight: 700;
		border-radius: 4px;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		transition: color 0.15s ease-in-out;
		-moz-transition: color 0.15s ease-in-out;
		-webkit-transition: color 0.15s ease-in-out;
	}
	& a:focus {
		color: #575656;
	}
	& a:hover {
		color: #919191;
	}
`;

const Search = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		axios
			.get(`http://localhost:3030/movies`, {
				params: { page },
			})
			.then(({ data }) => {
				data.pop();
				setMovies(data);
				setIsLoading(false);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);
	const onPageChanged = (e) => {
		const p = e.target.innerText.trim();
		if (p === 'Prev') {
			setPage(page - 1);
		} else if (p === 'Next') {
			setPage(page + 1);
		} else {
			setPage(Number.parseInt(p));
		}
		setIsLoading(true);
	};
	const LoadMovies = () => {
		return movies.map(({ u, rating, img, title, ribon }) => {
			return (
				<StyledMovieParent class='projects'>
					<StyledMovieLnk href={`/watch/${u}`} class='browse-movie-link'>
						<StyledFigure>
							<img class='img-responsive' src={img} alt={title} />
							<Styledfigcaption class='hidden-xs hidden-sm'>
								<StyeldStar class='icon-star'>&#9734;</StyeldStar>
								<Styledheading4 class='rating'>{rating}/ 10</Styledheading4>
								<StyledButton class='button-green-download-big'>
									watch now.
								</StyledButton>
							</Styledfigcaption>
						</StyledFigure>
					</StyledMovieLnk>
					<StyledMovieBottom class='browse-movie-bottom'>
						<StyledMovieTitle href={`/watch/${u}`} class='browse-movie-title'>
							{title}
						</StyledMovieTitle>
						<div class='browse-movie-year'> {/(\(\d+\))/.exec(title)[0]} </div>
						<StyledTags class='browse-movie-tags'>
							<a href='/download/43244'>{ribon}</a>
						</StyledTags>
					</StyledMovieBottom>
				</StyledMovieParent>
			);
		});
	};
	return (
		<div>
			<StyledMain>
				<Input />
				<div>
					<button onClick={onPageChanged}>Prev</button>
					<button onClick={onPageChanged}>{page - 1}</button>
					<button onClick={onPageChanged}>{page}</button>
					<button onClick={onPageChanged}>{page + 1}</button>
					<button onClick={onPageChanged}>Next</button>
				</div>
				<StyledGrid>
					{isLoading ? 'Loading Movies Pleas Wait' : LoadMovies()}
				</StyledGrid>
			</StyledMain>
		</div>
	);
};
export default Search;
