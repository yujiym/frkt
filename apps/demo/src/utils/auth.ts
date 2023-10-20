import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    return {
      user: res.user,
      accessToken: res._tokenResponse.oauthAccessToken,
    }
  } catch (e) {
    console.log(e)
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (e) {
    console.log(e)
  }
}

export async function signOut() {
  try {
    await auth.signOut()
  } catch (e) {
    console.log(e)
  }
}
