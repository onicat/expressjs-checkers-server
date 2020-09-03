const generateUniqueIdFor = (map) => {
  let id = null;

  do {
    id = Math.random().toFixed(4).slice(-4);
  } while (map.has(id));

  return id;
};

module.exports = generateUniqueIdFor;