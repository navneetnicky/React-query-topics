import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
	return axios.get('http://localhost:4000/superheroes');
};

const fetctFriends = () => {
	return axios.get('http://localhost:4000/friends');
};

export const ParallelQueries = () => {
	const { data: superheroes } = useQuery('super-heroes', fetchSuperHeroes);
	const { data: friends } = useQuery('friends', fetctFriends);

	return <div>ParallelQueries.page</div>;
};
