import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

const fetchColors = ({ pageParam = 1 }) => {
	return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};
const InfiniteQueries = () => {
	const {
		isLoading,
		isError,
		error,
		data,
		hasNextPage,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery(['colors'], fetchColors, {
		getNextPageParam: (_lastPage, pages) => {
			if (pages.length < 4) {
				return pages.length + 1;
			} else {
				return null;
			}
		},
	});

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (isError) {
		return <h2>{error.message}</h2>;
	}

	return (
		<>
			<div>Infinite Query</div>
			<div>
				{data?.pages.map((group, i) => {
					return (
						<Fragment key={i}>
							<h2>
								{group.data.map((color) => (
									<h2 key={color.id}>
										{color.id}. {color.label}
									</h2>
								))}
							</h2>
						</Fragment>
					);
				})}
			</div>
			<div>
				<button disabled={!hasNextPage} onClick={fetchNextPage}>
					Load more
				</button>
			</div>
			<div>{isFetching && isFetchingNextPage ? 'Fetching...' : null}</div>
		</>
	);
};

export default InfiniteQueries;
