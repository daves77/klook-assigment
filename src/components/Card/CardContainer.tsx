import './index.css'
import React, { useState } from 'react';

import Card from './Card';
import useLoadFood, { FoodItemDetails } from '../../hooks/useLoadFood';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

export default function CardContainer() {
	const [showing, setShowing] = useState<number>(7);
	const { loading, error, foods, hasMore } = useLoadFood(showing);

	const handleLoad = () => {
		if (hasMore) {
			setShowing(showing + 6);
		}
	};

	return (
		<>
		<div className='card-container'>
			<>
				{foods.map((food: FoodItemDetails, index: number) => (
					<Card key={index} food={food} />
				))}
			</>
		</div>

			<div className='load-button-container'>
				{loading ? (
					<Spinner />
				) : (
					<Button value={'Load More'} callback={handleLoad} />
				)}
				{error && <div>Failed to load resource</div>}
			</div>
			</>
	);
}
