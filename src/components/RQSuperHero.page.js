import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

export const RQSuperHeroPage = () => {
	const { heroId } = useParams();
	const { data, isLoading, isError, error } = useSuperHeroData(heroId);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}

	console.log(data);

	return (
		<>
			<h1>
				{data?.data.name} - {data?.data.alterEgo}
			</h1>
		</>
	);
};
