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
	getCountFromServer,
	updateDoc,
	arrayUnion,
	arrayRemove,
	increment,
	deleteDoc,
	setDoc
} from 'firebase/firestore';

export const db = getFirestore(app);

// Article을 가져옵니다. 없으면 null 반환.
export async function getArticle(id) {
	const docRef = doc(db, 'articles', id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return null;
	}
	await updateDoc(docRef, {
		readCount: increment(1)
	});
	const data = docSnap.data();
	return data;
}

export async function getArticles() {
	const articles = [];

	const q = await getDocs(collection(db, 'articles'));
	q.forEach((doc) => {
		const article = {
			id: doc.id,
			data: doc.data()
		};

		articles.push(article);
	});
	articles.sort((a, b) => a.data.date - b.data.date);
	return articles;
}

export async function getComments(articleId) {
	const q = query(collection(db, 'comments'), where('article', '==', articleId));

	const querySnapshot = await getDocs(q);
	const list = [];
	querySnapshot.forEach((doc) => {
		list.push({
			...doc.data(),
			id: doc.id
		});
	});
	list.sort((a, b) => a.date - b.date);
	return list;
}

export async function getCommentCount(articleId) {
	const commentQuery = query(collection(db, 'comments'), where('article', '==', articleId));
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
	newData.id = docRef.id;
	return newData;
}

export async function likeArticle(isLike, articleId) {
	const docRef = doc(db, 'articles', articleId);
	await updateDoc(docRef, {
		likeUsers: isLike ? arrayUnion(get(userId)) : arrayRemove(get(userId))
	});
}

export async function deleteComment(id) {
	const docRef = doc(db, 'comments', id);
	await deleteDoc(docRef);
}

export async function addArticle(title, content) {
	if (!get(isLoggedIn)) {
		console.log('Not logged in');
		return;
	}
	const newData = {
		author: get(userId),
		content: content,
		date: serverTimestamp(),
		likeUsers: [],
		readCount: 0,
		title: title
	};
	const docRef = await addDoc(collection(db, 'articles'), newData);
	return docRef.id;
}

export async function deleteArticle(id) {
	const comments = await getComments(id);
	for (let i = 0; i < comments.length; i++) {
		await deleteDoc(doc(db, 'comments', comments[i].id));
	}

	await deleteDoc(doc(db, 'articles', id));
}

export async function getUserInfo(id) {
	const docRef = doc(db, 'users', id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return await setUserInfo(id, getRandomName(), '프로필 설명이 없습니다.');
	}
	const data = docSnap.data();
	return data;
}

export async function setUserInfo(id, nickname, profileDescription) {
	const data = {
		nickname,
		profileDescription
	};
	await setDoc(doc(db, 'users', id), data);
	return data;
}

const randomNameA = [
	'똑똑한',
	'귀여운',
	'사랑스러운',
	'예쁜',
	'멋진',
	'활발한',
	'시크한',
	'행복한'
];
const randomNameB = [
	'청년',
	'멋쟁이',
	'귀염둥이',
	'꽃밭',
	'도마뱀',
	'강아지',
	'멍멍이',
	'냐옹이',
	'고양이'
];

function getRandomName() {
	return (
		randomNameA[Math.floor(Math.random() * randomNameA.length)] +
		randomNameB[Math.floor(Math.random() * randomNameB.length)]
	);
}
