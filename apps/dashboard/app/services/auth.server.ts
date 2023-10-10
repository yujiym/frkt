import type { AppLoadContext } from '@remix-run/cloudflare'
import {
  createCookie,
  createWorkersKVSessionStorage,
} from '@remix-run/cloudflare'
import { Authenticator } from 'remix-auth'
// import { GoogleStrategy } from 'remix-auth-google'
import { GitHubStrategy } from 'remix-auth-github'
import { users } from 'db/schema'
import { InferInsertModel, eq } from 'drizzle-orm'
import { createClient } from '~/services/db.server'
import { getAuthCallbackURL } from '@/common/lib/utils'

export type AuthUser = {
  id: number
  address?: string
  githubProfileId?: string
  googleProfileId?: string
  email?: string
  username?: string
  bio?: string
  iconUrl?: string
}

type CreateUser = InferInsertModel<typeof users>

let _authenticator: Authenticator<AuthUser> | undefined

export function getAuthenticator(
  context: AppLoadContext
): Authenticator<AuthUser> {
  if (_authenticator == null) {
    const env = context.env as Env
    const cookie = createCookie('__session', {
      secrets: [env.SESSION_SECRET],
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
    })
    const sessionStorage = createWorkersKVSessionStorage({
      kv: env.SESSION_KV as KVNamespace,
      cookie,
    })
    _authenticator = new Authenticator<AuthUser>(sessionStorage)
    const githubAuth = new GitHubStrategy(
      {
        clientID: env.GITHUB_AUTH_CLIENT_ID,
        clientSecret: env.GITHUB_AUTH_CLIENT_SECRET,
        callbackURL: getAuthCallbackURL('github'),
      },
      async ({ profile }: { profile: any }) => {
        const db = createClient(env.DB)
        const user = await db
          .select()
          .from(users)
          .where(eq(users.githubProfileId, profile.id))
          .get()
        if (user) return user as AuthUser

        const newUser: CreateUser = {
          githubProfileId: profile.id,
          email: profile.emails?.[0].value,
          username: profile.username,
          bio: profile.bio,
          iconUrl: profile.photos?.[0].value,
          createdAt: new Date(),
        }

        const ret = await db.insert(users).values(newUser).returning().get()

        return {
          id: ret.id,
          githubProfileId: profile.id,
          email: profile.emails?.[0].value,
          username: profile.username,
          bio: profile.bio,
          iconUrl: ret.createdAt,
        }
      }
    )
    _authenticator.use(githubAuth)
  }
  return _authenticator
}
