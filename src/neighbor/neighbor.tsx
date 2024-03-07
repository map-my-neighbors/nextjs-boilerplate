import * as React from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export interface NeighborProps {
	children?: React.ReactNode;
	position?: number[];
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
