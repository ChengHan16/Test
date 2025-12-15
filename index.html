<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase 圖文網格編輯範例</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* --- 基礎設定 --- */
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f0f2f5; }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background-color: #fff; 
            padding: 25px; 
            border-radius: 10px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        h1 { color: #1a237e; border-bottom: 2px solid #ffcc00; padding-bottom: 10px; }
        h2 { color: #004d99; margin-top: 25px; }
        
        /* --- 1. 公開顯示區：網格佈局 --- */
        #public-display {
            background-color: transparent; 
            border: none;
            padding: 20px 0; 
            margin: 0;
            /* 實現多列佈局 */
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* 每列最小 100px */
            gap: 20px 10px; /* 行與列的間距 */
            justify-content: center; /* 網格置中 */
        }
        
        /* 移除 ul li 預設樣式，讓 li 成為網格項目 */
        #public-display ul {
            list-style: none; 
            padding: 0; 
            margin: 0;
            display: contents; 
        }
        #public-display ul li {
            padding: 0; 
            margin: 0; 
            text-align: center;
            overflow: hidden; 
            /* 讓 li 成為 flex 容器，以便按鈕在底部對齊 */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* --- 圖片/頭像樣式 --- */
        #public-display ul li img {
            width: 100px;       
            height: 100px;      
            max-width: 100%;
            display: block;
            margin: 0 auto 5px auto; 
            border-radius: 50%; 
            border: 3px solid #1a237e; 
            object-fit: cover; 
            flex-shrink: 0; /* 防止圖片被壓縮 */
        }

        /* --- 文字樣式 --- */
        #public-display .member-id {
            font-size: 0.8em; 
            color: #666; 
            margin-bottom: 3px;
            flex-shrink: 0;
        }
        #public-display .member-name {
            font-weight: bold; 
            font-size: 1.1em;
            color: #333;
            /* 讓名字區塊彈性成長 */
            flex-grow: 1; 
            display: flex;
            align-items: center; /* 垂直置中 */
            justify-content: center;
            padding-bottom: 5px;
        }

        /* 刪除按鈕樣式 */
        .delete-btn {
            background-color: #f44336; 
            color: white; 
            border: none; 
            padding: 5px 10px; 
            font-size: 0.8em; 
            border-radius: 4px; 
            margin-top: 5px; 
            cursor: pointer; 
            width: 80px; 
            display: block; 
            margin: 5px auto 0 auto !important; 
            transition: background-color 0.2s;
            flex-shrink: 0;
        }
        .delete-btn:hover {
            background-color: #d32f2f;
        }

        /* --- 2. 編輯區/登入區 (其他樣式保持不變) --- */
        #login-section { padding: 20px; background-color: #f5f5f5; border-radius: 8px; margin-bottom: 20px; }
        #edit-section { background-color: #e6f7ff; padding: 20px; border-radius: 8px; }
        .hidden { display: none !important; }
        
        input[type="email"], input[type="password"], textarea, input[type="file"], button { 
            padding: 10px; margin-top: 10px; display: block; width: 100%; box-sizing: border-box; border-radius: 5px;
        }
        input, textarea { border: 1px solid #ccc; }
        label { margin-top: 15px; display: block; font-weight: bold; }
        
        button { border: none; cursor: pointer; font-weight: bold; transition: background-color 0.3s; margin-top: 15px; }
        #loginBtn { background-color: #004d99; color: white; }
        #loginBtn:hover { background-color: #1a237e; }
        #saveBtn { background-color: #4caf50; color: white; }
        #saveBtn:hover { background-color: #3e8e41; }
        #signOutBtn { background-color: #f44336; color: white; }
        #signOutBtn:hover { background-color: #d32f2f; }

        #image-preview img {
            max-width: 100px; 
            height: 100px;
            display: block;
            border-radius: 50%; 
            object-fit: cover;
            border: 3px solid #1a237e; 
            margin-bottom: 10px;
        } 
    </style>
</head>
<body>

