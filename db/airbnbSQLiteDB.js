const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/project1.db",
    driver: sqlite3.Database,
  });
}

async function getDistricts() {
  const db = await connect();

  return await db.all("SELECT * FROM District");
}

async function createDistrict(newDistrict) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    District(districtName)
    VALUES (:districtName)
  `);

  stmt.bind({
    ":districtName": newDistrict.districtName,
  });

  return await stmt.run();
}

async function getdistrictByID(DistrictID) {
  const db = await connect();

  const stmt = await db.prepare(`SELECT *
    FROM District
    WHERE
      districtId = :districtId
  `);

  stmt.bind({
    ":districtId": DistrictID,
  });

  return await stmt.get();
}

async function deleteDistrict(DistrictToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    District
    WHERE districtId = :theIDToDelete
  `);

  stmt.bind({
    ":theIDToDelete": DistrictToDelete.districtId,
  });

  return await stmt.run();
}

 
async function updateDistrict(districtToUpdate) {
  const db = await connect();

  const stmt = await db.prepare(`UPDATE District
    SET districtName = :districtName
    WHERE districtId = :districtId
  `);

  stmt.bind({
    ":districtName" : districtToUpdate.districtName,
    ":districtId" : districtToUpdate.districtId,
  });

  return await stmt.run();
}

module.exports.getDistricts = getDistricts;
module.exports.createDistrict = createDistrict;
module.exports.deleteDistrict = deleteDistrict;
module.exports.getdistrictByID = getdistrictByID;
module.exports.updateDistrict = updateDistrict;
