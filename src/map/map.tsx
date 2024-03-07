import "leaflet-defaulticon-compatibility";
import type { LatLngExpression } from "leaflet";
import * as React from "react";
import { MapContainer } from "react-leaflet";
import { Neighbor } from "../neighbor";
import { type SearchResult, Search } from "../search";
import { Copyright } from "./copyright";
import { useCurrentLocation } from "./use-current-location";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

/*
 * needs to be default exported since its dynamically loaded
 */
export default function Map () {
	const [isLoading, setIsLoading] = React.useState(true);
	const [markers, setMarkers] = React.useState<JSX.Element[]>([]);
	const [position, setPosition] = React.useState<LatLngExpression>([0, 0]);
	const [zoomLevel, setZoomLevel] = React.useState<number>(2);

	const loc = useCurrentLocation();
	React.useEffect(() => {
		const fetchData = async () => {
			if (loc) {
				setPosition([loc.latitude, loc.longitude]);
				setZoomLevel(100);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [loc]);

	const handleSearch = (result: SearchResult) => {
		if (result?.data?.length > 0) {

		const newMarker = (
			<Neighbor
				key={result.data?.display_name}
				position={[
					parseFloat(result.data.lat),
					parseFloat(result.data.lon),
				]}
			>
				{result.data.display_name}
			</Neighbor>
		);

		setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
		}
	}

	if (isLoading) {
		return (
			<p>Loading…</p>
		);
	}

	return (
		<MapContainer
			center={position}
			zoom={zoomLevel}
			scrollWheelZoom={false}
			style={{ height: "100vh" }}
		>
			<Search onSearch={handleSearch}/>
			{markers}
			<Copyright />
		</MapContainer>
	);
}
