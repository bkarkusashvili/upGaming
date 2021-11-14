import { countGames } from "../helpers";

export const getGames = fetch('https://sportservice.inplaynet.tech/api/sport/getheader/en')
  .then(response => response.json())
  .then((SportData) => {
    const data = JSON.parse(SportData).EN.Sports;
    Object.values(data).forEach(sport => data[sport.ID].TotalGames = countGames(sport.Regions));

    return data;
  })
  .catch((e) => console.error(e));

export const getTeams = fetch('https://sportservice.inplaynet.tech/api/sport/getheader/teams/en')
  .then(response => response.json())
  .then(res => {
    const teams = {};

    JSON.parse(res).forEach(item => teams[item.ID] = item);

    return teams;
  })
  .catch((e) => console.error(e));