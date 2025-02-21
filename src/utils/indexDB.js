// utils/indexedDB.js

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("QuizDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("quizHistory")) {
                db.createObjectStore("quizHistory", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error opening IndexedDB");
    });
};

export const saveQuizResult = async (quizData) => {
    const db = await openDB();
    const transaction = db.transaction("quizHistory", "readwrite");
    const store = transaction.objectStore("quizHistory");
    store.add(quizData);
};

export const getQuizHistory = async () => {
    return new Promise(async (resolve, reject) => {
        const db = await openDB();
        const transaction = db.transaction("quizHistory", "readonly");
        const store = transaction.objectStore("quizHistory");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error retrieving quiz history");
    });
};
