import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export async function signInWithGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider)
    return userCredential.user
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
