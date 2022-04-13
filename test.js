const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ildikoR:P2pPS1WpL04ZsnLC@myfirstcluster.bcz4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("sample_mflix").collection("users");
  // perform actions on the collection object
  client.close();
});