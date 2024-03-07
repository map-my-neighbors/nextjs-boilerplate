import { TileLayer } from "react-leaflet";

const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export function Copyright () {
	return (
		<TileLayer
			attribution={attribution}
			url={url}
		/>
	);
}
