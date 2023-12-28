import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from '../utils/axiosUtils';

const fetchSuperHeroes = () => {
	return request({ url: '/superheroes' });
};

const addSuperHero = (hero) => {
	return request({ url: '/superheroes', method: 'post', data: hero });
};
export const useSuperHerosData = (onSuccess, onError) => {
	return useQuery('super-heroes', fetchSuperHeroes, {
		// cacheTime: 50000,
		// staleTime: 0,
		// refetchOnMount: true,
		// refetchOnWindowFocus: true,
		// refetchInterval: 2000,
		// refetchIntervalInBackground:true

		// use on onClick useQuery
		// enabled: false,

		onSuccess,
		onError,
	});
};

export const useAddSuperHeroData = () => {
	const queryClient = useQueryClient();
	return useMutation(addSuperHero, {
		// onSuccess: (data) => {
		// 	//for refetching data
		// 	// queryClient.invalidateQueries('super-heroes');
		// 	//for updating chache data (will not hit the server)
		// 	queryClient.setQueryData('super-heroes', (oldData) => {
		// 		return {
		// 			data: [...oldData.data, data.data],
		// 		};
		// 	});
		// },

		onMutate: async (newHero) => {
			//for updating chache data (will not hit the server)
			await queryClient.cancelQueries('super-heroes');
			const previousData = queryClient.getQueryData('super-heroes');
			queryClient.setQueryData('super-heroes', (oldData) => {
				return {
					data: [
						...oldData.data,
						{ id: oldData?.data?.length + 1, ...newHero },
					],
				};
			});
			return { previousData };
		},

		onError: (err, newHero, context) => {
			//for updating chache data (will not hit the server)
			queryClient.setQueryData('super-heroes', context.previousData);
		},

		onSettled: (data, error, newHero) => {
			//for refetching data
			queryClient.invalidateQueries('super-heroes');
		},
	});
};
