import type { LatLngExpression } from "leaflet";
import * as React from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export interface NeighborProps {
	children?: React.ReactNode;
	position: LatLngExpression;
}

export function Neighbor (props: NeighborProps) {
	const map = useMap();
	map.setView(props.position, 100);

	return (
		<Marker position={props.position}>
			<Popup>{props.children}</Popup>
		</Marker>
	);
}
