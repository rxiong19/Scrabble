import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://rxiong:Xrn123456rui.@cluster0.kcweqlg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
await client.connect();
class MongoDB {
  constructor() {
    const database = client.db("Scrabble");
    this.db = database.collection("scrabble");
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE an entry in the database.
  async create(scrabble) {
    const res = await this.db.insertOne(scrabble);

    return res;
  }

  // READ a word entry from the database.
  async read(id) {
    const res = await this.db.findOne({ _id: id });
    return res;
  }

  // UPDATE a word entry in the database.
  async update(scrabble) {
    // let data = await this.db.findOne({ _id: 0 });
    // data = scrabble;
    await this.db.deleteOne({ _id: 0 });
    const res = await this.db.insertOne(scrabble);
    // const res = await this.db.updateOne({
    //   $set: { word: scrabble.word, game: scrabble.game },
    // });
    return res;
  }

  // DELETE a word entry from the database.
  async delete(id) {
    const res = await this.db.deleteOne({ _id: id });
    return res;
  }

  // READ all entries from the database.
  async readAll() {
    const res = await this.db.find({}).toArray();
    return res;
  }
}

const db = new MongoDB();
export { db };
