import { useCookies } from 'react-cookie';

export default function useRemainCookie() {
  const [cookies] = useCookies(['AccessToken']);
  const isCookie = !!cookies;
  return isCookie;
}
