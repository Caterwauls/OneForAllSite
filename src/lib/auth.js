import { app } from './firebase';
import { writable } from 'svelte/store';
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

export const isLoggedIn = writable(false);
export const userId = writable(null);
export const user = writable(null);
export const auth = getAuth();

onAuthStateChanged(auth, (u) => {
	if (u) {
		isLoggedIn.set(true);
		userId.set(u.uid);
		user.set(u);
	} else {
		isLoggedIn.set(false);
		userId.set(null);
		user.set(null);
	}
});
