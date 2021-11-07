import { countGames } from "../helpers";

const API = 'https://sportservice.inplaynet.tech/api/sport/getheader/en';

export const getGames = fetch(API)
  .then(response => response.json())
  .then((SportData) => {
    const data = JSON.parse(SportData).EN.Sports;
    Object.values(data).forEach(sport => data[sport.ID].TotalGames = countGames(sport.Regions));

    return data;
  })
  .catch((e) => console.error(e));
