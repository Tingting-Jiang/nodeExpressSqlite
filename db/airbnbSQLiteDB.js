const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/project1.db",
    driver: sqlite3.Database,
  });
}



/* ---------Districts related functions starts from here -----------------*/
/* add lines to close the db */
async function getDistricts() {
  const db = await connect();

  try {
    return await db.all("SELECT * FROM District");
  } finally {
    await db.close();
  }
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

async function getdistrictByID(districtId) {

  let db, stmt;
  try {
    db = await connect();
    stmt = await db.prepare(`SELECT *
    FROM District
    WHERE
      districtId = :districtId
  `);

  stmt.bind({
    ":districtId": districtId,
  });
    return await stmt.get();
  } finally {
    stmt.finalize();
    db.close();
  }
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


/* ---------Reviews related functions starts from here -----------------*/
async function getReviews() {
  const db = await connect();

  try {
    return await db.all("SELECT * FROM Review ORDER BY reviewID DESC LIMIT 20");
  } finally {
    await db.close();
  }
}



async function createReview(newReview) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    Review(lastReviewTime, reviewNum, reviewScoreRating, 
      reviewScoreAccuracy, reviewScoreCleanliness, reviewScoreCheckin,
      reviewScoreLocation, reviewScoreValue, reviewPerMonth)

      VALUES (:lastReviewTime, :reviewNum, :reviewScoreRating, 
      :reviewScoreAccuracy, :reviewScoreCleanliness, :reviewScoreCheckin,
      :reviewScoreLocation, :reviewScoreValue, :reviewPerMonth)
    `);

    stmt.bind({
      ":lastReviewTime": newReview.lastReviewTime,
      ":reviewNum": newReview.reviewNum,
      ":reviewScoreRating": newReview.reviewScoreRating,
      ":reviewScoreAccuracy": newReview.reviewScoreAccuracy,
      ":reviewScoreCleanliness": newReview.reviewScoreCleanliness,
      ":reviewScoreCheckin": newReview.reviewScoreCheckin,
      ":reviewScoreLocation": newReview.reviewScoreLocation,
      ":reviewScoreValue": newReview.reviewScoreValue,
      ":reviewPerMonth": newReview.reviewPerMonth,
    });


  return await stmt.run();
}


async function getReviewByID(reviewID) {
  console.log("in the funcion --------")

  let db, stmt;
  try {
    db = await connect();
    stmt = await db.prepare(`SELECT *
    FROM Review
    WHERE
      reviewID = :oldReviewID
  `);

  stmt.bind({
    ":oldReviewID": reviewID,
  });
    return await stmt.get();
  } finally {
    stmt.finalize();
    db.close();
  }
}


async function deleteReview(reviewToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    Review
    WHERE reviewID = :theIDToDelete
  `);

  stmt.bind({
    ":theIDToDelete": reviewToDelete.reviewID,
  });

  return await stmt.run();
}

 
// async function updateReview(reviewToUpdate) {

//      const db = await connect();

//      const stmt = await db.prepare(`UPDATE Review
//       SET lastReviewTime = :lastReviewTime, 
//           reviewNum = :reviewNum,
//           reviewScoreRating = :reviewScoreRating , 
//           reviewScoreAccuracy = :reviewScoreAccuracy, 
//           reviewScoreCleanliness = :reviewScoreCleanliness, 
//           reviewScoreCheckin = :reviewScoreCheckin,
//           reviewScoreLocation = :reviewScoreLocation, 
//           reviewScoreValue = :reviewScoreValue, 
//           reviewPerMonth = :reviewPerMonth
//       WHERE reviewID = :reviewID
//     `);

