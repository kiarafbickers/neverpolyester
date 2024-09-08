import { useState, useEffect } from "react";

const reverseGeocode = (latitude: number, longitude: number) => {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => response.json())
    .then((data) => data?.address?.state || null)
    .catch((error) => {
      console.error("Error fetching state from geolocation:", error);
      return null;
    });
};

// Hook for fetching geolocation
const useGeolocation = () => {
  const [state, setState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude).then((userState) => {
          if (userState) {
            setState(userState);
          } else {
            setError("Unable to determine your state.");
          }
        });
      },
      () => {
        setError("Geolocation access denied.");
      }
    );
  }, []);

  return { state, error };
};

export default useGeolocation;
