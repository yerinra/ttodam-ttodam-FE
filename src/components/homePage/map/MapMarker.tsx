import ReactDOM from 'react-dom';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { useMap } from './useMap';
import { PlaceType } from '@/types/map';
import Badge from '@/components/atoms/Badge';
import { PostMap } from '@/types/post';
import BookmarkBtn from '@/components/homePage/BookmarkBtn';

interface MapMarkerProps {
  place: PlaceType;
  showInfo?: boolean;
  mapPosts: PostMap[];
}

// TODO: 게시글이 있는 주소의 마커만 생성하기
export default function MapMarker(props: MapMarkerProps) {
  const map = useMap();
  const container = useRef(document.createElement('div'));
  // const [mapPosts] = useState<PostMap[]>([]);

  const infoWindow = useMemo(() => {
    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
    });
  }, []);

  const marker = useMemo(() => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: props.place.position,
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      map.setCenter(props.place.position);
      map.setLevel(2, {
        animate: true,
      });
      infoWindow.setMap(map);
    });

    return marker;
  }, []);

  useLayoutEffect(() => {
    // 지도 위에 마커를 표시
    marker.setMap(map);

    return () => {
      marker.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (props.showInfo) {
      infoWindow.setMap(map);
      return;
    }

    return () => {
      infoWindow.setMap(null);
    };
  }, [props.showInfo]);

  return container.current
    ? ReactDOM.createPortal(
        <button
          key={props.place.id}
          onClick={() => {
            infoWindow.setMap(null);
          }}
          className="absolute bottom-[60px] left-0 ml-[-120px] flex flex-col gap-2 w-[270px] px-7 py-4 border border-black rounded-2xl bg-white"
        >
          {props.mapPosts &&
            props.mapPosts.map(post => (
              <div key={post.postList.postId}>
                <strong>{post.postList.title}</strong>
                <p className="text-sm">{post.postList.place}</p>
                <Badge variant={post.postList.status}></Badge>
                <BookmarkBtn bookmarkId={post.postList.bookmarkId} isBookmarked={post.postList.bookmarkId} />
              </div>
            ))}
        </button>,
        container.current,
      )
    : null;
}
