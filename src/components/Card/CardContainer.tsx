import './index.css';
import React, { useState } from 'react';

import Card from './Card';
import useLoadFood, { FoodItemDetails } from '../../hooks/useLoadFood';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

const MAX_ITEM = 100

export default function CardContainer() {
	const [showing, setShowing] = useState<number>(6);
	const { loading, error, foods, hasMore } = useLoadFood(showing);
	const handleLoad = () => {
		if (hasMore) {
			setShowing(showing + 6 > MAX_ITEM ? MAX_ITEM : showing + 6);
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
				{hasMore ? (
					<>
						{loading ? (
							<Spinner />
						) : (
							<Button value={'Load More'} callback={handleLoad} />
						)}
					</>
				) : (
					<div>No more results!</div>
				)}
				{error && <div>Failed to load resource</div>}
			</div>
		</>
	);
}
