import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Video from './Video/Video';
import './Videos.css';
import useVideoList from '../../Hooks/useVideoList';
import InfiniteScroll from 'react-infinite-scroll-component';

const Videos = () => {
    const [page, setPage] = useState(1);
    const { isLoading, error, videos, hasMore } = useVideoList(page);

    return (
      <div className="videos">
        {videos.length > 0 && (
          <InfiniteScroll
            dataLength={videos.length}
                    hasMore={hasMore}
                    loader="Loading..."
            next={() => {
              setPage(page + 3);
            }}
          >
            {videos.map((video, index) => {
              const { title } = video;
              return video.noq > 0 ? (
                <Link
                  to={`/quiz/${video.youtubeID}`}
                  key={index}
                  state={{ title }}
                >
                  <Video
                    title={video.title}
                    id={video.youtubeID}
                    noq={video.noq}
                  />
                </Link>
              ) : (
                <Video
                  key={index}
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              );})}
          </InfiniteScroll>
        )}
        {!isLoading && videos.length === 0 && (
          <div className="error">No Data Found!</div>
        )}
        {error && <div className="error">There was an error!</div>}
        {isLoading && <div>Loading...</div>}
      </div>
    );
}

export default Videos