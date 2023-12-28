import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUserByEmail = (email) => {
	return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourses = (channelId) => {
	return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueries = ({ email }) => {
	const { data: user } = useQuery(['user', email], () =>
		fetchUserByEmail(email)
	);
	const channelId = user?.data.channelId;
	console.log(channelId);

	const { data: courses } = useQuery(
		['courses', channelId],
		() => fetchCourses(channelId),
		{
			enabled: !!channelId,
		}
	);
	return <div>DependentQueries</div>;
};

export default DependentQueries;
