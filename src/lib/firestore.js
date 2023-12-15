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
	serverTimestamp,
	getCountFromServer
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

export async function getArticles(){
	const articles = [];

	const q = await getDocs(collection(db,'articles'));
	q.forEach((doc) => {
		const article = {
			id: doc.id,
			data: doc.data()
		};
		
		articles.push(article);
		});
		articles.sort((a,b) => a.data.date - b.data.date)
		return articles;
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

export async function getCommentCount(articleId) {
	const commentQuery = query(
	  collection(db, 'comments'),
	  where('article', '==', articleId)
	);
	const commentSnapshot = await getCountFromServer(commentQuery);
	return commentSnapshot.data().count; 
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
