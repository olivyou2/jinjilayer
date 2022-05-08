/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  MouseEvent,
  useEffect, useRef, useState,
} from 'react';
import './App.css';

// https://image.yes24.com/goods/107993640/XL

interface songProps {
  title: string,
  singer: string,
  isplay: boolean
}

function Song({ title, singer, isplay }: songProps) {
  return (
    <div className="Song">
      <div className={`SongTitle ${isplay ? 'SongPlaying' : ''}`}>
        {title}
      </div>
      <div className={`SongSinger ${isplay ? 'SongPlaying' : ''}`}>
        {singer}
      </div>
    </div>
  );
}

function App() {
  const [songs] = useState([
    {
      title: 'Burgundy Red',
      singer: 'Sunset Rollercoast',
      time: 202,
    },
    {
      title: 'My Jinji',
      singer: 'Sunset Rollercoast',
      time: 360,
    },
    {
      title: 'New Drug',
      singer: 'Sunset Rollercoast',
      time: 360,
    },
  ]);

  const [playingIndex] = useState(0);
  const [playingTime, setPlayingTime] = useState(0);
  const [isClick, setIsClick] = useState(false);

  const checkIsPlaying = (song: Number) => song === playingIndex;

  const getPlayingSong = () => songs[playingIndex];
  const getPlayingTime = () => playingTime;

  const statusBarRef = useRef<HTMLDivElement>(null);
  const statusCircleRef = useRef<HTMLDivElement>(null);

  const onBarDown = () => {
    setIsClick(true);
  };

  const onBarUp = () => {
    setIsClick(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    const mx = e.clientX;
    console.log(mx, isClick);
  };

  const secondToTime = (second: number) => {
    if (second >= 60) {
      return `${Math.floor(second / 60)}:${second % 60}`;
    }

    return `0:${second.toString()}`;
  };

  useEffect(() => {
    setTimeout(() => {
      setPlayingTime(playingTime + 1);
    }, 1000);

    const clientWidth = statusBarRef.current?.clientWidth;

    if (clientWidth) {
      statusCircleRef.current?.style.setProperty('left', `${clientWidth * (getPlayingTime() / getPlayingSong().time)}px`);
    }
  }, [playingTime]);

  return (
    <div className="App" onMouseMove={(e) => onMouseMove(e)}>
      <div className="Playing">
        <div className="PlayingCoverWrapper">
          <img className="PlayingCover" alt="AlbumCover" src="https://image.yes24.com/goods/107993640/XL" />
        </div>
        <div className="NowPlaying">
          <div className="NowPlayingTime">
            {secondToTime(getPlayingTime())}
            /
            {secondToTime(getPlayingSong().time)}
          </div>
          <div className="NowPlayingBar" ref={statusBarRef}>
            <div className="NowPlayingBarCircle" role="button" ref={statusCircleRef} onMouseUp={() => onBarUp()} onMouseDown={() => onBarDown()} tabIndex={0} />
          </div>
          <div className="NowPlayingTitle">
            {getPlayingSong().title}
          </div>
          <div className="NowPlayingSinger">
            {getPlayingSong().singer}
          </div>
        </div>
      </div>
      <div className="Playlist">
        <div className="Search">
          <input id="SearchInput" placeholder="Search" />
        </div>
        <div className="Songs">
          {songs.map((song, ind) => <Song title={`${ind + 1}. ${song.title}`} singer={song.singer} isplay={checkIsPlaying(ind)} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
