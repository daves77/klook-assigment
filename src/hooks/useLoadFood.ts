import axios from 'axios';
import { useEffect, useState } from 'react';

export interface FoodItemDetails {
	foodName: string;
	foodImage: string;
	foodDesc: string;
	foodOrinalPrice: string; // typo
	foodMarketPrice: string;
}

const formatId = (id: number) => {
	let formattedString = String(id);
	if (formattedString.length === 1) {
		formattedString = `00${id}`;
	} else if (formattedString.length === 2) {
		formattedString = `0${id}`;
	}
	return formattedString;
};

const createRequest = async (id: number) => {
	const url = `https://gourmet.getsandbox.com/getFoodById/${formatId(id)}`;
	return await axios.get(url);
};

export default function useLoadFood(showing: number) {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [foods, setFoods] = useState<FoodItemDetails[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState<number>(1);

	useEffect(() => {
		setLoading(true);
		(async () => {
      let start = currentIndex
			while (start !== showing) {
				try {
					const responses = await Promise.all([
						createRequest(start),
						createRequest(start + 1),
						createRequest(start + 2),
					]);

					setLoading(false);
					setFoods((foods) => [
						...foods,
						...responses.map((response) => response.data.result),
					]);

					setHasMore(foods.length < 100);
					start += 3;
				} catch (err) {
					console.log(err);
					setError(true);
				}
			}
      setCurrentIndex(start)
      return
		})();
	}, [showing]);

	return { loading, error, foods, hasMore };
}
