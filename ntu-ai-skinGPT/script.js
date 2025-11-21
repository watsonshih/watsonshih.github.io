const dropZone = document.getElementById('dropZone');
const imageInput = document.getElementById('imageInput');

dropZone.addEventListener('click', (e) => {
    if (e.target.classList.contains('upload-link') || e.target === dropZone) {
        imageInput.click();
    }
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropZone.classList.add('dragover');
}

function unhighlight(e) {
    dropZone.classList.remove('dragover');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
        imageInput.files = files;
        handleFileUpload({ target: imageInput });
    }
}

imageInput.addEventListener('change', handleFileUpload);

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    dropZone.style.pointerEvents = 'none';
    dropZone.style.opacity = '0.5';

    setTimeout(() => {
        document.getElementById('uploadedImage').src = URL.createObjectURL(file);

        const predictionHTML = `
            <p>
                疾病大類：皮膚發炎<br>
                診斷結果：痤瘡和玫瑰瑰斑<br>
                英文名稱：Acne and Rosacea Photos<br>
                信心度：99.54%
            </p>
        `;

        document.getElementById('predictionResult').innerHTML = predictionHTML;

        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('chatSection').style.display = 'flex';

        const initialMessage = `(Demo 訊息) 我上傳了一張皮膚照片，經過分析顯示有 99.54% 的可能性是痤瘡和玫瑰斑 (Acne and Rosacea Photos)。`;
        addMessage(initialMessage, 'user');

        setTimeout(() => {
            const defaultResponse = `> (Demo 回覆)
            
根據您提供的診斷結果，皮膚照片顯示有 99.54% 的可能性是痤瘡和玫瑰斑。

這兩種皮膚問題都比較常見，通常可以透過適當的護理方法得到改善。

需要注意的事項包括保持皮膚清潔，避免擠壓痘痘或紅斑，避免暴露在過度陽光下，適時使用適合的護膚產品等。

初步處理方式可以包括：
1. 使用溫和的潔面產品清潔皮膚，避免過度清洗。
2. 選擇合適的護膚品，避免使用刺激性產品。
3. 注意飲食均衡，避免過度攝取油脂食物和辛辣食物。
4. 如果皮膚感到過敏或不適，應及時停止使用該產品。

請記住，以上僅為初步建議。如果症狀持續或加重，建議尋求專業皮膚科醫生的幫助，以獲得更詳細的診斷和治療方案。`;
            addMessage(defaultResponse, 'assistant');
        }, 1500);

        document.getElementById('loading').style.display = 'none';
        dropZone.style.pointerEvents = '';
        dropZone.style.opacity = '';
        imageInput.value = '';
    }, 1500);
}

document.getElementById('messageInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chatForm').dispatchEvent(new Event('submit'));
    }
});

document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    messageInput.value = '';

    const demoResponse = "這是一個 Demo 網站，不具備任何功能。如果有任何皮膚問題，請尋求專業皮膚科醫師協助。";
    setTimeout(() => {
        addMessage(demoResponse, 'assistant');
    }, 500);
});

function addMessage(message, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    if (sender === 'assistant') {
        messageDiv.innerHTML = marked.parse(message);
    } else {
        messageDiv.textContent = message;
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}