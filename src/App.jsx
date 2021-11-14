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
      sports[sport.ID].indeterminate = false;
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

  const onSportCheck = (sportID, checked) => {
    const sport = sports[sportID];
    const regions = sport.Regions;

    sport.checked = checked;
    sport.indeterminate = false;

    Object.values(regions).forEach(region => {
      region.checked = checked;
      region.indeterminate = false;

      Object.values(region.champs).forEach(champ => champ.checked = checked);
    });

    setSports({ ...sports });
  };

  const onRegionCheck = (sportID, regionID, checked) => {
    const sport = sports[sportID];
    const region = sport.Regions[regionID];
    const champs = region.Champs;

    region.checked = checked;
    region.indeterminate = false;

    Object.values(champs).forEach(champ => champ.checked = checked);

    const isSportChecked = Object.values(sport.Regions).some(region => region.checked);
    const isSportIndeterminate = isSportChecked && !Object.values(sport.Regions).every(region => region.checked);
    sport.checked = isSportChecked;
    sport.indeterminate = isSportIndeterminate;

    setSports({ ...sports });
  };

  const onChampCheck = (sportID, regionID, champID, checked) => {
    const sport = sports[sportID];
    const region = sport.Regions[regionID];
    const champs = region.Champs;

    champs[champID].checked = checked;

    const isRegionChecked = Object.values(champs).some(champ => champ.checked);
    const isRegionIndeterminate = isRegionChecked && !Object.values(champs).every(champ => champ.checked);
    region.checked = isRegionChecked;
    region.indeterminate = isRegionIndeterminate;

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
              indeterminate={sport.indeterminate}
              onChampCheck={(regionID, champID, checked) => onChampCheck(sport.ID, regionID, champID, checked)}
              onRegionCheck={(regionID, checked) => onRegionCheck(sport.ID, regionID, checked)}
              onSportCheck={(checked) => onSportCheck(sport.ID, checked)}
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
                    .filter(region => region.checked)
                    .map(region => Object.values(region.Champs)
                      .filter(champ => champ.checked)
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