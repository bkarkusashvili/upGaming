import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import Regions from './components/Regions';
import Sports from './components/Sports';
import { getGames, getTeams } from './services';
import './styles/index.scss';

const App = () => {
  const [data, setData] = useState();
  const [sports, setSports] = useState({});
  const [teams, setTeams] = useState({});

  const sportList = useMemo(() => Object.values(sports), [sports]);

  useEffect(() => getGames.then(data => setData(data)), []);
  useEffect(() => getTeams.then(data => setTeams(data)), []);

  const toggleSport = sport => {
    if (sports[sport.ID]) {
      delete sports[sport.ID];
    } else {
      sports[sport.ID] = sport;
      sports[sport.ID].checked = true;
      Object.values(sports[sport.ID].Regions)
        .forEach(region => {
          region.checked = true;
          region.indeterminate = false;

          Object.values(region.Champs)
            .forEach(champs => champs.checked = true)
        });
    }

    setSports({ ...sports });
  };

  const onRegionCheck = (sportID, regionID, checked) => {
    sports[sportID].Regions[regionID].checked = checked;

    setSports({ ...sports });
  };

  const onChampCheck = (sportID, regionID, champID, checked) => {
    sports[sportID].Regions[regionID].Champs[champID].checked = checked;

    setSports({ ...sports });
  };

  return (
    <>
      <div className="container">
        <aside className="left">
          {data && <Sports data={data} toggleSport={toggleSport} activeSports={sports} />}
          {sportList.map(sport =>
            <Regions
              key={sport.ID}
              data={sport.Regions}
              sport={sport.Name}
              games={sport.TotalGames}
              checked={sport.checked}
              onChampCheck={(regionID, champID, checked) => onChampCheck(sport.ID, regionID, champID, checked)}
              onRegionCheck={(regionID, checked) => onRegionCheck(sport.ID, regionID, checked)}
            />
          )}
        </aside>
        <main className="box">
          {sportList.filter(sport => sport.checked).map(sport => (
            <div key={sport.ID} className="sport">
              <h3>{sport.Name}</h3>
              {sport.Regions && (
                <div className="list">
                  {Object.values(sport.Regions)
                    .filter(region => region.checked === undefined || region.checked)
                    .map(region => Object.values(region.Champs)
                      .filter(champ => champ.checked === undefined || champ.checked)
                      .map(champ => Object.values(champ.GameSmallItems).map(game => (
                        <div className="item" key={game.ID}>
                          <div className="content">
                            <span className="date">{moment(game.StartTime).format('DD MMM HH:mm')}</span>
                            <span>{teams[game.t1]?.Name} - {teams[game.t2]?.Name}</span>
                          </div>
                          <span></span>
                        </div>
                      ))))}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>

    </>
  );
};

export default App;