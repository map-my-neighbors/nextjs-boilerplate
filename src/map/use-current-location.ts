import * as React from 'react';

export interface IGeolocationCoordinates {
	 accuracy: number;
	 altitude?: number | null;
	 altitudeAccuracy?: number | null;
	 heading?: number | null;
	 latitude: number;
	 longitude: number;
	 speed?: number | null;
}

export const getCurrentLocation = async (): Promise<IGeolocationCoordinates> => {
	if ("geolocation" in navigator) {
		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					maximumAge: 3000,
					timeout: 27000,
				});
			});

			// localStorage.setItem("geolocation", JSON.stringify({ ...position.coords }));
			return position.coords;
		}
		catch (error) {
			console.warn("Error getting location:", error);
			return {
				accuracy: 0,
				latitude: 0,
				longitude: 0,
			};
		}
	}
	else {
		console.warn("Geolocation is not supported! Setting the coordinates to 0");
		return {
			accuracy: 0,
			latitude: 0,
			longitude: 0,
		};
	}
};

export const useCurrentLocation = (): IGeolocationCoordinates | null => {
	const [location, setLocation] = React.useState<IGeolocationCoordinates | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		const init = async () => {
			try {
				const coords = await getCurrentLocation();
				setLocation(coords);
			}
			finally {
				setIsLoading(false);
			}
		};

		init();
	}, []); // Run once on mount

	return location;
};
