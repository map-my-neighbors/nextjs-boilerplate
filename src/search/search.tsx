import * as React from "react";
import type { Place } from "./nominatim.type"

export interface SearchResult {
	error: Error | null;
	data: {
		searchTerm: string;
	} & Omit<Place, "searchTerm">;
	hasError: boolean;
	isLoading: boolean;
}

export interface SearchProps {
	onSearch: (result: SearchResult) => void;
}

export function Search (props: SearchProps) {
	const [inputVal, setInputVal] = React.useState<string>("");
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputVal(event.target.value);
	}

	const handleSearch = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputVal)}`);
			const data = await response.json();

			if (data.length > 0) {
				props.onSearch({
					data: {
						searchTerm: inputVal,
						...data[0],
					},
					error: null,
					hasError: false,
					isLoading: false,
				});
			} else {
				props.onSearch({
					data: {
						searchTerm: inputVal,
					},
					error: null,
					hasError: false,
					isLoading: false,
				});
			}
		}
		catch (error) {
			props.onSearch({
				data: {
					searchTerm: inputVal,
				},
				error,
				hasError: true,
				isLoading: false,
			});
			console.error('Error fetching data:', error);
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="search">
			<label htmlFor="search-address">Enter Address</label>
			<input
				id="search-address"
				placeholder="e.g., 123 Main St, City"
				type="text"
				onChange={handleChange}
				disabled={isLoading}
			/>
			<button
				disabled={isLoading || inputVal.trim() === ""}
				onClick={handleSearch}
			>
				{isLoading ? "Searching…" : "Search"}
			</button>
		</div>
	);
};
