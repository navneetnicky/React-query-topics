import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchColors = (pageNumber) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};
const PaginatedQueries = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { isLoading, isError, error, data } = useQuery(
		['colors', pageNumber],
		() => fetchColors(pageNumber),
		{
			keepPreviousData: true,
		}
	);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}

	return (
		<>
			<div>PaginatedQueries</div>
			<div>
				{data?.data.map((color) => {
					return (
						<div key={color.id}>
							<h2>
								{color.id}. {color.label}
							</h2>
						</div>
					);
				})}
			</div>
			<div>
				<button
					onClick={() => setPageNumber((page) => page - 1)}
					disabled={pageNumber === 1}>
					Prev Page
				</button>
				<button
					onClick={() => setPageNumber((page) => page + 1)}
					disabled={pageNumber === 3}>
					Next Page
				</button>
			</div>
		</>
	);
};

export default PaginatedQueries;
