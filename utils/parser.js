function convertMapToJson(map) {
  const json = JSON.stringify(Object.fromEntries(map));
  const obj = JSON.parse(json);
  return obj;
}

module.exports = { convertMapToJson };
