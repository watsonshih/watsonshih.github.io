const languages = {
    'zh-TW': {
        newCheckIn: '開始新的簽到',
        startDirectly: '直接開始',
        dropCSV: '拖曳上傳 CSV，預先匯入參與名單',
        csvRequirement: '（CSV 需包含 Name、ID、Note 欄位）',
        downloadTemplate: '下載 CSV 模板',
        infoSettings: '資訊設定',
        eventName: '活動名稱',
        displaySettings: '顯示設定',
        showCount: '顯示報到人數',
        showFullName: '顯示完整姓名',
        showFullID: '顯示完整 ID',
        back: '返回',
        startCheckIn: '開始簽到',
        participantsList: '參與者名單預覽',
        encodingIssue: '出現亂碼？',
        switchEncoding: '切換編碼',
        qrCodeScan: 'QR Code 掃描',
        preparingScan: '準備掃描 QR Code...',
        cameraInitializing: '正在啟動攝影機...',
        cameraReady: '攝影機已啟動，請對準 QR Code',
        scanQrCode: '請掃描 QR Code...',
        eventInfo: '活動資訊',
        lastCheckInInfo: '最後簽到資訊',
        lastCheckOutInfo: '最後簽退資訊',
        name: '姓名',
        id: 'ID',
        note: 'Note',
        checkInTime: '簽到時間',
        checkOutTime: '簽退時間',
        endCheckIn: '結束簽到並進入簽退',
        endCheckOut: '結束簽退並下載紀錄',
        allParticipants: '所有參與者',
        checkedInParticipants: '已簽到參與者',
        noParticipants: '尚無參與者簽到',
        needCheckOut: '待簽退參與者',
        checkedOutParticipants: '已簽退參與者',
        noNeedCheckOut: '無需簽退的參與者',
        noCheckOut: '尚無參與者簽退',
        statusNotCheckedIn: '未簽到',
        statusCheckedIn: '已簽到',
        statusNeedCheckOut: '待簽退',
        statusCheckedOut: '已簽退',
        checkInSuccess: '簽到成功！',
        alreadyCheckedIn: '已經簽到過了',
        checkOutSuccess: '簽退成功！',
        alreadyCheckedOut: '已經簽退過了',
        noCheckInCantCheckOut: '尚未簽到，無法簽退',
        browserNotSupported: '您的瀏覽器不支援攝影機功能',
        videoPlaybackError: '視訊播放失敗',
        cameraError: '無法啟動攝影機：',
        qrScanError: '掃描錯誤，請重試',
        confirmEndCheckIn: '確定要結束簽到並進入簽退階段嗎？',
        confirmEndCheckOut: '確定要結束簽退並下載紀錄嗎？',
        enterEventName: '請輸入活動名稱',
        uploadCsvError: '請上傳 CSV 檔案！',
        fileReadError: '檔案讀取錯誤',
        csvParseError: '解析 CSV 時發生錯誤：',
        csvFieldsError: 'CSV 檔案必須包含 Name 與 ID 欄位！',
        userPageTitle: 'QuickRecord - 快速簽到退 (參與者端)',
        participantInfo: '參與者資訊',
        enterInfoPrompt: '請輸入報名時的資料，以方便核對。',
        nameLabel: '姓名',
        idLabel: 'ID',
        requiredField: '*',
        namePlaceholder: '請輸入您的姓名',
        idPlaceholder: '請按主辦單位指示輸入您的 ID',
        nameErrorRequired: '請輸入您的姓名',
        idErrorRequired: '請輸入您的 ID',
        generateQR: '生成 QR Code',
        yourQRCode: '您的簽到退 QR Code',
        showQRInstruction: '請出示 QR Code 給工作人員掃描',
        reEnterInfo: '重新輸入資訊',
        qrError: '發生錯誤，請重試',
        qrLibraryError: 'QR Code 掃描程式庫載入失敗，請檢查網路連線並重新整理頁面',
        or: '或',
        copyRight: '© Watson',
        pageDescription: '透過掃描 QR Code，讓您的活動簽到簽退更快速！',
        pageKeywords: '活動簽到, QR Code, 簽到系統, 簽退系統, Watson',
        mainPageTitle: 'QuickRecord - 快速簽到退',
        switchToEn: 'EN',
        switchToZh: '中',
        fieldRequired: '此欄位必填',
        nameRequired: '請輸入姓名',
        idRequired: '請輸入 ID'
    },
    'en': {
        newCheckIn: 'Start New Check-in',
        startDirectly: 'Start Directly',
        dropCSV: 'Upload CSV file to import participant list',
        csvRequirement: '(CSV file must contain Name, ID, and Note columns)',
        downloadTemplate: 'Download CSV Template',
        infoSettings: 'Information Settings',
        eventName: 'Event Name',
        displaySettings: 'Display Options',
        showCount: 'Show Attendance Count',
        showFullName: 'Show Full Name',
        showFullID: 'Show Full ID',
        back: 'Back',
        startCheckIn: 'Start Check-in',
        participantsList: 'Participant List Preview',
        encodingIssue: 'Encoding Issue?',
        switchEncoding: 'Switch Encoding',
        qrCodeScan: 'QR Code Scan',
        preparingScan: 'Initializing QR Code scanner...',
        cameraInitializing: 'Activating camera...',
        cameraReady: 'Camera is ready, please align QR Code',
        scanQrCode: 'Ready to scan QR Code...',
        eventInfo: 'Event Information',
        lastCheckInInfo: 'Latest Check-in Information',
        lastCheckOutInfo: 'Latest Check-out Information',
        name: 'Name',
        id: 'ID',
        note: 'Note',
        checkInTime: 'Check-in Time',
        checkOutTime: 'Check-out Time',
        endCheckIn: 'End Check-in and Start Check-out',
        endCheckOut: 'End Check-out and Download Records',
        allParticipants: 'All Participants',
        checkedInParticipants: 'Checked-in Participants',
        noParticipants: 'No attendees checked in yet',
        needCheckOut: 'Awaiting Check-out',
        checkedOutParticipants: 'Checked-out Participants',
        noNeedCheckOut: 'No attendees requiring check-out',
        noCheckOut: 'No attendees checked out yet',
        statusNotCheckedIn: 'Not Checked In',
        statusCheckedIn: 'Checked In',
        statusNeedCheckOut: 'Need Check Out',
        statusCheckedOut: 'Checked Out',
        checkInSuccess: 'Check-in Success!',
        alreadyCheckedIn: 'Already Checked In',
        checkOutSuccess: 'Check-out Success!',
        alreadyCheckedOut: 'Already Checked Out',
        noCheckInCantCheckOut: 'Not checked in, cannot check out',
        browserNotSupported: 'Your browser does not support camera access',
        videoPlaybackError: 'Camera stream failed to start',
        cameraError: 'Failed to access camera: ',
        qrScanError: 'Scanning failed, please try again',
        confirmEndCheckIn: 'Are you sure to end check-in and start check-out?',
        confirmEndCheckOut: 'Are you sure to end check-out and download records?',
        enterEventName: 'Please enter event name',
        uploadCsvError: 'Please upload a CSV file!',
        fileReadError: 'File read error',
        csvParseError: 'CSV parsing error: ',
        csvFieldsError: 'CSV must include Name and ID fields!',
        userPageTitle: 'QuickRecord - Check-in/out for Users',
        participantInfo: 'Participant Information',
        enterInfoPrompt: 'Please enter your registration information for verification.',
        nameLabel: 'Name',
        idLabel: 'ID',
        requiredField: '*',
        namePlaceholder: 'Enter your name',
        idPlaceholder: 'Enter your ID as instructed by the organizer',
        nameErrorRequired: 'Please enter your name',
        idErrorRequired: 'Please enter your ID',
        generateQR: 'Generate QR Code',
        yourQRCode: 'Your Check-in/out QR Code',
        showQRInstruction: 'Please show this QR Code to the staff for scanning',
        reEnterInfo: 'Re-enter Information',
        qrError: 'An error occurred, please try again',
        qrLibraryError: 'Failed to load QR Code scanner. Please check your internet connection and refresh the page.',
        or: 'OR',
        copyRight: '© Watson',
        pageDescription: 'Streamline your event check-in/out process with QR Code scanning!',
        pageKeywords: 'event check-in, QR Code scanner, attendance system, check-out system, Watson',
        mainPageTitle: 'QuickRecord - Quick Check-in/out',
        switchToEn: 'EN',
        switchToZh: '中',
        fieldRequired: 'This field is required',
        nameRequired: 'Please enter your name',
        idRequired: 'Please enter your ID'
    }
};
