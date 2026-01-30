const { pgTable, uuid, varchar, text } = require("drizzle-orm/pg-core");
const authors = require("./author.model");

const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  authorId: uuid("author_id")
    .references(() => authors.id)
    .notNull(),
});

module.exports = books;