<div class="container">
    <h1><i class="fas fa-globe-asia"></i> 公開內容展示</h1>
    <p>以下為成員圖文列表，排序為建立時間由先至後。</p>
    
    <div id="public-display">
        <p style="text-align: center;">載入中...</p>
    </div>

    <hr>

    <h2><i class="fas fa-lock"></i> 管理員編輯區</h2>
    
    <div id="login-section">
        <input type="email" id="email" placeholder="管理員 Email" required>
        <input type="password" id="password" placeholder="密碼" required>
        <button id="loginBtn" onclick="signIn()"><i class="fas fa-sign-in-alt"></i> 登入</button>
        <p id="login-message" style="color: #f44336; margin-top: 10px; font-weight: bold;"></p>
    </div>

    <div id="edit-section" class="hidden">
        <h3><i class="fas fa-user-edit"></i> 新增成員/訊息 (<span id="user-email"></span>)</h3>
        
        <label for="editor-text">輸入暱稱/職稱：</label>
        <textarea id="editor-text" rows="2" placeholder="請輸入成員的暱稱或職稱... (例如: 班長、もも)"></textarea>

        <label for="image-upload">上傳頭像 (必選)：</label>
        <input type="file" id="image-upload" accept="image/*" required>
        <div id="image-preview" style="margin-top: 10px; max-width: 100%;">
            <img src="" alt="圖片預覽" class="hidden">
        </div>
        
        <button id="saveBtn" onclick="saveContent()"><i class="fas fa-save"></i> 儲存並公開</button>
        <button id="signOutBtn" onclick="signOut()"><i class="fas fa-sign-out-alt"></i> 登出</button>
        
        <p id="save-message" style="color: #4caf50; margin-top: 10px; font-weight: bold;"></p>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-storage-compat.js"></script>

