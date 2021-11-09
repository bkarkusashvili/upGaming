import moment from 'moment';
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
      sports[sport.ID].checked = true;

      console.log(Object.values(sport.Regions).filter(region => region.checked === undefined || region.checked));
    }

    setSports({ ...sports });
  };

  return (
    <>
      <div className="container">
        <aside className="left">
          {data && <Sports data={data} toggleSport={toggleSport} activeSports={sports} />}
          {sportList.map(sport =>
            <Regions data={sport.Regions} sport={sport.Name} games={sport.TotalGames} checked={sport.checked} />
          )}
        </aside>
        <main className="box">
          {sportList.filter(sport => sport.checked).map(sport => (
            <div key={sport.ID} className="sport">
              <h3>{sport.Name}</h3>
              <div className="list">
                {Object.values(sport.Regions)
                  .filter(region => region.checked === undefined || region.checked)
                  .map(region => Object.values(region.Champs)
                    .filter(champ => champ.checked === undefined || champ.checked)
                    .map(champ => Object.values(champ.GameSmallItems).map(game => (
                      <div className="item" key={champ.ID}>
                        <div className="content">
                          <span className="date">{moment(game.StartTime).format('DD MMM HH:mm')}</span>
                          <span>{game.t1} - {game.t2}</span>
                        </div>
                        <span></span>
                      </div>
                    ))))}
              </div>
            </div>
          ))}
        </main>
      </div>

    </>
  );
};

export default App;