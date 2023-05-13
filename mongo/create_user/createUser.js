const MongoClient = require("mongodb").MongoClient;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query, defaultValue = "") {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      if (answer === "") {
        resolve(defaultValue);
      } else {
        resolve(answer);
      }
    });
  });
}

async function createMongoDbUser() {
  const adminUser = await askQuestion(
    "Enter admin username for MongoDB (default is root): ",
    "root"
  );
  const adminPassword = await askQuestion("Enter admin password for MongoDB: ");
  const user = await askQuestion(
    "Enter username for the new MongoDB user (default is dionysius): ",
    "dionysius"
  );
  const pwd = await askQuestion("Enter password for the new MongoDB user: ");
  const host = await askQuestion(
    "Enter MongoDB host (default is 127.0.0.1): ",
    "127.0.0.1"
  );
  const port = await askQuestion(
    "Enter MongoDB port (default is 27017): ",
    "27017"
  );
  const dbName = await askQuestion(
    "Enter database name (default is dionysius): ",
    "dionysius"
  );

  const url = `mongodb://${encodeURIComponent(adminUser)}:${encodeURIComponent(
    adminPassword
  )}@${host}:${port}/admin`;
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();

    const adminDb = client.db(`${dbName}`);

    const roles = [
      {
        role: "readWrite",
        db: dbName,
      },
    ];

    await adminDb.command({ createUser: user, pwd: pwd, roles: roles });

    console.log("User created successfully");

    // Authenticate as the new user
    const newUserUrl = `mongodb://${encodeURIComponent(
      user
    )}:${encodeURIComponent(pwd)}@${host}:${port}/${dbName}`;
    const newUserClient = new MongoClient(newUserUrl, {
      useUnifiedTopology: true,
    });
    await newUserClient.connect();

    console.log("Successfully authenticated as the new user");

    // Perform further operations with the authenticated client if needed

    await newUserClient.close();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    rl.close();
  }
}

createMongoDbUser();
