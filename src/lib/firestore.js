import { get } from 'svelte/store';
import { isLoggedIn, userId } from './auth';
import { app } from './firebase';
import {
	doc,
	getDoc,
	getFirestore,
	collection,
	query,
	where,
	getDocs,
	addDoc,
	serverTimestamp
} from 'firebase/firestore';

export const db = getFirestore(app);

// Article을 가져옵니다. 없으면 null 반환.
export async function getArticle(id) {
	const docRef = doc(db, 'articles', id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return null;
	}

	const data = docSnap.data();
	return data;
}

export async function getComments(articleId) {
	const q = query(collection(db, 'comments'), where('article', '==', articleId));

	const querySnapshot = await getDocs(q);
	const list = [];
	querySnapshot.forEach((doc) => {
		list.push(doc.data());
	});
	list.sort((a, b) => a.date - b.date);
	return list;
}

export async function addComment(articleId, content) {
	if (!get(isLoggedIn)) {
		console.log('Not logged in');
		return;
	}
	const newData = {
		article: articleId,
		author: get(userId),
		content: content,
		date: serverTimestamp()
	};
	const docRef = await addDoc(collection(db, 'comments'), newData);
    newData.date = new Date();
	return newData;
}
