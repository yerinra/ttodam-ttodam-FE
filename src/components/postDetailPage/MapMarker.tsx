import usePostDetailMapMarker from '../../hooks/usePostDetailMapMarker';

type MapMarkerProps = {
  lat: number;
  lng: number;
};
export default function MapMarker({ lat, lng }: MapMarkerProps) {
  usePostDetailMapMarker(lat, lng);
  return null;
}
