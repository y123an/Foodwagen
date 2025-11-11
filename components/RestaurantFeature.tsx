"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import FoodCard from "./FoodCard";

interface Meal {
	id: string;
	name: string;
	price: number;
	image: string;
	brand: string;
	rating: number;
	brandColor?: string;
	brandBg?: string;
}

const initialMeals: Meal[] = [
	{
		id: "lasagna",
		name: "Bow Lasagna",
		price: 2.99,
		image: "https://loremflickr.com/800/600/lasagna,food?lock=1",
		brand: "Dominos",
		rating: 4.6,
		brandColor: "text-white",
		brandBg: "bg-blue-600",
	},
	{
		id: "avocado",
		name: "Mixed Avocado Shake",
		price: 5.99,
		image: "https://loremflickr.com/800/600/avocado,food?lock=2",
		brand: "Pizza Hut",
		rating: 4.0,
		brandColor: "text-black",
		brandBg: "bg-yellow-300",
	},
	{
		id: "pancake",
		name: "Pancake",
		price: 3.99,
		image: "https://loremflickr.com/800/600/pancakes,food?lock=3",
		brand: "Dunkin Donuts",
		rating: 5,
		brandColor: "text-white",
		brandBg: "bg-indigo-600",
	},
	{
		id: "cupcake",
		name: "Cupcake",
		price: 3.99,
		image: "https://loremflickr.com/800/600/cupcake,food?lock=4",
		brand: "Subway",
		rating: 5,
		brandColor: "text-white",
		brandBg: "bg-green-500",
	},
	{
		id: "steak",
		name: "Creamy Steak",
		price: 12.99,
		image: "https://loremflickr.com/800/600/steak,food?lock=5",
		brand: "Ruby Tuesday",
		rating: 4.5,
		brandColor: "text-black",
		brandBg: "bg-orange-300",
	},
	{
		id: "potatoes",
		name: "Steak with Potatoes",
		price: 15.99,
		image: "https://loremflickr.com/800/600/chicken,potatoes,food?lock=6",
		brand: "KFC",
		rating: 5,
		brandColor: "text-white",
		brandBg: "bg-green-600",
	},
	{
		id: "spicy-soup",
		name: "Indian Spicy Soup",
		price: 9.99,
		image: "https://loremflickr.com/800/600/soup,food?lock=7",
		brand: "Chowking",
		rating: 4.5,
		brandColor: "text-white",
		brandBg: "bg-red-600",
	},
	{
		id: "omelet",
		name: "Shabu Omelet",
		price: 11.99,
		image: "https://loremflickr.com/800/600/omelet,food?lock=8",
		brand: "Taco Bell",
		rating: 4.9,
		brandColor: "text-white",
		brandBg: "bg-orange-500",
	},
];

export default function RestaurantFeature() {
	const [meals, setMeals] = useState<Meal[]>(initialMeals.slice(0, 8));
	const [showCount, setShowCount] = useState(8);

	const handleLoadMore = () => {
		const next = showCount + 4;
		setShowCount(next);
		setMeals(initialMeals.slice(0, Math.min(next, initialMeals.length)));
	};

	return (
		<section className="w-full py-16 bg-white" aria-labelledby="featured-meals-heading">
			<div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
				<h2
					id="featured-meals-heading"
					className="text-2xl font-extrabold text-center tracking-tight text-gray-800 mb-10"
				>
					Featured Meals
				</h2>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{meals.map((meal) => (
						<FoodCard key={meal.id} meal={meal} />
					))}
				</div>

				{showCount < initialMeals.length && (
					<div className="mt-12 flex justify-center">
									<Button
										size="lg"
										onClick={handleLoadMore}
										className="px-10 bg-linear-to-r from-[#FF9A0E] to-[#FFBA26] text-white shadow-[0_10px_25px_-5px_rgba(255,154,14,0.4)] hover:scale-[1.02]"
										aria-label="Load more featured meals"
									>
							Load more
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}

