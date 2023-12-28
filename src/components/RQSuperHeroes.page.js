import { Link } from 'react-router-dom';
import {
	useAddSuperHeroData,
	useSuperHerosData,
} from '../hooks/useSuperhHeroData';
import { useState } from 'react';

export const RQSuperHeroesPage = () => {
	const [name, setName] = useState('');
	const [alterEgo, setAlterEgo] = useState('');

	const { isLoading, data, isError, error, isFetching, refetch } =
		useSuperHerosData();

	const { mutate: addHero } = useAddSuperHeroData();

	// const onSuccess = () => {};
	// const onError = () => {};

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}

	const handleAddHeroClick = () => {
		const hero = { name, alterEgo };
		addHero(hero);
	};

	return (
		<>
			<h2>React Query Super Heroes Page</h2>
			<div>
				<input
					text='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					text='text'
					value={alterEgo}
					onChange={(e) => setAlterEgo(e.target.value)}
				/>
				<button onClick={handleAddHeroClick}>Add Hero</button>
			</div>

			<button onClick={refetch}>Featch heroes</button>

			{data?.data.map((hero) => {
				return (
					<div key={hero.id}>
						<Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
					</div>
				);
			})}
		</>
	);
};
