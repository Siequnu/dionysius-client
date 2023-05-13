import { MongoClient } from "mongodb";
import config from "../../config.mjs";

export const createMongoDbUser = async () => {
  const url = `mongodb://${encodeURIComponent(
    config.db.adminUsername
  )}:${encodeURIComponent(config.db.adminPassword)}@${config.db.host}:${
    config.db.port
  }/admin`;
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();

    const adminDb = client.db(config.db.dbName);

    const roles = [
      {
        role: "readWrite",
        db: config.db.dbName,
      },
    ];

    await adminDb.command({
      createUser: config.db.username,
      pwd: config.db.password,
      roles: roles,
    });

    console.log("User created successfully");

    // Authenticate as the new user
    const newUserUrl = `mongodb://${encodeURIComponent(
      config.db.username
    )}:${encodeURIComponent(config.db.password)}@${config.db.host}:${
      config.db.port
    }/${config.db.dbName}`;
    const newUserClient = new MongoClient(newUserUrl, {
      useUnifiedTopology: true,
    });
    await newUserClient.connect();

    console.log("Successfully authenticated as the new user");

    // Perform further operations with the authenticated client if needed

    await newUserClient.close();
  } catch (err) {
    //console.error(err);
  } finally {
    await client.close();
  }
};

createMongoDbUser();
