import './index.css'
import React from 'react';
import {InformationCircleIcon} from '@heroicons/react/solid'

import { cleanTitle, truncateTitle } from '../../utils';
import Button from '../Button/Button';
import FoodPrices from '../Prices/FoodPrices';
import {FoodItemDetails} from '../../hooks/useLoadFood'

export default function Card({ food }: { food: FoodItemDetails }) {
	return (
		<div className='card'>
      <InformationCircleIcon className="information-button"  />
			<div className='card-wrapper'>
				<div className='card-image-wrapper'>
					<img className='card-image' src={food.foodImage} alt='' />
				</div>
				<div className='card-body'>
					<div className='card-content'>
						<h3 className='card-title'>
							{truncateTitle(cleanTitle(food.foodName))}
						</h3>
						<div className=''>
							<p className='card-description'>{food.foodDesc}</p>
						</div>
					</div>
					<div className='card-action-area'>
						<FoodPrices
							originalPrice={food.foodOrinalPrice}
							discountedPrice={food.foodMarketPrice}
						/>

						<Button value={"ORDER"} />
					</div>
				</div>
			</div>
		</div>
	);
}
