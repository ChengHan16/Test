// =========================================================
// 1. Firebase 初始化與配置
// =========================================================

// *** 請替換為您自己的 Firebase 配置資訊 ***
const firebaseConfig = {
    apiKey: "AIzaSyACnoimIASfb1rb59SbgLDkUmyYR6ODbUU",
    authDomain: "llwb-ed686.firebaseapp.com",
    projectId: "llwb-ed686",
    storageBucket: "llwb-ed686.firebasestorage.app",
    messagingSenderId: "940345852074",
    appId: "1:940345852074:web:7a30cca5a6d997a92350d3",
    measurementId: "G-KWL4ZE3D18"
};

if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
} else {
    console.error("Firebase SDK 尚未載入。");
}

const auth = firebase.auth();
const db = firebase.firestore();
const membersCollection = db.collection('members'); 
let currentUser = null; 

// =========================================================
// 2. 全域變數和 DOM 元素映射
// =========================================================

let members = [];
const container = document.getElementById('membersContainer');
let nextId = 1;

const loginForm = document.getElementById('loginForm');
const editButton = document.getElementById('editButton');
const logoutButton = document.getElementById('logoutButton');
const managementArea = document.getElementById('managementArea');
const CONTROL_LIST = document.getElementById('controlList');
const authMessage = document.getElementById('authMessage');
const addMemberForm = document.getElementById('addMemberForm');


// =========================================================
// 3. Firebase 認證與 UI 邏輯
// =========================================================

/** 處理登入 */
window.login = function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDisplay = document.getElementById('loginError');
    errorDisplay.textContent = '';
    
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            errorDisplay.textContent = `登入失敗 (${error.code}): ${error.message}`;
        });
}

/** 處理登出 */
window.logout = function() {
    auth.signOut();
}

/** 監聽 Firebase 登入狀態變化，更新 UI */
auth.onAuthStateChanged((user) => {
    currentUser = user;
    
    // 無論登入與否，都要確保資料正在載入 (loadMembers 在頁面啟動時已觸發)
    
    if (user) {
        // 已登入 (管理員)
        authMessage.textContent = `狀態：管理員已登入 (${user.email})`;
        loginForm.style.display = 'none';
        logoutButton.style.display = 'block';
        editButton.textContent = '進入編輯模式';
        addMemberForm.style.display = 'block'; // 顯示新增表單
    } else {
        // 未登入 (訪客)
        authMessage.textContent = '狀態：訪客模式 (未登入)';
        managementArea.style.display = 'none'; // 隱藏管理區
        loginForm.style.display = 'none';
        logoutButton.style.display = 'none';
        editButton.textContent = '編輯 / 登入管理員'; 
        addMemberForm.style.display = 'none'; // 隱藏新增表單
        
        // 確保退出編輯模式後，管理區也關閉
        editButton.textContent = '編輯 / 登入管理員'; 
    }
    
    // 每次狀態改變時，重新渲染卡片，確保編輯按鈕的顯示/隱藏是正確的
    renderMembers();
});

/** 切換編輯模式的 UI 顯示 */
window.toggleEditMode = function() {
    if (!currentUser) {
        // 如果未登入，點擊按鈕就切換登入表單的顯示
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        return;
    }

    const isVisible = managementArea.style.display === 'block';
    managementArea.style.display = isVisible ? 'none' : 'block';
    editButton.textContent = isVisible ? '進入編輯模式' : '儲存狀態後退出';
    
    if (!isVisible) {
        renderControlList();
    }
}


// =========================================================
// 4. 資料持久化與渲染 (Firestore)
// =========================================================

/** 從 Firestore 載入成員資料並設定即時監聽。 */
function loadMembers() {
    // 所有人都可以讀取，所以不需要登入驗證
    membersCollection.orderBy('id').onSnapshot(snapshot => {
        members = snapshot.docs.map(doc => ({
            docId: doc.id,
            id: doc.data().id,
            name: doc.data().name,
            imageURL: doc.data().imageURL || null,
            isVisible: doc.data().isVisible !== false 
        }));
        
        const maxId = members.reduce((max, member) => Math.max(max, member.id), 0);
        nextId = maxId + 1;
        
        renderMembers(); // 資料更新後立即渲染卡片
        
        if (managementArea.style.display === 'block') {
             renderControlList();
        }
    }, error => {
        console.error("Firestore 監聽失敗:", error);
        container.innerHTML = `<p style="color:red;">載入資料失敗。請檢查 Firebase 專案配置和網路連線。</p>`;
    });
}

