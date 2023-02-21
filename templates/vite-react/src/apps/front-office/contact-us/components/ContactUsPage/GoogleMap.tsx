import { Loader } from "@mantine/core";
import {
  GoogleMap as BaseGoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { integrationsConfigurations } from "shared/integrationsConfigurations";
import { Branch } from "../../utils/types";
import GoogleMapBranch from "./GoogleMapBranch";

const defaultStyles = {
  container: {
    height: "300px",
    width: "100%",
  },
};

export type GoogleMapProps = {
  apiKey?: string;
  branches?: Branch[];
  zoom?: number;
  center?: {
    lat: number;
    lng: number;
  };
};

export default function GoogleMap({
  apiKey,
  branches = [],
  center,
  zoom = 13,
}: GoogleMapProps) {
  // initializing google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(apiKey),
    libraries: [
      "drawing",
      "geometry",
      "localContext",
      "places",
      "visualization",
    ],
  });

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <BaseGoogleMap
        id="map"
        zoom={zoom}
        mapContainerStyle={defaultStyles.container}
        center={center}>
        {branches.map(branch => (
          <GoogleMapBranch key={branch.id} branch={branch} />
        ))}
      </BaseGoogleMap>
    </>
  );
}

GoogleMap.defaultProps = {
  apiKey: integrationsConfigurations.google.maps.apiKey,
};
