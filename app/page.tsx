"use client";

import dynamic from "next/dynamic";
import * as React from "react";

export default function Home() {
	const Map = React.useMemo(() => dynamic(
		() => import('@/src/map/map'),
		{
			loading: () => <p>A map is loading</p>,
			ssr: false
		}
	), []);

	return <Map />;
}
