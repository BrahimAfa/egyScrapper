import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
const Watch = () => {
	const { name } = useParams();
	const [url, setUrl] = useState('');
	const [test, settest] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		axios
			.get('http://localhost:3030/watch/' + name)
			.then(({ data }) => {
				setUrl(data?.watch);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [test]);
	return (
		<div>
			{isLoading ? (
				'loading movie for you..'
			) : (
				<iframe
                style={{width:'100%',height:'100vh'}}
                sandbox="allow-same-origin allow-popups allow-scripts"
                title='helloo'
                src={url} 
                frameBorder='0'
                allowFullScreen
                ></iframe>
			)}
		</div>
	);
};

export default Watch;
