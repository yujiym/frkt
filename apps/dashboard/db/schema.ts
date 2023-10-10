import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().notNull(),
  address: text('address'),
  githubProfileId: text('githubProfileId'),
  googleProfileId: text('googleProfileId'),
  email: text('email'),
  username: text('username'),
  bio: text('bio'),
  iconUrl: text('iconUrl'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
})
