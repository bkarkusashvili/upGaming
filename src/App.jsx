import React, { useEffect, useMemo, useState } from 'react';
import Regions from './components/Regions';
import Sports from './components/Sports';
import { getGames } from './services';
import './styles/index.scss';

const App = () => {
  const [data, setData] = useState();
  const [sports, setSports] = useState({});

  const sportList = useMemo(() => Object.values(sports), [sports]);

  useEffect(() => getGames.then(data => setData(data)), []);

  const toggleSport = sport => {
    if (sports[sport.ID]) {
      delete sports[sport.ID];
    } else {
      sports[sport.ID] = sport;
    }

    setSports({ ...sports });
  };

  console.log(sports);
  return (
    <>
      <div className="container">
        <aside className="left">
          {data && <Sports data={data} toggleSport={toggleSport} activeSports={sports} />}
          {sportList.map(sport =>
            <Regions data={sport.Regions} sport={sport.Name} games={sport.TotalGames} />
          )}
        </aside>
      </div>

    </>
  );
};

export default App;