/** 渲染主頁面成員卡片 (重點修正 adminControls) */
window.renderMembers = function() {
    container.innerHTML = ''; 

    // 過濾出 isVisible: true 的成員
    const visibleMembers = members.filter(member => member.isVisible === true);

    visibleMembers.forEach((member, index) => { 
        const positionLabel = `成員 ${index + 1}`; 
        
        const card = document.createElement('div');
        card.className = 'member-card';
        card.setAttribute('data-id', member.id); 

        const avatarContent = member.imageURL
            ? `<img src="${member.imageURL}" alt="${member.name} 的頭像">`
            : `<span class="member-placeholder">👤</span>`;

        // 關鍵修正：只有登入用戶才能看到刪除和編輯圖片按鈕
        const adminControls = currentUser ? 
            `
            <button class="edit-btn" onclick="document.getElementById('file-input-${member.id}').click()">編輯圖片</button>
            <input type="file" id="file-input-${member.id}" accept="image/*" style="display:none;" 
                   onchange="editImage(${member.id}, this.files[0])">
            <button class="delete-btn" onclick="deleteMember(${member.id})">刪除</button>
            ` : '';

        card.innerHTML = `
            <div class="member-avatar-ring">
                ${avatarContent}
            </div>
            <div class="member-position">${positionLabel}</div>
            <div class="member-name">${member.name}</div>
            ${adminControls}
        `;

        container.appendChild(card);
    });
}


// =========================================================
// 5. 檔案處理函式 (Base64)
// ... (readFileAsBase64 函式保持不變) ...

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// =========================================================
// 6. CRUD 事件處理 (需登入驗證)
// =========================================================

/** 處理新增成員的邏輯 (寫入 Firestore)。 */
window.addMember = async function() {
    if (!currentUser) { alert("操作失敗：請先登入管理員！"); return; } // 寫入前再次驗證
    
    const nameInput = document.getElementById('memberName');
    const imageInput = document.getElementById('memberImageFile'); 
    const newName = nameInput.value.trim();
    const file = imageInput.files[0]; 

    if (newName === "") { alert("名稱不能為空！"); return; }
    
    const imageBase64 = await readFileAsBase64(file);
    const newMemberId = nextId; 

    const newMember = {
        name: newName,
        id: newMemberId,
        imageURL: imageBase64,
        isVisible: true
    };
    
    await membersCollection.doc(newMemberId.toString()).set(newMember);
    
    nameInput.value = '';
    imageInput.value = null; 
}

/** 處理刪除成員的邏輯 (刪除 Firestore 資料)。 */
window.deleteMember = function(id) {
    if (!currentUser) { alert("操作失敗：請先登入管理員！"); return; } // 寫入前再次驗證
    if (confirm("確定要永久刪除此成員嗎?")) {
        membersCollection.doc(id.toString()).delete()
            .then(() => console.log(`成員 ID ${id} 已從 Firestore 刪除`))
            .catch(error => console.error("刪除失敗:", error));
    }
}

/** 處理編輯現有成員圖片的邏輯 (更新 Firestore)。 */
window.editImage = async function(id, file) {
    if (!currentUser) { alert("操作失敗：請先登入管理員！"); return; } // 寫入前再次驗證
    if (!file) return;
    
    const newImageBase64 = await readFileAsBase64(file);

    await membersCollection.doc(id.toString()).update({
        imageURL: newImageBase64
    });
}


// =========================================================
// 7. 編輯模式與顯示控制邏輯
// ... (renderControlList, toggleControlState, saveControlState 函式保持不變) ...

/** 渲染控制清單。 */
function renderControlList() {
    CONTROL_LIST.innerHTML = '';
    
    if (members.length === 0) {
         CONTROL_LIST.innerHTML = '<li>目前沒有任何成員資料。</li>';
         return;
    }

    members.forEach((member, index) => {
        const positionLabel = `成員 ${index + 1}`; 
        
        const listItem = document.createElement('li');
        
        listItem.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <span style="font-weight: bold;">${member.name}</span>
                <span style="font-size: 0.8em; color: #555;">(${positionLabel})</span>
            </div>
            <input type="checkbox" 
                   id="control-${member.id}" 
                   ${member.isVisible ? 'checked' : ''} 
                   onchange="toggleControlState(${member.id}, this.checked)">
        `;

        CONTROL_LIST.appendChild(listItem);
    });
}

/** 在控制介面中切換單一成員的顯示狀態 (暫時存在全域 members 陣列中)。 */
window.toggleControlState = function(id, isChecked) {
    const member = members.find(m => m.id === id);
    if (member) {
        member.isVisible = isChecked;
        editButton.textContent = '儲存狀態後退出 (未儲存)';
    }
}

/** 最終將控制狀態批量儲存到 Firestore。 */
window.saveControlState = async function() {
    if (!currentUser) { alert("操作失敗：請先登入管理員！"); return; }
    
    const batch = db.batch(); 
    
    members.forEach(member => {
        const docRef = membersCollection.doc(member.id.toString());
        batch.update(docRef, { isVisible: member.isVisible });
    });
    
    try {
        await batch.commit();
        alert("卡片顯示狀態已成功儲存！");
        toggleEditMode(); 
    } catch (error) {
         alert(`儲存失敗！請檢查 Firebase 規則。錯誤: ${error.message}`);
         console.error("批次提交失敗:", error);
    }
}


// =========================================================
// 8. 程式碼啟動點
// =========================================================

function initialize() {
    loadMembers(); // 啟動 Firebase 監聽，讓所有訪客都能看到資料
}

initialize();
