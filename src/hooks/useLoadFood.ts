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
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
		setLoading(true);
		(async () => {
      let start = currentIndex
			while (start < showing) {
        const requests: any[] = [] //not too sure how to type axios requests here
        const remainder = (start + 3) > showing ? showing - start: 3 
        for (let i = 1; i <= remainder ; i++){
          requests.push(createRequest(start + i))
        }
				try {
					const responses = await Promise.all(requests);

					setLoading(false);
					setFoods((foods) => [
						...foods,
						...responses.map((response) => response.data.result),
					]);
					start += remainder;
					setHasMore(start < 100);
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
