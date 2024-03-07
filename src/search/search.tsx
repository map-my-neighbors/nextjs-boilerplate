import * as React from "react";
import type { Place } from "./nominatim.type"


interface SearchData extends Pick<Place, "display_name" | "lat" | "lon"> {
	length: number;
	searchTerm: string;
}

export interface SearchResult {
	error: Error | null;
	data: SearchData;
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
						display_name: data[0].display_name,
						lat: data[0].lat,
						length: 1,
						lon: data[0].lon,
						searchTerm: inputVal,
					},
					error: null,
					hasError: false,
					isLoading: false,
				});
			} else {
				props.onSearch({
					data: {
						display_name: "",
						lat: "0",
						length: 0,
						lon: "0",
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
					display_name: "",
					lat: "0",
					length: 0,
					lon: "0",
					searchTerm: inputVal,
				},
				error: error as Error | null,
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
