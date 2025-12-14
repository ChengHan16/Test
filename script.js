// =========================================================
// 1. 全域變數和初始化設定
// =========================================================

let members = [];
const container = document.getElementById('membersContainer');
let nextId = 1;

// 預設的初始成員資料 (新增 imageURL 欄位)
const defaultMembers = [
    
];


// =========================================================
// 2. 資料持久化 (Local Storage) 函式 (無變動)
// =========================================================

function saveMembers() {
    try {
        localStorage.setItem('teamMembers', JSON.stringify(members));
        console.log('成員資料已儲存到 Local Storage。');
    } catch (e) {
        console.error('儲存資料到 Local Storage 失敗:', e);
    }
}

function loadMembers() {
    const storedMembers = localStorage.getItem('teamMembers');
    
    if (storedMembers) {
        try {
            members = JSON.parse(storedMembers);
            
            if (members.length > 0) {
                const maxId = members.reduce((max, member) => Math.max(max, member.id), 0);
                nextId = maxId + 1;
            } else {
                nextId = 1;
            }
        } catch (e) {
            console.error('解析 Local Storage 資料失敗，使用預設資料。', e);
            members = defaultMembers;
            nextId = defaultMembers.length + 1;
        }
    } else {
        members = defaultMembers;
        nextId = defaultMembers.length + 1;
    }
}


// =========================================================
// 3. 檔案處理函式
// =========================================================

/**
 * 讀取 File 物件並將其轉換為 Base64 字串 (可儲存於 Local Storage)。
 * @param {File} file - 檔案物件
 * @returns {Promise<string>} 包含 Base64 字串的 Promise
 */
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null); // 如果沒有檔案，返回 null
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file); // 這是將檔案轉換為 Base64 的關鍵
    });
}


// =========================================================
// 4. 網頁渲染 (DOM 操作與圖片顯示) 函式
// =========================================================

function renderMembers() {
    container.innerHTML = ''; 

    members.forEach((member, index) => {
        const positionLabel = `成員 ${index + 1}`; 
        
        const card = document.createElement('div');
        card.className = 'member-card';
        card.setAttribute('data-id', member.id); 

        // 判斷是顯示圖片還是預設圖示
        const avatarContent = member.imageURL
            ? `<img src="${member.imageURL}" alt="${member.name} 的頭像">`
            : `<span class="member-placeholder">👤</span>`;

        card.innerHTML = `
            <div class="member-avatar-ring">
                ${avatarContent}
            </div>
            <div class="member-position">${positionLabel}</div>
            <div class="member-name">${member.name}</div>
            
            <button class="edit-btn" onclick="document.getElementById('file-input-${member.id}').click()">編輯圖片</button>
            <input type="file" id="file-input-${member.id}" accept="image/*" style="display:none;" 
                   onchange="editImage(${member.id}, this.files[0])">

            <button class="delete-btn" onclick="deleteMember(${member.id})">刪除</button>
        `;

        container.appendChild(card);
    });
}


// =========================================================
// 5. 事件處理 (新增、刪除、編輯圖片) 函式
// =========================================================

/**
 * 處理新增成員的邏輯。
 */
async function addMember() {
    const nameInput = document.getElementById('memberName');
    const imageInput = document.getElementById('memberImageFile'); // 取得檔案輸入元素
    
    const newName = nameInput.value.trim();
    const file = imageInput.files[0]; // 取得檔案

    if (newName === "") {
        alert("名稱不能為空！");
        return;
    }
    
    // 讀取檔案，並等待 Base64 轉換完成
    const imageBase64 = await readFileAsBase64(file);

    const newMember = {
        name: newName,
        id: nextId++,
        imageURL: imageBase64 // 儲存 Base64 字串
    };

    members.push(newMember);

    saveMembers(); 
    renderMembers(); 

    // 清空輸入欄位和檔案選擇
    nameInput.value = '';
    imageInput.value = null; // 清空檔案選擇
}

/**
 * 處理刪除成員的邏輯。
 */
function deleteMember(id) {
    const initialLength = members.length;
    members = members.filter(member => member.id !== id);

    if (members.length < initialLength) {
        saveMembers(); 
        renderMembers();
        console.log(`成員 ID ${id} 已刪除，並重新編號。`);
    }
}

/**
 * 處理編輯現有成員圖片的邏輯。
 * @param {number} id - 要編輯的成員 ID
 * @param {File} file - 新的圖片檔案物件
 */
async function editImage(id, file) {
    if (!file) return;

    // 1. 讀取並轉換新圖片為 Base64
    const newImageBase64 = await readFileAsBase64(file);

    // 2. 找到並更新成員物件
    const memberIndex = members.findIndex(m => m.id === id);
    if (memberIndex !== -1) {
        members[memberIndex].imageURL = newImageBase64;
        
        // 3. 儲存並重新渲染
        saveMembers();
        renderMembers();
        console.log(`成員 ID ${id} 的圖片已更新。`);
    }
}


// =========================================================
// 6. 程式碼啟動點
// =========================================================

function initialize() {
    loadMembers();
    renderMembers();
}

// 啟動程式

initialize();
