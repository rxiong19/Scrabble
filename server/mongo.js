import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://rxiong:Xrn123456rui.@cluster0.kcweqlg.mongodb.net/?retryWrites=true&w=majority";

export class WordDatabase {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db("word");

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection("word");
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a word entry in the database.
  async createWord(id, name, word, score) {
    let entry = { _id: id, name: name, word: word, score: score };
    const res = await this.collection.insertOne(entry);

    return res;
  }

  // READ a word entry from the database.
  async readWord(id) {
    const res = await this.collection.findOne({ _id: id });
    return res;
  }

  // UPDATE a word entry in the database.
  async updateWord(id, name, word, score) {
    let entry = { name: name, word: word, score: score };
    const res = await this.collection.updateOne({ _id: id }, { $set: entry });
    return res;
  }

  // DELETE a word entry from the database.
  async deleteWord(id) {
    const res = await this.collection.deleteOne({ _id: id });
    return res;
  }

  // READ all people from the database.
  async readAllWord() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}
