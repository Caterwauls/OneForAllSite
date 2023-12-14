import { app } from './firebase';
import { writable } from 'svelte/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const auth = getAuth();

onAuthStateChanged(auth, (user) => {
	if (user) {
		isLoggedIn.set(true);
		userId.set(user.uid);
	} else {
		isLoggedIn.set(false);
		userId.set(null);
	}
});

export const isLoggedIn = writable(false);
export const userId = writable(null);
