export const countGames = (regions) => {
  let total = 0;
  Object.values(regions).forEach(region => {
    Object.values(region.Champs).forEach(champ => total += champ.GameCount)
  });

  return total;
};

export const getClassName = classes => Object.keys(classes).filter(name => classes[name]).join(' ');