<script>
    // ** 1. 您的 Firebase 配置 **
    const firebaseConfig = {
        // 請確保這裡的配置是您自己的！
        apiKey: "AIzaSyACnoimIASfb1rb59SbgLDkUmyYR6ODbUU",
        authDomain: "llwb-ed686.firebaseapp.com",
        projectId: "llwb-ed686",
        storageBucket: "llwb-ed686.firebasestorage.app", 
        messagingSenderId: "940345852074",
        appId: "1:940345852074:web:7a30cca5a6d997a92350d3",
        measurementId: "G-KWL4ZE3D18"
    };

    // 初始化 Firebase 應用程式和服務
    const app = firebase.initializeApp(firebaseConfig);
    const auth = app.auth();
    const db = app.firestore();
    const storage = app.storage(); 

    // 定義 Firestore 集合路徑
    const PUBLIC_CONTENT_COLLECTION_REF = db.collection("content"); 
    
    // HTML 元素快取
    const publicDisplay = document.getElementById('public-display');
    const loginSection = document.getElementById('login-section');
    const editSection = document.getElementById('edit-section');
    const editorTextarea = document.getElementById('editor-text');
    const loginMessage = document.getElementById('login-message');
    const saveMessage = document.getElementById('save-message');
    const userEmailSpan = document.getElementById('user-email');
    const imageUploadInput = document.getElementById('image-upload');
    const imagePreview = document.querySelector('#image-preview img');

    // 圖片預覽功能
    imageUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
        }
    });

    // ** 2. 登入/登出功能 **
    async function signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        loginMessage.textContent = '';
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            loginMessage.textContent = `登入失敗: ${error.message}`;
        }
    }

    function signOut() {
        auth.signOut();
    }

    // ** 3. 監聽登入狀態與 UI 切換 **
    auth.onAuthStateChanged(user => {
        if (user) {
            loginSection.classList.add('hidden');
            editSection.classList.remove('hidden');
            userEmailSpan.textContent = user.email;
            editorTextarea.value = '';
            imageUploadInput.value = '';
            imagePreview.classList.add('hidden');
        } else {
            loginSection.classList.remove('hidden');
            editSection.classList.add('hidden');
            userEmailSpan.textContent = ''; 
            loginMessage.textContent = '';
        }
    });

    // ** 4. 讀取公開內容 (即時監聽：網格渲染) **
    PUBLIC_CONTENT_COLLECTION_REF
        .orderBy("timestamp", "asc") // 🚨 修改：升序排序 (1, 2, 3...)
        .limit(20) 
        .onSnapshot((snapshot) => {
            const isLoggedIn = auth.currentUser !== null; // 檢查登入狀態
            let html = '<ul style="list-style: none; padding: 0;">';
            
            if (snapshot.empty) {
                publicDisplay.innerHTML = '<p style="text-align: center;">目前沒有任何公開訊息。</p>';
                return;
            }

            snapshot.docs.forEach((doc, index) => { 
                const data = doc.data();
                const docId = doc.id; // 取得文件 ID
                const nickname = data.text.trim() || '未命名'; 
                
                const imageHtml = data.imageUrl ? 
                    `<img src="${data.imageUrl}" alt="${nickname}">` : 
                    `<div style="width: 100px; height: 100px; border-radius: 50%; background-color: #aaa; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em; border: 3px solid #1a237e;"><i class="fas fa-user"></i></div>`;
                
                // 渲染成成員卡片的結構
                html += `
                    <li>
                        <p class="member-id">成員 ${index + 1}</p> ${imageHtml}
                        <p class="member-name">${nickname}</p>
                        ${isLoggedIn ? 
                            // 傳遞 document ID 和 image URL 給 deleteContent 函數
                            `<button class="delete-btn" onclick="deleteContent('${docId}', '${data.imageUrl || ''}')">
                                <i class="fas fa-trash-alt"></i> 刪除
                            </button>` : ''}
                    </li>
                `;
            });
            html += '</ul>';
            publicDisplay.innerHTML = html;
        }, (error) => {
            console.error("讀取 Firestore 集合錯誤: ", error);
            publicDisplay.textContent = '資料讀取錯誤。';
        });


    // ** 5. 儲存/編輯內容 (新增文件到集合 - 處理圖片上傳) **
    async function saveContent() {
        if (!auth.currentUser) {
            alert('您必須登入才能儲存！');
            return;
        }

        const newContent = editorTextarea.value.trim();
        const imageFile = imageUploadInput.files[0];
        
        if (newContent.length === 0) {
            alert('暱稱/職稱欄位不可為空！');
            return;
        }
        if (!imageFile) {
             alert('請上傳頭像圖片！');
            return;
        }
        
        saveMessage.textContent = '儲存中...';
        let imageUrl = null;

        try {
            // 步驟 A: 上傳圖片到 Cloud Storage
            if (imageFile) {
                const storageRef = storage.ref(`images/${Date.now()}_${imageFile.name}`);
                const snapshot = await storageRef.put(imageFile);
                imageUrl = await snapshot.ref.getDownloadURL(); 
                saveMessage.textContent = '圖片上傳成功，正在寫入資料庫...';
            }

            // 步驟 B: 將文字和圖片 URL 寫入 Firestore
            await PUBLIC_CONTENT_COLLECTION_REF.add({
                text: newContent, 
                imageUrl: imageUrl, 
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                author: auth.currentUser.email
            });
            
            editorTextarea.value = '';
            imageUploadInput.value = '';
            imagePreview.classList.add('hidden');
            saveMessage.textContent = '成員新增成功！公開列表已更新。';
            setTimeout(() => saveMessage.textContent = '', 3000); 

        } catch (error) {
            console.error("寫入或上傳錯誤: ", error);
            saveMessage.textContent = `儲存失敗: ${error.message}`;
        }
    }

    // ** 6. 刪除功能 (同時刪除 Storage 圖片和 Firestore 文件) **
    async function deleteContent(docId, imageUrl) {
        if (!auth.currentUser) {
            alert('您沒有權限執行此操作。');
            return;
        }

        if (!confirm('您確定要永久刪除這筆資料嗎？圖片也會一併刪除！')) {
            return;
        }
        
        // 暫時使用 saveMessage 顯示狀態
        const originalSaveMessage = saveMessage.textContent;
        saveMessage.textContent = '刪除中...';

        try {
            // 步驟 A: 如果有圖片 URL，先刪除 Storage 中的圖片
            if (imageUrl) {
                // 從完整的 URL 建立 Storage 引用
                const imageRef = storage.refFromURL(imageUrl);
                await imageRef.delete();
            }

            // 步驟 B: 刪除 Firestore 文件
            await PUBLIC_CONTENT_COLLECTION_REF.doc(docId).delete();
            
            saveMessage.textContent = '資料刪除成功！列表已更新。';
            setTimeout(() => saveMessage.textContent = '', 3000);
        } catch (error) {
            console.error("刪除操作錯誤: ", error);
            saveMessage.textContent = `刪除失敗: ${error.message}. 請確認您的權限。`;
        }
    }
</script>

</body>
</html>