//     stmt.bind({
//       ":reviewID": reviewToUpdate.reviewID,
//       ":lastReviewTime": reviewToUpdate.lastReviewTime,
//       ":reviewNum": reviewToUpdate.reviewNum,
//       ":reviewScoreRating": reviewToUpdate.reviewScoreRating,
//       ":reviewScoreAccuracy": reviewToUpdate.reviewScoreAccuracy,
//       ":reviewScoreCleanliness": reviewToUpdate.reviewScoreCleanliness,
//       ":reviewScoreCheckin": reviewToUpdate.reviewScoreCheckin,
//       ":reviewScoreLocation": reviewToUpdate.reviewScoreLocation,
//       ":reviewScoreValue": reviewToUpdate.reviewScoreValue,
//       ":reviewPerMonth": reviewToUpdate.reviewPerMonth,
//       });
//     console.log("--------before return");

//     return await stmt.run();
//     stmt.finalize();


// }



// async function updateReview(reviewToUpdate) {
    
//      let stmt, db;
//      try{
//         db = await connect();

//        stmt = await db.prepare(`UPDATE Review
//         SET lastReviewTime = :lastReviewTime           
//         WHERE reviewID = :reviewID
//       `);

//       stmt.bind({
//         ":reviewID": reviewToUpdate.reviewID,
//         ":lastReviewTime": reviewToUpdate.lastReviewTime,
//         });

//       return await stmt.run();
//     } finally{
//       stmt.finalize();
//       db.close();
//     }
//}



async function updateReview(reviewToUpdate) {
    
     
      const db = await connect();

      const stmt = await db.prepare(`UPDATE Review
        SET lastReviewTime = :lastReviewTime           
        WHERE reviewID = :reviewID
      `);

      stmt.bind({
        ":reviewID": reviewToUpdate.reviewID,
        ":lastReviewTime": reviewToUpdate.lastReviewTime,
        });

      return await stmt.run();
    
}
 



/* ---------Property type related functions starts from here -----------------*/
/* add lines to close the db */
async function getRoomType() {
  const db = await connect();

  try {
    return await db.all("SELECT * FROM roomType");
  } finally {
    await db.close();
  }
}



async function createRoomType(newRoomType) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    RoomType(roomTypeName)
    VALUES (:roomTypeName)
  `);

  stmt.bind({
    ":roomTypeName": newRoomType.roomTypeName,
  });

  return await stmt.run();
}

async function getRoomTypeByID(roomTypeID) {


  let db, stmt;
  try {
    db = await connect();
    stmt = await db.prepare(`SELECT *
    FROM RoomType
    WHERE
      roomTypeID = :roomTypeID
  `);

  stmt.bind({
    ":roomTypeID": roomTypeID,
  });
    return await stmt.get();
  } finally {
    stmt.finalize();
    db.close();
  }
}


async function deleteRoomType(roomTypeToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    RoomType
    WHERE roomTypeID = :roomTypeID
  `);

  stmt.bind({
    ":roomTypeID": roomTypeToDelete.roomTypeID,
  });

  return await stmt.run();
}

 
async function updateRoomType(roomTypeToUpdate) {
  const db = await connect();

  const stmt = await db.prepare(`UPDATE RoomType
    SET roomTypeName = :roomTypeName
    WHERE roomTypeID = :roomTypeID
  `);

  stmt.bind({
    ":roomTypeName" : roomTypeToUpdate.roomTypeName,
    ":roomTypeID" : roomTypeToUpdate.roomTypeID,
  });

  return await stmt.run();
}



module.exports.getDistricts = getDistricts;
module.exports.createDistrict = createDistrict;
module.exports.deleteDistrict = deleteDistrict;
module.exports.getdistrictByID = getdistrictByID;
module.exports.updateDistrict = updateDistrict;

module.exports.getReviews = getReviews;
module.exports.createReview = createReview;
module.exports.deleteReview = deleteReview;
module.exports.getReviewByID = getReviewByID;
module.exports.updateReview = updateReview;


module.exports.getRoomType = getRoomType;
module.exports.createRoomType = createRoomType;
module.exports.deleteRoomType = deleteRoomType;
module.exports.getRoomTypeByID = getRoomTypeByID;
module.exports.updateRoomType = updateRoomType;


