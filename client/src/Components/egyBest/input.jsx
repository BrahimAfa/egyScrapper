import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const StyledInput = styled.input`
	font-family: inherit;
	width: 100%;
	border: 0;
	border-bottom: 2px solid #eee;
	outline: 0;
	font-size: 1.3rem;
	color: #fff;
	padding: 7px 0;
	background: transparent;
	transition: border-color 0.2s;

	&::placeholder {
		color: transparent;
	}

	&:placeholder-shown ~ .form__label {
		font-size: 1.3rem;
		cursor: text;
		top: 20px;
	}
	&:focus {
		~ .form__label {
			position: absolute;
			top: 0;
			display: block;
			transition: 0.2s;
			font-size: 1rem;
			color: #11998e;
			font-weight: 700;
		}
		padding-bottom: 6px;
		font-weight: 700;
		border-width: 3px;
		border-image: linear-gradient(to right, #11998e, #38ef7d);
		border-image-slice: 1;
	}
	&:required,
	&:invalid {
		box-shadow: none;
	}
`;
const StyledWrapper = styled.div`
	position: relative;
	padding: 8px;
	width: 500px;
	margin: auto;
`;
const StyledLabel = styled.label`
	position: absolute;
	top: 0;
	display: block;
	transition: 0.2s;
	font-size: 2rem;
	color: #9b9b9b;
`;
const StyledSearchDisplay = styled.div`
	margin: 2px 0 0;
	width: 500px;
	position: absolute;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	box-shadow: 0 2px 2px 0 #aaa;
	background: #fff;
	border-top: none;
	border-radius: 0 0 2px 2px;
	overflow: hidden;
	direction: ltr !important;
	z-index: 999;
`;
const StyledLink = styled.a`
	padding: 2px;
`;
const Input = ({ change }) => {
	const [name, setName] = useState('');
	const [suggets, setSuggets] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const handlechange = (e) => {
		const { value } = e.target;
		setName(value);
		setIsLoading(true);
	};
	useEffect(() => {
		if (!name) return;
		axios
			.get(`http://localhost:3030/search`, {
				params: { q: name },
			})
			.then(({ data }) => {
				setSuggets(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [name]);
	const h = () => {
		const arr = suggets[name];
		console.log(arr);
		return arr?.map(({ i, t, u }) => {
			const p = u.split('/');
			return (
				<StyledLink href={'/watch/' + p[1]}>
					<img
						alt='The Social Network (2010)'
						src={`https://cdn-static.egybest.net/serve/movies/art-${i}-x30.jpg`}
					/>
					{t}
				</StyledLink>
			);
		});
	};
	return (
		<StyledWrapper>
			<StyledInput
				type='text'
				placeholder='Movie Name'
				name='movie'
				id='movie'
				required
				onChange={handlechange}
			/>
			<StyledLabel for='movie' className='form__label'>
				Name
			</StyledLabel>
			<StyledSearchDisplay>
				{isLoading ? 'stiil loading' : h()}
			</StyledSearchDisplay>
		</StyledWrapper>
	);
};

export default Input;
