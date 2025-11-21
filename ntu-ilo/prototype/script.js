// --- GLOBAL STATE & DATA (SIMULATED DATABASE) ---
let currentUser = null;
let currentRole = null; // 'admin' or 'school_admin'
let userSchool = null; // For school_admin, e.g., '國立臺灣大學'

const DEMO_USERS = {
    admin: { password: '0000', role: 'admin' },
    ntu: { password: '0000', role: 'school_admin', school: '國立臺灣大學' },
    nthu: { password: '0000', role: 'school_admin', school: '國立清華大學' },
};

const NATIONALITIES = ['柬埔寨', '印度', '印尼', '日本', '馬來西亞', '緬甸', '菲律賓', '新加坡', '泰國', '越南'];
// Use a consistent order, newest first
const SEMESTERS = ['114-1', '113-2', '113-1', '112-2', '112-1']; // Keep a list of all possible semesters
const SYSTEM_CURRENT_SEMESTER = '113-2'; // <<--- SYSTEM-WIDE CURRENT SEMESTER

const RECOMMENDED_LOCAL_SCHOOLS = [ // Admin pre-defined list (simulated)
    'Royal University of Phnom Penh',
    'University of Indonesia',
    'Hanoi University of Science and Technology',
    'University of Tokyo',
    'IIT Bombay',
    'University of the Philippines',
    'National University of Singapore',
    'Chulalongkorn University',
    'University of Malaya',
    'Vietnam National University, Hanoi'
];

const SCHOOLS_DATA = {
    "國立臺灣大學": {
        departments: ["資訊工程學系", "電機工程學系"],
        programs: [
            { name: "113-2 半導體國際專班", department: "資訊工程學系", domain: "半導體", system: "碩士班", language: "英語", currentSemester: SYSTEM_CURRENT_SEMESTER, status: "進行中", initialSemester: "113-2" },
            { name: "112-2 智慧製造專班", department: "電機工程學系", domain: "STEM", system: "學士班", language: "華語", currentSemester: SYSTEM_CURRENT_SEMESTER, status: "進行中", initialSemester: "112-2" },
        ]
    },
    "國立清華大學": {
        departments: ["動力機械工程學系", "工業工程與工程管理學系"],
        programs: [
            { name: "112-1 綠色能源專班", department: "動力機械工程學系", domain: "STEM", system: "碩士班", language: "英語", currentSemester: SYSTEM_CURRENT_SEMESTER, status: "進行中", initialSemester: "112-1" },
            { name: "113-1 半導體產業專班", department: "工業工程與工程管理學系", domain: "半導體", system: "博士班", language: "英語", currentSemester: SYSTEM_CURRENT_SEMESTER, status: "進行中", initialSemester: "113-1" },
            { name: "111-1 數據科學專班", department: "工業工程與工程管理學系", domain: "金融", system: "碩士班", language: "華語", currentSemester: "112-1", status: "已結束", initialSemester: "111-2" } // Ended program keeps its final semester
        ]
    }
};

// --- More Diverse Student Data ---
// Student data now needs to reflect the SYSTEM_CURRENT_SEMESTER for their program's current state
let students = [
    // --- NTU 113-2 半導體國際專班 (Current Semester: 113-2, Initial: 113-2) ---
    {
        id: 'S001', engName: 'CHAN SOKHA', nationality: '柬埔寨', schoolName: '國立臺灣大學', programName: '113-2 半導體國際專班',
        passportNo: 'P12345678', dob: '2000-01-15', gender: '女', corporateNonHire: '否', corporateName: 'Example Tech', livingAllowance: 18000,
        localSchoolName: 'Royal University of Phnom Penh', localSchoolRecommended: '是', transcriptFile: 'S001_transcript.pdf',
        recommendationFile: 'S001_recommend.pdf', academicProofFile: 'S001_proof.pdf',
        status: '準備註冊', // Overall status
        submittedBySchool: true,
        adminApproved: true, // << CHANGED from null, assuming recommendation approved
        semesters: {
            "113-2": {
                regStatus: '準備註冊',
                isNewSemesterEntry: true,
                subsidyEditable: true,
                submitted: false,
                approved: null,
                adminFees: { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 },
                airfare: 0,
                tuition: 0,
                subsidyTotal: 0,
                rejectReason: '',
                nonRegReason: '',
                overpaidAmount: 0,
                nonRegSubmitted: false,
                nonRegApproved: null,
                nonRegEditable: true,
                nonRegRejectReason: '',
                signedSubsidyReceiptUploaded: false,
                signedNonRegReceiptUploaded: false,
                notSubsidizedThisYear: false,
                autoFillNote: ''
            }
        }
    },
    {
        id: 'S007', engName: 'MARIA GARCIA', nationality: '菲律賓', schoolName: '國立臺灣大學', programName: '113-2 半導體國際專班',
        passportNo: 'P77788899', dob: '2001-08-22', gender: '女', corporateNonHire: '否', corporateName: 'Innovate Solutions', livingAllowance: 19500,
        localSchoolName: 'University of the Philippines', localSchoolRecommended: '是', transcriptFile: 'S007_transcript.pdf',
        recommendationFile: 'S007_recommend.pdf', academicProofFile: 'S007_proof.pdf',
        status: '準備註冊', // Overall status
        submittedBySchool: true,
        adminApproved: true, // << CHANGED from null, assuming recommendation approved
        semesters: {
            "113-2": {
                regStatus: '準備註冊',
                isNewSemesterEntry: true,
                subsidyEditable: true,
                submitted: false,
                approved: null,
                adminFees: { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 },
                airfare: 0,
                tuition: 0,
                subsidyTotal: 0,
                rejectReason: '',
                nonRegReason: '',
                overpaidAmount: 0,
                nonRegSubmitted: false,
                nonRegApproved: null,
                nonRegEditable: true,
                nonRegRejectReason: '',
                signedSubsidyReceiptUploaded: false,
                signedNonRegReceiptUploaded: false,
                notSubsidizedThisYear: false,
                autoFillNote: ''
            }
        }
    },
    {
        id: 'S008', engName: 'LI WEI', nationality: '新加坡', schoolName: '國立臺灣大學', programName: '113-2 半導體國際專班',
        passportNo: 'S11223344', dob: '2002-02-14', gender: '男', corporateNonHire: '否', corporateName: 'SG Analytics', livingAllowance: 10000,
        localSchoolName: 'National University of Singapore', localSchoolRecommended: '是', transcriptFile: 'S008_transcript.pdf',
        recommendationFile: 'S008_recommend.pdf', academicProofFile: 'S008_proof.pdf',
        status: '準備註冊', // Overall status
        submittedBySchool: true,
        adminApproved: true, // Remains true
        adminRejectReason: '',
        semesters: {
            "113-2": {
                regStatus: '準備註冊',
                isNewSemesterEntry: true,
                subsidyEditable: true,
                submitted: false,
                approved: null,
                adminFees: { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 },
                airfare: 0,
                tuition: 0,
                subsidyTotal: 0,
                rejectReason: '',
                nonRegReason: '',
                overpaidAmount: 0,
                nonRegSubmitted: false,
                nonRegApproved: null,
                nonRegEditable: true,
                nonRegRejectReason: '',
                signedSubsidyReceiptUploaded: false,
                signedNonRegReceiptUploaded: false,
                notSubsidizedThisYear: false,
                autoFillNote: ''
            }
        }
    },
    { // Corporate Non-Hire = YES example, for AIoT in 113-2
        id: 'S009', engName: 'AHMAD BIN ISMAIL', nationality: '馬來西亞', schoolName: '國立臺灣大學', programName: '113-2 半導體國際專班',
        passportNo: 'M55667788', dob: '2000-11-01', gender: '男', corporateNonHire: '是', corporateName: '', livingAllowance: 11000,
        localSchoolName: 'University of Malaya', localSchoolRecommended: '是', transcriptFile: 'S009_transcript.pdf',
        recommendationFile: 'S009_recommend.pdf', academicProofFile: 'S009_proof.pdf', status: '準備註冊',
        submittedBySchool: true, adminApproved: null, // Assume admin approved recommendation
        semesters: {
            "113-2": { regStatus: '準備註冊', isNewSemesterEntry: true, subsidyEditable: false, adminFees: { total: 0 }, airfare: 0, tuition: 50000, subsidyTotal: 50000 },
        }
    },
    // --- NTU 112-2 智慧製造專班 (Current Semester: 113-2, Initial: 112-2) ---
    {
        id: 'S002', engName: 'BUDI SANTOSO', nationality: '印尼', schoolName: '國立臺灣大學', programName: '112-2 智慧製造專班',
        passportNo: 'P23456789', dob: '1999-05-20', gender: '男', corporateNonHire: '否', corporateName: 'ACME Corp', livingAllowance: 10000,
        localSchoolName: 'University of Indonesia', localSchoolRecommended: '是', transcriptFile: 'S002_transcript.pdf',
        recommendationFile: 'S002_recommend.pdf', academicProofFile: 'S002_proof.pdf', status: '已註冊', adminApproved: true,
        semesters: {
            "112-2": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 5000 }, airfare: 8000, tuition: 45000, subsidyTotal: 58000, signedSubsidyReceiptUploaded: true },
            "113-1": { regStatus: '已註冊', isNewSemesterEntry: false, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 0 }, airfare: 0, tuition: 45500, subsidyTotal: 45500, signedSubsidyReceiptUploaded: true },
            "113-2": { regStatus: '準備註冊', isNewSemesterEntry: false, subsidyEditable: true, submitted: false, approved: null, adminFees: { total: 0 }, airfare: 0, tuition: 0, subsidyTotal: 0 } // Needs entry for current system sem
        }
    },
    { // Recommendation was rejected for 113-2 entry
        id: 'S012', engName: 'ANNA IVANOVA', nationality: '印度', schoolName: '國立臺灣大學', programName: '112-2 智慧製造專班',
        passportNo: 'I99887766', dob: '2001-06-30', gender: '女', corporateNonHire: '否', corporateName: 'Future Systems', livingAllowance: 10000,
        localSchoolName: 'Delhi University', localSchoolRecommended: '否', transcriptFile: 'S012_transcript.pdf',
        recommendationFile: 'S012_recommend.pdf', academicProofFile: 'S012_proof.pdf', status: '已退回 (推薦)',
        submittedBySchool: false, adminApproved: false, adminRejectReason: '成績未達標',
        semesters: {
            "113-2": { ...createDefaultSemesterData(true), regStatus: '已退回 (推薦)', subsidyEditable: false }
        }
    },

    // --- NTHU 112-1 綠色能源專班 (Current Semester: 113-2, Initial: 112-1) ---
    {
        id: 'S003', engName: 'NGUYEN VAN AN', nationality: '越南', schoolName: '國立清華大學', programName: '112-1 綠色能源專班',
        passportNo: 'P34567890', dob: '2001-03-10', gender: '男', corporateNonHire: '否', corporateName: 'Vina Energy', livingAllowance: 19000,
        localSchoolName: 'Hanoi University of Science and Technology', localSchoolRecommended: '是', transcriptFile: 'S003_transcript.pdf',
        recommendationFile: 'S003_recommend.pdf', academicProofFile: 'S003_proof.pdf', status: '不註冊', adminApproved: true,
        semesters: {
            "112-1": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 3000 }, airfare: 6000, tuition: 35000, subsidyTotal: 44000 },
            "112-2": { regStatus: '不註冊', isNewSemesterEntry: false, subsidyEditable: false, submitted: true, approved: true, nonRegSubmitted: true, nonRegApproved: true, nonRegReason: '家庭因素無法來台 (112-2)', overpaidAmount: 44000, signedNonRegReceiptUploaded: true },
            "113-1": { regStatus: '不註冊', isNewSemesterEntry: false, subsidyEditable: false, submitted: true, approved: true, nonRegSubmitted: true, nonRegApproved: true, nonRegReason: '家庭因素無法來台 (113-1)', overpaidAmount: 44000, signedNonRegReceiptUploaded: true },
            "113-2": { regStatus: '不註冊', isNewSemesterEntry: false, subsidyEditable: true, submitted: false, approved: null, nonRegSubmitted: false, nonRegApproved: null, nonRegReason: '', overpaidAmount: 0, nonRegEditable: true }
        }
    },
    { // Duplicate student, submitted for review for 113-2
        id: 'S006', engName: 'CHAN SOKHA', nationality: '柬埔寨', schoolName: '國立清華大學', programName: '112-1 綠色能源專班',
        passportNo: 'P98765432', dob: '2000-01-15', gender: '女', corporateNonHire: '否', corporateName: 'Green Power Inc.', livingAllowance: 18500,
        localSchoolName: 'Another University', localSchoolRecommended: '否', transcriptFile: 'S006_transcript.pdf',
        recommendationFile: 'S006_recommend.pdf', academicProofFile: 'S006_proof.pdf', status: '準備註冊',
        submittedBySchool: true, adminApproved: null, adminRejectReason: '',
        semesters: {
            "113-2": createDefaultSemesterData(true) // Recommended for current system semester
        }
    },
    { // Needs non-registration entry (不註冊) for 113-2
        id: 'S010', engName: 'SITI NURHALIZA', nationality: '印尼', schoolName: '國立清華大學', programName: '112-1 綠色能源專班',
        passportNo: 'P66554433', dob: '2002-07-18', gender: '女', corporateNonHire: '否', corporateName: 'Eco Solutions', livingAllowance: 19200,
        localSchoolName: 'Bandung Institute of Technology', localSchoolRecommended: '是', transcriptFile: 'S010_transcript.pdf',
        recommendationFile: 'S010_recommend.pdf', academicProofFile: 'S010_proof.pdf', status: '不註冊', adminApproved: true,
        semesters: {
            "113-1": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 4000 }, airfare: 8000, tuition: 42000, subsidyTotal: 54000 },
            "113-2": {
                regStatus: '不註冊', isNewSemesterEntry: false, subsidyEditable: true, submitted: false, approved: null,
                nonRegSubmitted: false, nonRegApproved: null, nonRegReason: '', overpaidAmount: 0, nonRegEditable: true
            }
        }
    },
    { // Needs non-registration entry (特殊不註冊), submitted by school, pending admin review for 113-2
        id: 'S011', engName: 'KENJI SUZUKI', nationality: '日本', schoolName: '國立清華大學', programName: '112-1 綠色能源專班',
        passportNo: 'J11223344', dob: '1999-09-09', gender: '男', corporateNonHire: '否', corporateName: 'Solar Japan', livingAllowance: 19800,
        localSchoolName: 'Kyoto University', localSchoolRecommended: '是', transcriptFile: 'S011_transcript.pdf',
        recommendationFile: 'S011_recommend.pdf', academicProofFile: 'S011_proof.pdf', status: '特殊不註冊', adminApproved: true,
        semesters: {
            "113-1": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 3800 }, airfare: 8800, tuition: 49000, subsidyTotal: 61600 },
            "113-2": {
                regStatus: '特殊不註冊', isNewSemesterEntry: false, subsidyEditable: false, submitted: false, approved: null,
                nonRegSubmitted: true, nonRegApproved: null, nonRegReason: '學生過世', overpaidAmount: 0, nonRegEditable: false
            }
        }
    },
    {
        id: 'S013', engName: 'DAVID LEE', nationality: '新加坡', schoolName: '國立清華大學', programName: '112-1 綠色能源專班',
        passportNo: 'S98765432', dob: '1997-03-12', gender: '男', corporateNonHire: '否', corporateName: 'Global Foundries', livingAllowance: 10000,
        localSchoolName: 'Nanyang Technological University', localSchoolRecommended: '是', transcriptFile: 'S013_transcript.pdf',
        recommendationFile: 'S013_recommend.pdf', academicProofFile: 'S013_proof.pdf', status: '準備註冊', adminApproved: true,
        semesters: {
            "113-1": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 4200 }, airfare: 6500, tuition: 50000, subsidyTotal: 60700 },
            "113-2": {
                regStatus: '不註冊', isNewSemesterEntry: false, subsidyEditable: false, submitted: false, approved: null,
                nonRegSubmitted: true, nonRegApproved: null, nonRegReason: '適應不良', overpaidAmount: 0, nonRegEditable: false
            }
        }
    },

    // --- NTHU 113-1 半導體產業專班 (Current Semester: 113-2, Initial: 113-1) ---
    {
        id: 'S004', engName: 'ARISA TANAKA', nationality: '日本', schoolName: '國立清華大學', programName: '113-1 半導體產業專班',
        passportNo: 'P45678901', dob: '1998-11-25', gender: '女', corporateNonHire: '否', corporateName: 'ChipWorks', livingAllowance: 10000,
        localSchoolName: 'University of Tokyo', localSchoolRecommended: '是', transcriptFile: 'S004_transcript.pdf',
        recommendationFile: 'S004_recommend.pdf', academicProofFile: 'S004_proof.pdf', status: '當年未獲補助', adminApproved: true,
        notSubsidizedCounter: 1,
        semesters: {
            "113-1": { regStatus: '當年未獲補助', isNewSemesterEntry: true, notSubsidizedThisYear: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 0 }, airfare: 0, tuition: 0, subsidyTotal: 0 },
            "113-2": { regStatus: '當年未獲補助', isNewSemesterEntry: false, notSubsidizedThisYear: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 0 }, airfare: 0, tuition: 0, subsidyTotal: 0 }
        }
    },
    {
        id: 'S015', engName: 'DAVID YANG', nationality: '新加坡', schoolName: '國立清華大學', programName: '113-1 半導體產業專班',
        passportNo: 'S98768832', dob: '1997-05-12', gender: '男', corporateNonHire: '否', corporateName: 'Global Foundries', livingAllowance: 10000,
        localSchoolName: 'Nanyang Technological University', localSchoolRecommended: '是', transcriptFile: 'S015_transcript.pdf',
        recommendationFile: 'S015_recommend.pdf', academicProofFile: 'S015_proof.pdf', status: '已註冊', submittedBySchool: true, adminApproved: true,
        semesters: {
            "113-1": { regStatus: '已註冊', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true, adminFees: { total: 4200 }, airfare: 6500, tuition: 50000, subsidyTotal: 60700 },
            "113-2": {
                regStatus: '已註冊',
                isNewSemesterEntry: false,
                subsidyEditable: false,
                submitted: true,
                approved: null,
                nonRegSubmitted: false,
                adminFees: { total: 0 },
                airfare: 0,
                tuition: 50000,
                subsidyTotal: 50000
            },
        }
    },

    // --- NTHU 111-1 數據科學專班 (Ended after 112-1) ---
    {
        id: 'S005', engName: 'RAJESH KUMAR', nationality: '印度', schoolName: '國立清華大學', programName: '111-1 數據科學專班',
        passportNo: 'P56789012', dob: '2000-07-01', gender: '男', corporateNonHire: '否', corporateName: 'Data Insights', livingAllowance: 17500,
        localSchoolName: 'IIT Bombay', localSchoolRecommended: '是', transcriptFile: 'S005_transcript.pdf',
        recommendationFile: 'S005_recommend.pdf', academicProofFile: 'S005_proof.pdf', status: '已畢業',
        adminApproved: true,
        semesters: {
            "112-2": {
                regStatus: '已畢業', isNewSemesterEntry: true, subsidyEditable: false, submitted: true, approved: true,
                adminFees: { docTranslation: 1200, notarization: 800, healthCheck: 1800, visa: 700, total: 4500 },
                airfare: 7000, tuition: 40000, subsidyTotal: 51500
            }
        }
    },
];


// Simulated open times with start/end dates
let openTimes = {
    recommendStudents: { start: '2025-04-01', end: '2026-09-30' },
    registerSubsidy: { start: '2025-04-10', end: '2026-09-30' }, // Also covers non-registration
    chineseSurvey: { start: '2025-04-15', end: '2026-09-30' }
};

// --- UTILITY FUNCTIONS ---
function $(selector) { return document.querySelector(selector); }
function $all(selector) { return document.querySelectorAll(selector); }

function showModal(title, bodyContent, showConfirm = true, showCancel = true, confirmCallback = null, cancelCallback = null, confirmText = "確認", cancelText = "取消") {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = bodyContent;
    $('#modalConfirmBtn').style.display = showConfirm ? 'inline-block' : 'none';
    $('#modalCancelBtn').style.display = showCancel ? 'inline-block' : 'none';
    $('#modalConfirmBtn').textContent = confirmText;
    $('#modalCancelBtn').textContent = cancelText;

    const oldConfirm = $('#modalConfirmBtn');
    const newConfirm = oldConfirm.cloneNode(true);
    oldConfirm.parentNode.replaceChild(newConfirm, oldConfirm);

    const oldCancel = $('#modalCancelBtn');
    const newCancel = oldCancel.cloneNode(true);
    oldCancel.parentNode.replaceChild(newCancel, oldCancel);

    if (confirmCallback) {
        newConfirm.onclick = () => { confirmCallback(); closeModal(); };
    } else {
        newConfirm.onclick = closeModal;
    }

    if (cancelCallback) {
        newCancel.onclick = () => { cancelCallback(); closeModal(); };
    } else {
        newCancel.onclick = closeModal;
    }
    $('#modal').style.display = 'block';
}


function closeModal() {
    $('#modal').style.display = 'none';
    $('#modalConfirmBtn').textContent = "確認";
    $('#modalCancelBtn').textContent = "取消";
}

function getProgramDetails(schoolName, programName) {
    if (SCHOOLS_DATA[schoolName]) {
        const school = SCHOOLS_DATA[schoolName];
        if (school && school.programs) {
            return school.programs.find(p => p.name === programName);
        }
    }
    console.warn(`Program details not found for: ${schoolName} - ${programName}`);
    return null;
}


function getStudentCurrentSemesterData(studentId, semesterToGet) {
    const student = students.find(s => s.id === studentId);
    if (!student) {
        console.error(`Student not found: ${studentId}`);
        return createDefaultSemesterData();
    }

    let targetSemester = semesterToGet;
    if (!targetSemester) {
        console.warn(`Semester is undefined for student ${studentId}. Using system current semester: ${SYSTEM_CURRENT_SEMESTER}.`);
        targetSemester = SYSTEM_CURRENT_SEMESTER;
    }

    if (student.semesters && student.semesters[targetSemester]) {
        return student.semesters[targetSemester];
    }

    // Initialize if not present
    if (student.semesters && !student.semesters[targetSemester]) {
        console.log(`Initializing semester ${targetSemester} data for student ${studentId}`);
        // Determine if this would be a new entry based on program's initial semester
        const program = getProgramDetails(student.schoolName, student.programName);
        const isNewEntryForProgram = program ? (targetSemester === program.initialSemester) : false;
        student.semesters[targetSemester] = createDefaultSemesterData(isNewEntryForProgram);
        return student.semesters[targetSemester];
    }
    if (!student.semesters) {
        console.warn(`Student ${studentId} missing semesters object. Initializing for ${targetSemester}.`);
        student.semesters = {};
        const program = getProgramDetails(student.schoolName, student.programName);
        const isNewEntryForProgram = program ? (targetSemester === program.initialSemester) : false;
        student.semesters[targetSemester] = createDefaultSemesterData(isNewEntryForProgram);
        return student.semesters[targetSemester];
    }

    console.error(`Failed to get/create semester data for ${studentId}, ${targetSemester}. Returning default.`);
    return createDefaultSemesterData();
}

// Helper to create default semester structure
function createDefaultSemesterData(isNewForProgramInitialSemester = false) {
    return {
        regStatus: '準備註冊',
        isNewSemesterEntry: isNewForProgramInitialSemester, // True ONLY if this semester IS the program's initial semester
        subsidyEditable: true,
        submitted: false,
        approved: null,
        adminFees: { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 },
        airfare: 0,
        tuition: 0,
        subsidyTotal: 0,
        rejectReason: '',
        nonRegReason: '',
        overpaidAmount: 0,
        nonRegSubmitted: false,
        nonRegApproved: null,
        nonRegEditable: true,
        nonRegRejectReason: '',
        signedSubsidyReceiptUploaded: false,
        signedNonRegReceiptUploaded: false,
        notSubsidizedThisYear: false,
        autoFillNote: ''
    };
}

function isWithinOpenTime(key) {
    const setting = openTimes[key];
    if (!setting || !setting.start || !setting.end) {
        console.warn(`Open time setting for "${key}" is invalid.`);
        return false;
    }
    const now = new Date();
    const start = new Date(setting.start);
    const end = new Date(setting.end);
    end.setHours(23, 59, 59, 999);
    start.setHours(0, 0, 0, 0);
    return now >= start && now <= end;
}

function getOpenTimeMessage(key) {
    const setting = openTimes[key];
    if (!setting || !setting.start || !setting.end) {
        return "目前非開放時間 (設定無效)。";
    }
    if (isWithinOpenTime(key)) {
        return `目前為開放時間 (至 ${setting.end})。`;
    } else {
        return `目前非開放時間 (開放期間: ${setting.start} 至 ${setting.end})。`;
    }
}

// --- PAGE RENDERING FUNCTIONS ---
function renderSidebar() {
    const sidebar = $('#sidebar');
    let navLinks = '';
    if (currentRole === 'admin') {
        navLinks = `
            <h3>管理員選單</h3>
            <ul>
                <li><a href="#" data-page="adminDashboard">儀表板</a></li>
                <li><a href="#" data-page="managePrograms">專班與學生管理</a></li>
                <li><a href="#" data-page="reviewRecommendedStudents">審核推薦名冊</a></li>
                <li><a href="#" data-page="reviewSubsidies">審核註冊與補助</a></li>
                <li><a href="#" data-page="reviewNonRegistration">審核不註冊/溢領</a></li>
                <li><a href="#" data-page="exportReceipts">印領清冊匯出</a></li>
                <li><a href="#" data-page="manageOpenTimes">設定開放時間</a></li>
                <li><a href="#" data-page="viewEditLog">查看編輯記錄</a></li>
                <li><a href="#" data-page="manageUserAccounts">使用者帳號管理</a></li>
            </ul>
            <hr>
            <p>Prototype (非實際用途)<br>部分功能可能不正確或無效</p>
            <p>V20250513</p>
        `;
    } else if (currentRole === 'school_admin') {
        navLinks = `
            <h3>學校行政選單</h3>
            <ul>
                <li><a href="#" data-page="schoolDashboard">儀表板 (${userSchool})</a></li>
                <li><a href="#" data-page="viewSchoolPrograms">檢視專班資料</a></li>
                <li><a href="#" data-page="submitRecommendedStudents">提交推薦學生名冊</a></li>
                <li><a href="#" data-page="registerSubsidies">註冊與補助登錄</a></li>
                <li><a href="#" data-page="reportNonRegistration">不註冊情況登錄</a></li>
                <li><a href="#" data-page="chineseSurvey">華語文能力調查</a></li>
            </ul>
            <hr>
            <p>Prototype (非實際用途)<br>部分功能可能不正確或無效</p>
            <p>V20250513</p>
        `;
    }
    sidebar.innerHTML = navLinks;
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadPage(e.target.dataset.page);
            sidebar.querySelectorAll('a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

function loadPage(pageId, params = null) {
    const contentArea = $('#contentArea');
    console.log("Loading page:", pageId, "with params:", params);
    // Simple router
    switch (pageId) {
        case 'adminDashboard':
            contentArea.innerHTML = `<h2>管理員儀表板</h2><p>目前系統運作學期: <strong>${SYSTEM_CURRENT_SEMESTER}</strong></p><p>這裡顯示系統總覽、待辦事項等。</p>`;
            break;
        case 'managePrograms':
            renderManageProgramsPage(contentArea);
            break;
        case 'programDetails':
            if (params && params.schoolName && params.programName) {
                renderProgramDetailsPage(contentArea, params.schoolName, params.programName, true); // isAdmin = true
            } else {
                contentArea.innerHTML = '<h2>錯誤</h2><p>缺少必要的專班資訊。</p>';
            }
            break;
        case 'reviewRecommendedStudents':
            renderReviewRecommendedStudentsPage(contentArea);
            break;
        case 'reviewSubsidies':
            renderReviewSubsidiesPage(contentArea, 'subsidy');
            break;
        case 'reviewNonRegistration':
            renderReviewSubsidiesPage(contentArea, 'nonRegistration'); // Use the same function
            break;
        case 'exportReceipts':
            renderExportReceiptsPage(contentArea);
            break;
        case 'manageOpenTimes':
            renderManageOpenTimesPage(contentArea);
            break;
        case 'viewEditLog':
            contentArea.innerHTML = '<h2>查看編輯記錄</h2><p>此功能將顯示所有系統操作記錄 (原型中未實作)。</p>';
            break;
        case 'manageUserAccounts':
            contentArea.innerHTML = '<h2>使用者帳號管理</h2><p>管理員可在此新增/編輯學校帳號 (原型中未實作)。</p>';
            break;

        // School Admin pages
        case 'schoolDashboard':
            contentArea.innerHTML = `<h2>學校儀表板 - ${userSchool}</h2><p>目前系統運作學期: <strong>${SYSTEM_CURRENT_SEMESTER}</strong></p><p>顯示 ${userSchool} 相關的待辦事項與通知。</p>
             <p>推薦學生名冊提交: ${getOpenTimeMessage('recommendStudents')}</p>
             <p>註冊/補助/不註冊登錄: ${getOpenTimeMessage('registerSubsidy')}</p>
             <p>華語文能力調查: ${getOpenTimeMessage('chineseSurvey')}</p>
            `;
            break;
        case 'viewSchoolPrograms':
            renderViewSchoolProgramsPage(contentArea);
            break;
        case 'schoolProgramDetails':
            if (params && params.schoolName && params.programName) {
                renderProgramDetailsPage(contentArea, params.schoolName, params.programName, false); // isAdmin = false
            } else {
                contentArea.innerHTML = '<h2>錯誤</h2><p>缺少必要的專班資訊。</p>';
            }
            break;
        case 'submitRecommendedStudents':
            if (!isWithinOpenTime('recommendStudents') && currentRole === 'school_admin') {
                contentArea.innerHTML = `<h2>提交推薦學生名冊</h2><p class="error-message">${getOpenTimeMessage('recommendStudents')}</p>`;
                return;
            }
            renderSubmitRecommendedStudentsPage(contentArea);
            break;
        case 'registerSubsidies':
            if (!isWithinOpenTime('registerSubsidy') && currentRole === 'school_admin') {
                contentArea.innerHTML = `<h2>註冊與補助登錄</h2><p class="error-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
                return;
            }
            renderRegisterSubsidiesPage(contentArea);
            break;
        case 'reportNonRegistration':
            if (!isWithinOpenTime('registerSubsidy') && currentRole === 'school_admin') { // Uses same open time
                contentArea.innerHTML = `<h2>不註冊情況登錄</h2><p class="error-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
                return;
            }
            renderReportNonRegistrationPage(contentArea);
            break;
        case 'chineseSurvey':
            if (!isWithinOpenTime('chineseSurvey') && currentRole === 'school_admin') {
                contentArea.innerHTML = `<h2>華語文能力調查</h2><p class="error-message">${getOpenTimeMessage('chineseSurvey')}</p>`;
                return;
            }
            renderChineseSurveyPage(contentArea);
            break;
        default:
            contentArea.innerHTML = '<h2>頁面未找到</h2><p>您請求的頁面不存在。</p>';
    }
}

// --- RENDER SPECIFIC PAGES ---

// ADMIN: Render list of programs
function renderManageProgramsPage(container) {
    let html = `<h2>專班與學生管理 (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    html += renderProgramListFilters(true);
    html += `<table id="programsTable"><thead><tr>
                <th><input type="checkbox" id="selectAllPrograms"></th>
                <th>學校名稱</th><th>專班名稱</th><th>專班目前學期</th><th>學制</th><th>領域</th><th>狀態</th><th>操作</th>
             </tr></thead><tbody>`;

    const filteredPrograms = filterPrograms();

    filteredPrograms.forEach(p => {
        html += `<tr>
                    <td><input type="checkbox" class="program-checkbox" data-school="${p.schoolName}" data-program="${p.name}"></td>
                    <td>${p.schoolName}</td><td>${p.name}</td><td>${p.currentSemester}</td>
                    <td>${p.system}</td><td>${p.domain}</td>
                    <td class="${p.status === '已結束' ? 'status-rejected' : 'status-approved'}">${p.status || '進行中'}</td>
                    <td>
                        <button onclick="loadPage('programDetails', { schoolName: '${p.schoolName}', programName: '${p.name}' })">檢視學生列表</button>
                    </td>
                 </tr>`;
    });
    html += `</tbody></table>`;
    html += `<div class="page-actions">
                 <button class="secondary" onclick="">下載選定專班大表</button>
                 <button onclick="batchProgramAction('newSemester')">選定專班進入新學期 (系統將推進至下一學期)</button>
                 <button class="danger" onclick="batchProgramAction('endProgram')">選定專班結束</button>
             </div>`;
    container.innerHTML = html;
    addProgramFilterEventListeners(renderManageProgramsPage, container, true);
    $('#selectAllPrograms').addEventListener('change', (e) => {
        $all('.program-checkbox').forEach(cb => cb.checked = e.target.checked);
    });
}

// SCHOOL ADMIN: Render list of programs for their school
function renderViewSchoolProgramsPage(container) {
    let html = `<h2>檢視專班資料 (${userSchool}) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    html += renderProgramListFilters(false);
    html += `<table id="programsTable"><thead><tr>
                <th>專班名稱</th><th>專班目前學期</th><th>學制</th><th>領域</th><th>狀態</th><th>操作</th>
             </tr></thead><tbody>`;

    const schoolPrograms = filterPrograms().filter(p => p.schoolName === userSchool);

    schoolPrograms.forEach(p => {
        html += `<tr>
                    <td>${p.name}</td><td>${p.currentSemester}</td>
                    <td>${p.system}</td><td>${p.domain}</td>
                    <td class="${p.status === '已結束' ? 'status-rejected' : 'status-approved'}">${p.status || '進行中'}</td>
                    <td>
                         <button onclick="loadPage('schoolProgramDetails', { schoolName: '${userSchool}', programName: '${p.name}' })">檢視學生列表</button>
                    </td>
                 </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
    addProgramFilterEventListeners(renderViewSchoolProgramsPage, container, false);
}


function renderProgramListFilters(isAdmin) {
    let schoolOptions = '';
    if (isAdmin) {
        schoolOptions = `<option value="">所有學校</option>` + Object.keys(SCHOOLS_DATA).map(school => `<option value="${school}">${school}</option>`).join('');
    }

    // Filter for program's current semester, not system semester
    const programSemesterOptions = [...new Set(Object.values(SCHOOLS_DATA).flatMap(s => s.programs.map(p => p.currentSemester)))].sort().reverse().map(sem => `<option value="${sem}">${sem}</option>`).join('');


    const programStatusOptions = ['進行中', '已結束'].map(s => `<option value="${s}">${s}</option>`).join('');

    return `
        <div class="filter-section program-filters">
            ${isAdmin ? `<label>學校:</label><select id="filterSchool">${schoolOptions}</select>` : ''}
            <label>專班學期:</label><select id="filterProgramCurrentSemester"><option value="">所有學期</option>${programSemesterOptions}</select>
            <label>狀態:</label><select id="filterProgramStatus"><option value="">所有狀態</option>${programStatusOptions}</select>
            <label>搜尋:</label><input type="search" id="filterSearch" placeholder="專班名、領域、學校...">
            <button id="applyProgramFiltersBtn">篩選/搜尋</button>
        </div>
    `;
}

function addProgramFilterEventListeners(renderFunction, container, isAdmin) {
    const applyFilters = () => renderFunction(container);

    $('#applyProgramFiltersBtn').addEventListener('click', applyFilters);
    const searchInput = $('#filterSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}


function filterPrograms() {
    let allPrograms = [];
    Object.keys(SCHOOLS_DATA).forEach(schoolName => {
        if (SCHOOLS_DATA[schoolName].programs) {
            SCHOOLS_DATA[schoolName].programs.forEach(p => {
                allPrograms.push({ ...p, schoolName: schoolName });
            });
        }
    });

    let filtered = [...allPrograms];
    const schoolFilter = $('#filterSchool') ? $('#filterSchool').value : (currentRole === 'school_admin' ? userSchool : '');
    const programCurrentSemesterFilter = $('#filterProgramCurrentSemester') ? $('#filterProgramCurrentSemester').value : '';
    const statusFilter = $('#filterProgramStatus') ? $('#filterProgramStatus').value : '';
    const searchTerm = $('#filterSearch') ? $('#filterSearch').value.toLowerCase() : '';

    if (schoolFilter) filtered = filtered.filter(p => p.schoolName === schoolFilter);
    if (programCurrentSemesterFilter) filtered = filtered.filter(p => p.currentSemester === programCurrentSemesterFilter);
    if (statusFilter) filtered = filtered.filter(p => (p.status || '進行中') === statusFilter);

    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.schoolName.toLowerCase().includes(searchTerm) ||
            p.department.toLowerCase().includes(searchTerm) ||
            p.domain.toLowerCase().includes(searchTerm) ||
            p.system.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

// Renders the details page for a SPECIFIC program (showing student list)
function renderProgramDetailsPage(container, schoolName, programName, isAdmin) {
    const program = getProgramDetails(schoolName, programName);
    if (!program) {
        container.innerHTML = `<h2>錯誤</h2><p>找不到專班 ${schoolName} - ${programName} 的資料。</p>`;
        return;
    }
    const displaySemester = program.currentSemester; // Use the program's own current semester for student list

    let html = `<h2>專班詳細資料: ${programName} (${schoolName})</h2>
                <div class="program-info-box">
                 <p><strong>系所:</strong> ${program.department}</p>
                 <p><strong>領域:</strong> ${program.domain}</p>
                 <p><strong>學制:</strong> ${program.system}</p>
                 <p><strong>授課語言:</strong> ${program.language}</p>
                 <p><strong>專班目前學期:</strong> ${program.currentSemester}</p>
                 <p><strong>狀態:</strong> <span class="${program.status === '已結束' ? 'status-rejected' : 'status-approved'}">${program.status || '進行中'}</span></p>
                </div>

                <h3>學生列表 (學期: ${displaySemester})</h3>`;

    const programStudents = students.filter(s => s.schoolName === schoolName && s.programName === programName);

    if (programStudents.length === 0) {
        html += "<p>此專班目前尚無學生資料。</p>";
    } else {
        html += `<table id="programStudentsTable"><thead><tr>
                    <th>英文姓名</th><th>國籍</th><th>護照號碼</th><th>學生狀態 (於 ${displaySemester})</th><th>操作</th>
                 </tr></thead><tbody>`;

        programStudents.forEach(s => {
            const studentSemData = getStudentCurrentSemesterData(s.id, displaySemester);
            const displayStatus = studentSemData?.regStatus || s.status || '狀態不明';

            let statusClass = '';
            if (['不註冊', '特殊不註冊', '當年未獲補助', '已畢業', '已退回 (推薦)'].includes(displayStatus)) {
                statusClass = 'status-rejected';
            } else if (displayStatus === '已註冊') {
                statusClass = 'status-approved';
            } else if (displayStatus === '準備註冊') {
                statusClass = 'status-pending';
            }


            html += `<tr>
                        <td>${s.engName}</td><td>${s.nationality}</td><td>${s.passportNo}</td>
                        <td class="${statusClass}">${displayStatus} ${s.corporateNonHire === '是' ? '<span class="corp-non-hire-tag">[企業不錄取]</span>' : ''}</td>
                        <td>
                            <button onclick="viewStudentDetails('${s.id}', ${!isAdmin})">檢視${isAdmin ? '/編輯' : ''}</button>
                            ${isAdmin && !['當年未獲補助', '已畢業', '不註冊', '特殊不註冊', '已退回 (推薦)'].includes(displayStatus) && s.corporateNonHire !== '是' && displayStatus !== '準備註冊' ? `<button class="danger" onclick="markNotSubsidized('${s.id}', '${schoolName}', '${programName}')">標記當年未獲補助</button>` : ''}
                            ${isAdmin && displayStatus === '當年未獲補助' ? `<button class="secondary" onclick="reEvaluateSubsidy('${s.id}', '${schoolName}', '${programName}')">解除當年未獲補助</button>` : ''}
                        </td>
                     </tr>`;
        });
        html += `</tbody></table>`;
    }
    html += `<div class="page-actions">
                <button onclick="goBackToProgramList()">返回專班列表</button>
             </div>`;


    container.innerHTML = html;
}

function goBackToProgramList() {
    if (currentRole === 'admin') {
        loadPage('managePrograms');
    } else {
        loadPage('viewSchoolPrograms');
    }
}

// --- Student Detail View/Edit (Called from Program Details Page) ---
function viewStudentDetails(studentId, readOnly = false) {
    const student = students.find(s => s.id === studentId);
    if (!student) { showModal("錯誤", "找不到學生資料。"); return; }

    const program = getProgramDetails(student.schoolName, student.programName);
    if (!program) {
        showModal("錯誤", `找不到學生 ${student.engName} 所屬專班 ${student.programName} 的資料。`);
        return;
    }
    const studentDisplaySemester = program.currentSemester; // Use program's current semester for context
    const studentSemesterData = getStudentCurrentSemesterData(studentId, studentDisplaySemester);

    const effectiveReadOnly = (currentRole === 'school_admin') || readOnly;


    let html = `<h3>${effectiveReadOnly ? "檢視" : "編輯"}學生詳細資料: ${student.engName}</h3>`;
    html += `<form id="studentDetailForm">
        <input type="hidden" name="studentId" value="${student.id}">
        <div class="form-grid">
            <div class="form-group"><label class="required-field-label">英文姓名:</label><input type="text" name="engName" value="${student.engName || ''}" ${effectiveReadOnly ? 'readonly' : ''} required></div>
            <div class="form-group"><label class="required-field-label">國籍:</label><select name="nationality" ${effectiveReadOnly ? 'disabled' : ''} required>${NATIONALITIES.map(n => `<option value="${n}" ${student.nationality === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
            <div class="form-group"><label>台灣開班學校名稱:</label><input type="text" value="${student.schoolName || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>台灣開班學校系所:</label><input type="text" value="${program?.department || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>台灣專班名稱:</label><input type="text" value="${student.programName || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>台灣專班領域:</label><input type="text" value="${program?.domain || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>台灣專班學制:</label><input type="text" value="${program?.system || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>台灣專班授課語言:</label><input type="text" value="${program?.language || ''}" readonly class="readonly-field"></div>
            <div class="form-group"><label>學生狀態 (於 ${studentDisplaySemester}):</label><input type="text" value="${studentSemesterData?.regStatus || student.status || '待註冊'}" readonly class="readonly-field"></div>

            <div class="form-group"><label>身分證字號:</label><input type="text" name="idCardNo" value="${student.idCardNo || ''}" ${effectiveReadOnly ? 'readonly' : ''}></div>
            <div class="form-group"><label>護照號碼:</label><input type="text" name="passportNo" value="${student.passportNo || ''}" ${effectiveReadOnly ? 'readonly' : ''}></div>
            <div class="form-group"><label class="required-field-label">出生年月日:</label><input type="date" name="dob" value="${student.dob || ''}" ${effectiveReadOnly ? 'readonly' : ''} required></div>
            <div class="form-group"><label class="required-field-label">生理性別:</label>
                <input type="radio" id="genderMale_${student.id}" name="gender" value="男" ${student.gender === '男' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} required> <label for="genderMale_${student.id}">男</label>
                <input type="radio" id="genderFemale_${student.id}" name="gender" value="女" ${student.gender === '女' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} required> <label for="genderFemale_${student.id}">女</label>
            </div>
            <div class="form-group"><label class="required-field-label">企業錄取:</label>
                <input type="radio" id="corpNo_${student.id}" name="corporateNonHire" value="否" ${student.corporateNonHire === '否' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} onchange="toggleCorporateName(this.value, '${student.id}')" required> <label for="corpNo_${student.id}">是</label>
                <input type="radio" id="corpYes_${student.id}" name="corporateNonHire" value="是" ${student.corporateNonHire === '是' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} onchange="toggleCorporateName(this.value, '${student.id}')" required> <label for="corpYes_${student.id}">否</label>
                <!-- Note will be added by JS -->
            </div>
            <div class="form-group" id="corporateNameGroup_${student.id}" style="${student.corporateNonHire === '否' ? '' : 'display:none;'}">
                <label class="required-field-label">合作企業名稱:</label><input type="text" name="corporateName" value="${student.corporateName || ''}" ${effectiveReadOnly ? 'readonly' : ''}>
            </div>
             <div class="form-group"><label class="required-field-label">生活津貼 (至少10k):</label><input type="number" name="livingAllowance" value="${student.livingAllowance || 0}" min="10000" ${effectiveReadOnly ? 'readonly' : ''} required></div>
            <div class="form-group"><label class="required-field-label">當地學校:</label>
                <input type="text" name="localSchoolName" value="${student.localSchoolName || ''}" ${effectiveReadOnly ? 'readonly' : ''} required list="localSchoolList">
                <datalist id="localSchoolList">
                    ${RECOMMENDED_LOCAL_SCHOOLS.map(school => `<option value="${school}"></option>`).join('')}
                </datalist>
            </div>
             <div class="form-group"><label class="required-field-label">當地學校推薦清單內:</label>
                <input type="radio" id="localRecYes_${student.id}" name="localSchoolRecommended" value="是" ${student.localSchoolRecommended === '是' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} required> <label for="localRecYes_${student.id}">是</label>
                <input type="radio" id="localRecNo_${student.id}" name="localSchoolRecommended" value="否" ${student.localSchoolRecommended !== '是' ? 'checked' : ''} ${effectiveReadOnly ? 'disabled' : ''} required> <label for="localRecNo_${student.id}">否</label>
            </div>
            <div class="form-group"><label>當地排名:</label><input type="number" name="localSchoolRank" value="${student.localSchoolRank || ''}" ${effectiveReadOnly ? 'readonly' : ''} min="0"></div>
            <div class="form-group"><label>國際排名:</label><input type="number" name="intlSchoolRank" value="${student.intlSchoolRank || ''}" ${effectiveReadOnly ? 'readonly' : ''} min="0"></div>
             <div class="form-group"><label>華語文能力:</label><input type="text" name="chineseLevel" value="${student.chineseLevel || ''}" ${effectiveReadOnly ? 'readonly' : ''}></div>

        </div>

        <hr><h4>附件管理</h4>
         <div class="form-grid">
            <div class="form-group"><label class="required-field-label">成績單 (PDF < 5MB):</label><input type="file" name="transcriptFile" accept=".pdf" ${effectiveReadOnly ? 'disabled' : ''}> ${student.transcriptFile ? `<i>(現有: ${student.transcriptFile})</i> <button type='button' class='link-button' onclick='downloadAttachment("${student.id}", "transcriptFile")'>下載</button>` : ''}</div>
            <div class="form-group"><label class="required-field-label">推薦信 (PDF < 5MB):</label><input type="file" name="recommendationFile" accept=".pdf" ${effectiveReadOnly ? 'disabled' : ''}> ${student.recommendationFile ? `<i>(現有: ${student.recommendationFile})</i> <button type='button' class='link-button' onclick='downloadAttachment("${student.id}", "recommendationFile")'>下載</button>` : ''}</div>
            <div class="form-group"><label class="required-field-label">學業證明 (PDF < 5MB):</label><input type="file" name="academicProofFile" accept=".pdf" ${effectiveReadOnly ? 'disabled' : ''}> ${student.academicProofFile ? `<i>(現有: ${student.academicProofFile})</i> <button type='button' class='link-button' onclick='downloadAttachment("${student.id}", "academicProofFile")'>下載</button>` : ''}</div>
             <div class="form-group" id="otherDocsGroup_${student.id}" style="${program?.system === '本國生混班之學士班' ? '' : 'display:none;'}">
                <label class="${program?.system === '本國生混班之學士班' ? 'required-field-label' : ''}">其他檢核 (PDF < 5MB):</label><input type="file" name="otherDocsFile" accept=".pdf" ${effectiveReadOnly ? 'disabled' : ''}> ${student.otherDocsFile ? `<i>(現有: ${student.otherDocsFile})</i> <button type='button' class='link-button' onclick='downloadAttachment("${student.id}", "otherDocsFile")'>下載</button>` : ''}
            </div>
        </div>
        ${currentRole === 'admin' ? `<hr><h4>管理員專區</h4><div class="form-group"><label>管理員附註:</label><textarea name="adminNotes" ${effectiveReadOnly ? 'readonly' : ''}>${student.adminNotes || ''}</textarea></div>` : ''}
        ${currentRole === 'school_admin' && readOnly && student.adminNotes ? `<hr><h4>管理員附註</h4><p>${student.adminNotes}</p>` : ''}

    </form>`;

    let footerButtons = `<button id="modalCloseOnlyBtn" onclick="closeModal()">關閉</button>`;
    if (!effectiveReadOnly) {
        footerButtons = `<button onclick="saveStudentDetails('${student.schoolName}', '${student.programName}')">儲存變更</button><button onclick="closeModal()">取消</button>`;
    }

    showModal(effectiveReadOnly ? "檢視學生資料" : "編輯學生資料", html, !effectiveReadOnly, true,
        () => { if (!effectiveReadOnly) saveStudentDetails(student.schoolName, student.programName); },
        null,
        effectiveReadOnly ? "" : "儲存變更",
        "關閉"
    );

    if (effectiveReadOnly) {
        $('#modalConfirmBtn').style.display = 'none';
        $('#modalCancelBtn').textContent = '關閉';
        $('#modalCancelBtn').onclick = closeModal;
    } else {
        $('#modalConfirmBtn').style.display = 'inline-block';
        $('#modalConfirmBtn').textContent = '儲存變更';
        $('#modalCancelBtn').textContent = '取消';
        $('#modalCancelBtn').onclick = closeModal;
    }

    if (!effectiveReadOnly) {
        toggleCorporateName(student.corporateNonHire || '否', student.id);
        const otherDocsGroup = $(`#otherDocsGroup_${student.id} input[name="otherDocsFile"]`);
        if (otherDocsGroup && program?.system === '本國生混班之學士班') {
            otherDocsGroup.required = true;
        } else if (otherDocsGroup) {
            otherDocsGroup.required = false;
        }
    } else { // If readonly, still ensure the note is shown if applicable
        toggleCorporateName(student.corporateNonHire || '否', student.id);
    }
}

// Mock download function
window.downloadAttachment = function (studentId, fileType) {
    const student = students.find(s => s.id === studentId);
    if (student && student[fileType]) {
        showModal("模擬下載", `正在下載學生 ${student.engName} 的 ${fileType}: ${student[fileType]}...`, true, false);
    } else {
        showModal("錯誤", "找不到指定的附件檔案。", true, false);
    }
};


// Updated toggleCorporateName for inverted logic
window.toggleCorporateName = function (value, studentIdOrPrefix) {
    const group = $(`#corporateNameGroup_${studentIdOrPrefix}`);
    const input = group ? group.querySelector('input[name="corporateName"]') : null;

    if (group) {
        group.style.display = value === '否' ? 'block' : 'none';
    }
    if (input) {
        input.required = (value === '否');
        if (value === '是') {
            input.value = '';
        }
    }
    // Show/hide note about registration impact
    const corpYesRadio = $(`#corpYes_${studentIdOrPrefix}`) || $(`#new_corpYes`);
    let noteContainer = corpYesRadio ? corpYesRadio.parentNode : null; // Get the div containing the radio
    let existingNote = noteContainer ? noteContainer.querySelector('.corp-non-hire-note') : null;

    if (value === '是') {
        if (!existingNote && noteContainer) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'notes status-rejected corp-non-hire-note';
            noteSpan.textContent = ' (選擇「否」將無法註冊)';
            const yesLabel = noteContainer.querySelector(`label[for='${corpYesRadio.id}']`);
            if (yesLabel) {
                yesLabel.parentNode.insertBefore(noteSpan, yesLabel.nextSibling);
            } else {
                noteContainer.appendChild(noteSpan);
            }
        } else if (existingNote) {
            existingNote.style.display = 'inline';
        }
    } else {
        if (existingNote) {
            existingNote.style.display = 'none';
        }
    }
};

function saveStudentDetails(schoolName, programName) {
    const form = $('#studentDetailForm');
    const studentId = form.studentId.value;
    const studentIdx = students.findIndex(s => s.id === studentId);
    if (studentIdx === -1) {
        showModal("錯誤", "找不到學生資料，無法儲存。", false, true);
        return;
    }

    if (!form.reportValidity()) {
        showModal("錯誤", "請檢查表單中的必填欄位或錯誤。", false, true, null, null, "確定");
        return;
    }
    if (!form.passportNo.value && !form.idCardNo.value) {
        showModal("錯誤", "身分證字號、護照號碼至少擇一填寫。", false, true, null, null, "確定");
        return;
    }
    const newCorpNonHireStatus = form.querySelector('input[name="corporateNonHire"]:checked').value;
    if (newCorpNonHireStatus === '否' && !form.corporateName.value) {
        showModal("錯誤", "選擇「企業錄取」為「是」時，必須填寫合作企業名稱。", false, true, null, null, "確定");
        form.corporateName.focus();
        return;
    }
    const files = ['transcriptFile', 'recommendationFile', 'academicProofFile', 'otherDocsFile'];
    for (const fieldName of files) {
        const fileInput = form[fieldName];
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                showModal("錯誤", `檔案 ${file.name} (${fieldName}) 過大，請限制在 5MB 以內。`, false, true, null, null, "確定");
                return;
            }
            if (!file.name.toLowerCase().endsWith('.pdf')) {
                showModal("錯誤", `檔案 ${file.name} (${fieldName}) 格式錯誤，僅接受 PDF。`, false, true, null, null, "確定");
                return;
            }
        }
    }

    const oldData = { ...students[studentIdx] };
    const genderRadio = form.querySelector('input[name="gender"]:checked');
    const localRecRadio = form.querySelector('input[name="localSchoolRecommended"]:checked');

    students[studentIdx] = {
        ...students[studentIdx],
        engName: form.engName.value,
        nationality: form.nationality.value,
        idCardNo: form.idCardNo.value,
        passportNo: form.passportNo.value,
        dob: form.dob.value,
        gender: genderRadio ? genderRadio.value : students[studentIdx].gender,
        corporateNonHire: newCorpNonHireStatus,
        corporateName: newCorpNonHireStatus === '否' ? form.corporateName.value : '',
        livingAllowance: parseInt(form.livingAllowance.value) || 0,
        localSchoolName: form.localSchoolName.value,
        localSchoolRecommended: localRecRadio ? localRecRadio.value : students[studentIdx].localSchoolRecommended,
        localSchoolRank: form.localSchoolRank.value ? parseInt(form.localSchoolRank.value) : null,
        intlSchoolRank: form.intlSchoolRank.value ? parseInt(form.intlSchoolRank.value) : null,
        chineseLevel: form.chineseLevel.value,
        adminNotes: form.adminNotes ? form.adminNotes.value : students[studentIdx].adminNotes,
        transcriptFile: form.transcriptFile.files[0] ? form.transcriptFile.files[0].name : students[studentIdx].transcriptFile,
        recommendationFile: form.recommendationFile.files[0] ? form.recommendationFile.files[0].name : students[studentIdx].recommendationFile,
        academicProofFile: form.academicProofFile.files[0] ? form.academicProofFile.files[0].name : students[studentIdx].academicProofFile,
        otherDocsFile: form.otherDocsFile.files[0] ? form.otherDocsFile.files[0].name : students[studentIdx].otherDocsFile,
    };

    if (newCorpNonHireStatus === '是' && students[studentIdx].status === '已註冊') {
        students[studentIdx].status = '準備註冊';
        const program = getProgramDetails(students[studentIdx].schoolName, students[studentIdx].programName);
        const semesterToUpdate = program ? program.currentSemester : null;
        if (semesterToUpdate) {
            const semData = getStudentCurrentSemesterData(studentId, semesterToUpdate);
            if (semData && semData.regStatus === '已註冊') {
                semData.regStatus = '準備註冊';
                semData.submitted = false;
                semData.approved = null;
                semData.adminFees = { total: 0 };
                semData.airfare = 0;
                semData.tuition = 0;
                semData.subsidyTotal = 0;
            }
        }
    }

    console.log(`Student ${studentId} updated by ${currentUser}. Old:`, oldData, "New:", students[studentIdx]);
    closeModal();
    if (currentRole === 'admin') {
        renderProgramDetailsPage($('#contentArea'), schoolName, programName, true);
    } else {
        renderProgramDetailsPage($('#contentArea'), schoolName, programName, false);
    }
    showModal("成功", "學生資料已更新。", true, false);
}

// --- Submit Recommended Students ---
function renderSubmitRecommendedStudentsPage(container) {
    let html = `<h2>提交推薦學生名冊 (${userSchool})</h2>`;
    html += `<p class="info-message">${getOpenTimeMessage('recommendStudents')}</p>`;
    if (!isWithinOpenTime('recommendStudents')) {
        container.innerHTML = html;
        return;
    }

    const schoolPrograms = SCHOOLS_DATA[userSchool]?.programs.filter(p => (p.status || '進行中') === '進行中') || [];
    html += `<div class="form-group">
                <label for="selectProgramForNewStudents" class="required-field-label">選擇要新增學生的專班:</label>
                <select id="selectProgramForNewStudents" onchange="renderNewStudentFormForProgram(this.value)">
                    <option value="">-- 請選擇專班 --</option>
                    ${schoolPrograms.map(p => `<option value="${p.name}">${p.name} (推薦至學期: ${p.currentSemester})</option>`).join('')}
                </select>
             </div>
             <div id="newStudentFormContainer"></div>`;
    container.innerHTML = html;
}

window.renderNewStudentFormForProgram = function (programName) {
    const container = $('#newStudentFormContainer');
    if (!programName) {
        container.innerHTML = '';
        return;
    }
    if (!isWithinOpenTime('recommendStudents')) {
        container.innerHTML = `<p class="error-message">${getOpenTimeMessage('recommendStudents')}</p>`;
        return;
    }

    const program = SCHOOLS_DATA[userSchool]?.programs.find(p => p.name === programName);
    if (!program) {
        container.innerHTML = '<p class="error-message">選擇的專班無效。</p>';
        return;
    }
    const targetSemester = program.currentSemester; // Student is recommended for the program's current semester

    let formHtml = `<h3>新增學生至 "${programName}" (推薦至學期 ${targetSemester})</h3>
    <form id="newStudentForm" onsubmit="submitNewStudentData(event)">
        <input type="hidden" name="programName" value="${programName}">
        <input type="hidden" name="schoolName" value="${userSchool}">
        <input type="hidden" name="department" value="${program.department}">
        <input type="hidden" name="domain" value="${program.domain}">
        <input type="hidden" name="system" value="${program.system}">
        <input type="hidden" name="language" value="${program.language}">
         <input type="hidden" name="targetSemester" value="${targetSemester}">


        <p><i>系統將自動帶入專班相關資訊。</i></p>
         <div class="form-grid">
            <div class="form-group"><label class="required-field-label">護照號碼:</label><input type="text" name="passportNo" required></div>
            <div class="form-group"><label class="required-field-label">英文姓名:</label><input type="text" name="engName" required onblur="preCheckStudent(this.form)"></div>
            <div class="form-group"><label class="required-field-label">國籍:</label><select name="nationality" required><option value="">請選擇</option>${NATIONALITIES.map(n => `<option value="${n}">${n}</option>`).join('')}</select></div>
            <div class="form-group"><label>身分證字號:</label><input type="text" name="idCardNo"></div>
             <div class="form-group"><label class="required-field-label">出生年月日:</label><input type="date" name="dob" required onblur="preCheckStudent(this.form)"></div>
            <div class="form-group"><label class="required-field-label">生理性別:</label>
                <input type="radio" id="new_genderMale" name="gender" value="男" required onblur="preCheckStudent(this.form)"> <label for="new_genderMale">男</label>
                <input type="radio" id="new_genderFemale" name="gender" value="女" required> <label for="new_genderFemale">女</label>
            </div>
            <div class="form-group"><label class="required-field-label">企業錄取:</label>
                <input type="radio" id="new_corpNo" name="corporateNonHire" value="否" onchange="toggleCorporateName(this.value, 'newStudent')" checked required> <label for="new_corpNo">是</label>
                <input type="radio" id="new_corpYes" name="corporateNonHire" value="是" onchange="toggleCorporateName(this.value, 'newStudent')" required> <label for="new_corpYes">否</label>
            </div>
            <div class="form-group" id="corporateNameGroup_newStudent" style="display:block;">
                <label class="required-field-label">合作企業名稱:</label><input type="text" name="corporateName" required>
            </div>
             <div class="form-group"><label class="required-field-label">生活津貼 (至少10k):</label><input type="number" name="livingAllowance" min="10000" required></div>
            <div class="form-group"><label class="required-field-label">當地學校:</label>
                 <input type="text" name="localSchoolName" required list="localSchoolList_new">
                 <datalist id="localSchoolList_new">
                     ${RECOMMENDED_LOCAL_SCHOOLS.map(school => `<option value="${school}"></option>`).join('')}
                 </datalist>
            </div>
             <div class="form-group"><label class="required-field-label">當地學校推薦清單內:</label>
                <input type="radio" id="new_localRecYes" name="localSchoolRecommended" value="是" required> <label for="new_localRecYes">是</label>
                <input type="radio" id="new_localRecNo" name="localSchoolRecommended" value="否" checked required> <label for="new_localRecNo">否</label>
            </div>
            <div class="form-group"><label>當地排名:</label><input type="number" name="localSchoolRank" min="0"></div>
            <div class="form-group"><label>國際排名:</label><input type="number" name="intlSchoolRank" min="0"></div>
         </div>
         <div id="preCheckResult" class="notes" style="color:orange; margin-bottom:15px;"></div>

         <h4>必要附件 (PDF < 5MB)</h4>
         <div class="form-grid">
             <div class="form-group"><label class="required-field-label">在校/畢業成績單:</label><input type="file" name="transcriptFile" accept=".pdf" required></div>
            <div class="form-group"><label class="required-field-label">學校師長推薦信:</label><input type="file" name="recommendationFile" accept=".pdf" required></div>
            <div class="form-group"><label class="required-field-label">學業表現優異證明:</label><input type="file" name="academicProofFile" accept=".pdf" required></div>
            <div class="form-group" id="otherDocsForNewStudentGroup" style="${program.system === '本國生混班之學士班' ? '' : 'display:none;'}">
                <label class="${program.system === '本國生混班之學士班' ? 'required-field-label' : ''}">其他檢核資料:</label><input type="file" name="otherDocsFile" accept=".pdf" ${program.system === '本國生混班之學士班' ? 'required' : ''}>
            </div>
        </div>
        <div class="page-actions">
            <button type="submit">確認送出 (送出後無法修改)</button>
        </div>
    </form>`;
    container.innerHTML = formHtml;
    toggleCorporateName(container.querySelector('input[name="corporateNonHire"]:checked').value, 'newStudent');
}

window.preCheckStudent = function (form) {
    const nameInput = form.engName;
    const dobInput = form.dob;
    const genderRadio = form.querySelector('input[name="gender"]:checked');

    const name = nameInput ? nameInput.value.trim() : '';
    const dob = dobInput ? dobInput.value : '';
    const gender = genderRadio ? genderRadio.value : null;

    const preCheckResultDiv = $('#preCheckResult');
    if (!preCheckResultDiv) return;
    preCheckResultDiv.innerHTML = '';

    if (name && dob && gender) {
        console.log(`Pre-checking for: Name=${name}, DOB=${dob}, Gender=${gender}`);
        const matches = students.filter(s =>
            s.engName.toLowerCase() === name.toLowerCase() &&
            s.dob === dob &&
            s.gender === gender
        );
        console.log("Matches found:", matches);
        if (matches.length > 0) {
            let message = "<strong>預檢核: 該生曾被 ";
            message += matches.map(match => `${match.schoolName} ${match.programName}`).join(", ");
            message += " 推薦 (有可能不只一筆)</strong>";
            preCheckResultDiv.innerHTML = message;
        } else {
            preCheckResultDiv.textContent = "預檢核: 資料庫尚無相似記錄。";
        }
    }
}

function submitNewStudentData(event) {
    event.preventDefault();
    const form = $('#newStudentForm');

    if (!isWithinOpenTime('recommendStudents')) {
        showModal("錯誤", `目前非推薦學生名冊提交開放時間 (${getOpenTimeMessage('recommendStudents')})`, false, true);
        return;
    }

    if (!form.checkValidity()) {
        showModal("錯誤", "請填寫所有必填欄位並檢查格式。", false, true, null, null, "確定");
        form.reportValidity();
        return;
    }
    if (!form.passportNo.value && !form.idCardNo.value) {
        showModal("錯誤", "身分證字號、護照號碼至少擇一填寫。", false, true, null, null, "確定");
        return;
    }
    const corpNonHireStatus = form.querySelector('input[name="corporateNonHire"]:checked').value;
    if (corpNonHireStatus === '否' && !form.corporateName.value) {
        showModal("錯誤", "選擇「企業錄取」為「是」時，必須填寫合作企業名稱。", false, true, null, null, "確定");
        form.corporateName.focus();
        return;
    }
    const filesToCheck = ['transcriptFile', 'recommendationFile', 'academicProofFile'];
    if (form.otherDocsFile && form.otherDocsFile.required) {
        filesToCheck.push('otherDocsFile');
    }
    for (const fieldName of filesToCheck) {
        const fileInput = form[fieldName];
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB
                showModal("錯誤", `檔案 ${file.name} (${fieldName}) 過大，請限制在 5MB 以內。`, false, true, null, null, "確定");
                return;
            }
            if (!file.name.toLowerCase().endsWith('.pdf')) {
                showModal("錯誤", `檔案 ${file.name} (${fieldName}) 格式錯誤，僅接受 PDF。`, false, true, null, null, "確定");
                return;
            }
        } else if (fileInput && fileInput.required) {
            showModal("錯誤", `欄位 ${fieldName} 為必填附件。`, false, true, null, null, "確定");
            return;
        }
    }

    const newStudent = {
        id: 'S' + Date.now().toString().slice(-6),
        engName: form.engName.value.trim(),
        nationality: form.nationality.value,
        schoolName: form.schoolName.value,
        programName: form.programName.value,
        passportNo: form.passportNo.value,
        idCardNo: form.idCardNo.value,
        dob: form.dob.value,
        gender: form.querySelector('input[name="gender"]:checked').value,
        corporateNonHire: corpNonHireStatus,
        corporateName: corpNonHireStatus === '否' ? form.corporateName.value : '',
        livingAllowance: parseInt(form.livingAllowance.value) || 0,
        localSchoolName: form.localSchoolName.value,
        localSchoolRecommended: form.querySelector('input[name="localSchoolRecommended"]:checked').value,
        localSchoolRank: form.localSchoolRank.value ? parseInt(form.localSchoolRank.value) : null,
        intlSchoolRank: form.intlSchoolRank.value ? parseInt(form.intlSchoolRank.value) : null,
        transcriptFile: form.transcriptFile.files[0] ? form.transcriptFile.files[0].name : null,
        recommendationFile: form.recommendationFile.files[0] ? form.recommendationFile.files[0].name : null,
        academicProofFile: form.academicProofFile.files[0] ? form.academicProofFile.files[0].name : null,
        otherDocsFile: form.otherDocsFile.files[0] ? form.otherDocsFile.files[0].name : null,
        status: '準備註冊',
        submittedBySchool: true,
        adminApproved: null,
        adminRejectReason: '',
        semesters: {}
    };

    const targetSemester = form.targetSemester.value;
    if (targetSemester) {
        // When a student is newly recommended, `isNewSemesterEntry` for this targetSemester should be true.
        newStudent.semesters[targetSemester] = createDefaultSemesterData(true);
        newStudent.semesters[targetSemester].regStatus = '準備註冊';
    } else {
        console.error("Target semester missing for new student submission!");
    }

    students.push(newStudent);
    console.log('New student submitted for review:', newStudent);
    $('#newStudentFormContainer').innerHTML = `<p class="status-submitted">學生 ${newStudent.engName} 資料已提交審核。送出後無法再修改。</p><p><button onclick="renderNewStudentFormForProgram('${newStudent.programName}')">繼續新增同專班學生</button></p>`;
    showModal("成功", `學生 ${newStudent.engName} 資料已提交審核。`, true, false);
}


// --- Review Recommended Students (Admin - Grouped View) ---
function renderReviewRecommendedStudentsPage(container) {
    let html = `<h2>審核推薦學生名冊 (依專班分類) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    const pendingStudents = students.filter(s => s.submittedBySchool === true && s.adminApproved === null);

    if (pendingStudents.length === 0) {
        html += "<p>目前沒有待審核的推薦學生名冊。</p>";
        container.innerHTML = html;
        return;
    }

    const groupedStudents = pendingStudents.reduce((acc, student) => {
        const schoolKey = student.schoolName;
        const programKey = student.programName;
        if (!acc[schoolKey]) acc[schoolKey] = {};
        if (!acc[schoolKey][programKey]) acc[schoolKey][programKey] = [];
        acc[schoolKey][programKey].push(student);
        return acc;
    }, {});

    html += `
             <div class="filter-section program-filters">
             <p>以下為學校提交的新推薦學生名冊，請審核：</p>
                 <button class="secondary" onclick="">下載所有待審核資料</button>
        </div>
`;

    for (const schoolName in groupedStudents) {
        html += `<div class="review-group school-group"><h3>${schoolName}</h3>`;
        for (const programName in groupedStudents[schoolName]) {
            const programStudentsInGroup = groupedStudents[schoolName][programName];
            const program = getProgramDetails(schoolName, programName);
            // The "target semester" for these recommended students is the program's current semester at the time of recommendation.
            const recommendationTargetSemester = program ? program.currentSemester : 'N/A';

            html += `<div class="review-group program-group">
                        <h4>專班: ${programName} (推薦至學期: ${recommendationTargetSemester})</h4>
                        <div class="program-actions">
                           <button class="secondary" onclick="adminApproveProgramBatch('${schoolName}', '${programName}', '${recommendationTargetSemester}', true)">本班全部接受</button>
                           <button class="danger" onclick="adminApproveProgramBatch('${schoolName}', '${programName}', '${recommendationTargetSemester}', 'not_subsidized')">本班全部當年未獲補助</button>
                           <button class="danger" onclick="adminApproveProgramBatch('${schoolName}', '${programName}', '${recommendationTargetSemester}', false)">本班全部退回 (需填原因)</button>
                        </div>
                        <table class="reviewStudentsTable-inner">
                         <thead><tr><th>英文姓名</th><th>護照</th><th>DOB</th><th>企<br>不<br>錄<br>取</th><th>當地學校</th><th>檢核提示</th><th>個別操作</th></tr></thead>
                         <tbody>`;

            programStudentsInGroup.forEach(s => {
                const duplicateMatches = students.filter(dbStudent =>
                    dbStudent.id !== s.id &&
                    dbStudent.engName.toLowerCase() === s.engName.toLowerCase() &&
                    dbStudent.dob === s.dob &&
                    dbStudent.gender === s.gender
                );
                let preCheckMessage = duplicateMatches.length > 0
                    ? `<span class="highlight-important">身分檢核: 曾被 ${duplicateMatches.map(m => `${m.schoolName} ${m.programName}`).join(', ')} 推薦</span>`
                    : '';

                const isLocalSchoolOnList = RECOMMENDED_LOCAL_SCHOOLS.some(rs => rs.toLowerCase() === s.localSchoolName.toLowerCase());
                const localSchoolDisplay = isLocalSchoolOnList
                    ? s.localSchoolName
                    : `<span class="highlight-warning">${s.localSchoolName} (不在推薦名單)</span>`;


                html += `<tr data-student-id="${s.id}">
                            <td>${s.engName}</td>
                            <td>${s.passportNo}</td>
                            <td>${s.dob}</td>
                             <td style="text-align: center;">${s.corporateNonHire === '是' ? '<span class="status-rejected">是</span>' : '否'}</td>
                            <td>${localSchoolDisplay}</td>
                            <td>${preCheckMessage || '無'}</td>
                            <td>
                                <button onclick="viewStudentDetails('${s.id}', true)">檢視</button>
                                <button class="secondary" onclick="adminApproveStudent('${s.id}', '${recommendationTargetSemester}', true)">接受</button>
                                <button class="danger" onclick="adminApproveStudent('${s.id}', '${recommendationTargetSemester}', 'not_subsidized')" ${s.corporateNonHire === '是' ? 'disabled title="企業不錄取學生無法標記未獲補助"' : ''}>當年未獲補助</button>
                                <button class="danger" onclick="adminApproveStudent('${s.id}', '${recommendationTargetSemester}', false)">退回</button>
                            </td>
                         </tr>`;
            });
            html += `</tbody></table></div>`;
        }
        html += `</div>`;
    }
    container.innerHTML = html;
}

window.adminApproveProgramBatch = function (schoolName, programName, targetSemester, approvalStatus) {
    const programStudentsToReview = students.filter(s =>
        s.schoolName === schoolName &&
        s.programName === programName &&
        s.submittedBySchool === true &&
        s.adminApproved === null &&
        s.semesters[targetSemester] // Ensure they were recommended for this target semester
    );

    if (programStudentsToReview.length === 0) {
        showModal("通知", "此專班於此學期沒有待審核的學生。", true, false);
        return;
    }

    let reason = '';
    if (approvalStatus === false) {
        reason = prompt(`請輸入退回 ${schoolName} - ${programName} (${targetSemester}) 所有學生的原因 (此欄位要設計成可多段輸入):`);
        if (reason === null) return;
        if (!reason) { alert("退回操作必須填寫原因。"); return; }
    } else if (approvalStatus === 'not_subsidized') {
        const hasCorpNonHireYes = programStudentsToReview.some(s => s.corporateNonHire === '是');
        if (hasCorpNonHireYes) {
            alert("批次操作失敗：此專班包含「企業錄取」為「否」的學生，無法整批標記為「當年未獲補助」。請個別操作。");
            return;
        }
        const confirmNoSubsidy = confirm(`確定要將 ${schoolName} - ${programName} (${targetSemester}) 的 ${programStudentsToReview.length} 位待審核學生全部標記為「當年未獲補助」嗎？`);
        if (!confirmNoSubsidy) return;
    }

    let successCount = 0;
    programStudentsToReview.forEach(student => {
        if (approvalStatus === 'not_subsidized' && student.corporateNonHire === '是') return; // Skip
        const result = updateStudentApproval(student.id, targetSemester, approvalStatus, reason);
        if (result) successCount++;
    });

    renderReviewRecommendedStudentsPage($('#contentArea'));
    showModal("成功", `已對 ${schoolName} - ${programName} (${targetSemester}) 的 ${successCount} 位學生執行批次操作。`, true, false);
}

window.adminApproveStudent = function (studentId, targetSemester, approvalStatus) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (approvalStatus === 'not_subsidized' && student.corporateNonHire === '是') {
        alert("企業不錄取的學生無法標記為「當年未獲補助」。");
        return;
    }

    let reason = '';
    if (approvalStatus === false) {
        reason = prompt(`請輸入退回學生 ${student.engName} 的原因：`);
        if (reason === null) return;
        if (!reason) { alert("退回操作必須填寫原因。"); return; }
    } else if (approvalStatus === 'not_subsidized') {
        const confirmNoSubsidy = confirm(`確定要將學生 ${student.engName} 標記為「當年未獲補助」嗎？`);
        if (!confirmNoSubsidy) return;
    }

    const success = updateStudentApproval(studentId, targetSemester, approvalStatus, reason);
    if (success) {
        renderReviewRecommendedStudentsPage($('#contentArea'));
    }
}

function updateStudentApproval(studentId, targetSemester, approvalStatus, reason = '') {
    const studentIdx = students.findIndex(s => s.id === studentId);
    if (studentIdx === -1) {
        console.warn(`Student ${studentId} not found during approval update.`);
        return false;
    }
    const student = students[studentIdx];

    if (student.submittedBySchool !== true || student.adminApproved !== null) {
        console.warn(`Student ${studentId} is not in a pending state. Skipping update.`);
        return false;
    }
    if (approvalStatus === 'not_subsidized' && student.corporateNonHire === '是') {
        console.warn(`Cannot mark student ${studentId} as 'not_subsidized' because corporateNonHire is 'Yes'.`);
        return false;
    }

    student.adminApproved = approvalStatus;
    student.submittedBySchool = (approvalStatus === false);
    student.adminRejectReason = reason;

    const semData = getStudentCurrentSemesterData(student.id, targetSemester); // Operate on the target semester

    if (approvalStatus === true) {
        student.status = '準備註冊';
        semData.regStatus = '準備註冊';
        semData.isNewSemesterEntry = true; // Explicitly mark as new for this approved semester
    } else if (approvalStatus === 'not_subsidized') {
        student.status = '當年未獲補助';
        semData.regStatus = '當年未獲補助'; // Mark this target semester
        markStudentSemestersAsNotSubsidized(student, targetSemester, 2); // And subsequent ones
    } else { // Rejected
        student.status = '已退回 (推薦)';
        semData.regStatus = '已退回 (推薦)';
    }

    console.log(`Admin reviewed student ${studentId} (${student.engName}) for ${targetSemester}. Status: ${approvalStatus}. Reason: ${reason}`);
    return true;
}


// --- Register Subsidies ---
function renderRegisterSubsidiesPage(container) {
    let html = `<h2>註冊與補助登錄 (${userSchool}) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    html += `<p class="info-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
    if (!isWithinOpenTime('registerSubsidy')) {
        container.innerHTML = html;
        return;
    }

    const schoolPrograms = SCHOOLS_DATA[userSchool]?.programs.filter(p => (p.status || '進行中') === '進行中') || [];
    html += `<div class="form-group">
                <label for="selectProgramForSubsidy" class="required-field-label">選擇專班:</label>
                <select id="selectProgramForSubsidy" onchange="renderSubsidyTableForProgram(this.value)">
                    <option value="">-- 請選擇專班 --</option>
                     ${schoolPrograms.map(p => `<option value="${p.name}">${p.name} (處理學期: ${p.currentSemester})</option>`).join('')}
                </select>
             </div>
             <div id="subsidyTableContainer"></div>`;
    container.innerHTML = html;
}

window.renderSubsidyTableForProgram = function (programName) {
    const container = $('#subsidyTableContainer');
    if (!programName) {
        container.innerHTML = '';
        return;
    }
    if (!isWithinOpenTime('registerSubsidy')) {
        container.innerHTML = `<p class="error-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
        return;
    }

    const program = SCHOOLS_DATA[userSchool]?.programs.find(p => p.name === programName);
    if (!program || program.status === '已結束') {
        container.innerHTML = `<p class="error-message">選擇的專班無效或已結束。</p>`;
        return;
    }
    const currentProgramSemester = program.currentSemester; // This is the semester being processed
    const programInitialSemester = program.initialSemester;

    const programStudents = students.filter(s =>
        s.schoolName === userSchool &&
        s.programName === programName &&
        s.status !== '已畢業' &&
        s.adminApproved !== false // Not rejected at recommendation
    );

    if (programStudents.length === 0) {
        container.innerHTML = `<p>專班 "${programName}" (學期 ${currentProgramSemester}) 目前沒有符合條件的學生可進行註冊與補助登錄。</p>`;
        return;
    }

    const firstEditableStudent = programStudents.find(s => {
        const semData = getStudentCurrentSemesterData(s.id, currentProgramSemester);
        return semData && (!semData.submitted || semData.approved === false);
    });
    const representativeSemData = firstEditableStudent
        ? getStudentCurrentSemesterData(firstEditableStudent.id, currentProgramSemester)
        : getStudentCurrentSemesterData(programStudents[0].id, currentProgramSemester);

    const isOverallSubmitted = representativeSemData.submitted;
    const isOverallApproved = representativeSemData.approved;
    const isEditable = isWithinOpenTime('registerSubsidy') && (!isOverallSubmitted || isOverallApproved === false);


    let statusMessage = '';
    if (!isEditable && isOverallSubmitted && isOverallApproved === null) statusMessage = `<p class="status-submitted">此專班資料已提交，等待管理員審核。</p>`;
    else if (!isEditable && isOverallSubmitted && isOverallApproved === true) statusMessage = `<p class="status-approved">此專班資料已審核通過。</p>`;
    else if (isEditable && isOverallSubmitted && isOverallApproved === false) {
        statusMessage = `<p class="status-rejected">此專班資料先前已被退回。原因: ${representativeSemData.rejectReason || '未提供'}. 請修改後重新提交。</p>`;
    } else if (isEditable) {
        statusMessage = `<p class="info-message">請填寫以下學生的註冊與補助資料。注意：「準備註冊」狀態無法提交。</p>`;
    } else {
        statusMessage = `<p class="info-message">此專班的註冊補助資料不需處理或已完成審核。</p>`;
    }


    let tableHtml = `<h3>${programName} - ${currentProgramSemester} - 註冊與補助登錄</h3>${statusMessage}
        <form id="subsidyForm">
        <table class="registration-table">
        <thead>
            <tr>
                <th>英文姓名</th><th>護照號碼</th><th class="required-field-label">註冊狀態</th>
                <th>文件翻譯</th><th>公證文件</th><th>健康檢查</th><th>單次簽證</th>
                <th>行政費用總額<br>(上限10k)</th><th>單程機票<br>(上限9k)</th><th class="required-field-label">學雜費<br>(上限50k)</th>
                <th>補助合計</th><th>備註</th>
            </tr>
        </thead>
        <tbody>`;

    programStudents.forEach((student, index) => {
        const studentSemData = getStudentCurrentSemesterData(student.id, currentProgramSemester);
        const notSubsidized = studentSemData.notSubsidizedThisYear ?? false;
        const isStudentOverallEditable = isEditable && studentSemData.subsidyEditable !== false && !notSubsidized;
        const isCorpNonHireYes = student.corporateNonHire === '是';

        // isNewSemesterEntry for current student in THIS program's current semester
        let isNewEntry = false;
        if (currentProgramSemester === programInitialSemester) {
            // If program is in its initial semester, this is a new entry FOR THE PROGRAM
            // and the student's specific semester data should reflect that.
            isNewEntry = studentSemData.isNewSemesterEntry === undefined ? true : studentSemData.isNewSemesterEntry;
            // Ensure it's marked true if not set yet for an initial semester
            if (studentSemData.isNewSemesterEntry === undefined) studentSemData.isNewSemesterEntry = true;
        } else {
            isNewEntry = false; // Not program's initial semester
            if (studentSemData.isNewSemesterEntry === undefined) studentSemData.isNewSemesterEntry = false;
        }


        studentSemData.adminFees = studentSemData.adminFees || { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 };
        studentSemData.airfare = studentSemData.airfare || 0;
        studentSemData.tuition = studentSemData.tuition || 0;
        studentSemData.subsidyTotal = studentSemData.subsidyTotal || 0;
        studentSemData.autoFillNote = '';

        if (!isNewEntry && studentSemData.tuition === 0 && isStudentOverallEditable && !isCorpNonHireYes) {
            const currentSemIdx = SEMESTERS.indexOf(currentProgramSemester);
            const prevSemesterIdx = currentSemIdx + 1;
            if (prevSemesterIdx < SEMESTERS.length) {
                const prevSemesterKey = SEMESTERS[prevSemesterIdx];
                const prevSemData = student.semesters ? student.semesters[prevSemesterKey] : null;
                if (prevSemData && prevSemData.tuition > 0 && prevSemData.regStatus === '已註冊') {
                    studentSemData.tuition = prevSemData.tuition;
                    studentSemData.autoFillNote = "自動帶入上學期學雜費";
                    calculateTotals(index.toString(), isNewEntry, isCorpNonHireYes); // Recalculate
                }
            }
        }

        const enableSubsidyFields = isStudentOverallEditable && studentSemData.regStatus === '已註冊' && !notSubsidized && !isCorpNonHireYes;
        let notesHtml = '';
        if (notSubsidized) notesHtml += '<span class="status-rejected">當年未獲補助</span>';
        if (!isNewEntry) notesHtml += (notesHtml ? '<br>' : '') + '<span>非新生</span>';
        if (isCorpNonHireYes) notesHtml += (notesHtml ? '<br>' : '') + '<span class="status-rejected corp-non-hire-note">企業不錄取，無法註冊</span>';


        tableHtml += `
            <tr data-student-id="${student.id}" data-student-index="${index}">
                <td class="student-name">${student.engName} ${isCorpNonHireYes ? '<br><span class="corp-non-hire-tag">[企不錄取]</span>' : ''}</td>
                <td class="passport-no">${student.passportNo}</td>
                <td>
                    <select name="regStatus_${index}" onchange="updateSubsidyFields(this, '${index}', ${isNewEntry}, ${notSubsidized}, ${isCorpNonHireYes})" ${!isStudentOverallEditable ? 'disabled class="status-readonly"' : ''} required>
                        <option value="準備註冊" ${studentSemData.regStatus === '準備註冊' ? 'selected' : ''} ${!isStudentOverallEditable || isCorpNonHireYes ? 'disabled' : ''}>準備註冊 (不可提交)</option>
                        <option value="已註冊" ${studentSemData.regStatus === '已註冊' ? 'selected' : ''} ${isCorpNonHireYes ? 'disabled title="企業不錄取學生無法註冊"' : ''}>已註冊</option>
                        <option value="不註冊" ${studentSemData.regStatus === '不註冊' ? 'selected' : ''}>不註冊</option>
                        <option value="特殊不註冊" ${studentSemData.regStatus === '特殊不註冊' ? 'selected' : ''}>特殊不註冊</option>
                        ${notSubsidized ? `<option value="當年未獲補助" selected disabled>當年未獲補助</option>` : ''}
                        ${studentSemData.regStatus === '已畢業' ? `<option value="已畢業" selected disabled>已畢業</option>` : ''}
                        ${studentSemData.regStatus === '已退回 (推薦)' ? `<option value="已退回 (推薦)" selected disabled>已退回 (推薦)</option>` : ''}
                        ${!isStudentOverallEditable && !notSubsidized && !['已畢業', '已退回 (推薦)'].includes(studentSemData.regStatus) ? `<option value="${studentSemData.regStatus}" selected disabled>${studentSemData.regStatus} (唯讀)</option>` : ''}
                    </select>
                    <div id="regStatusNote_${index}" class="notes"></div>
                </td>
                <td><input type="number" name="adminFee_docTranslation_${index}" min="0" value="${studentSemData.adminFees.docTranslation || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields || !isNewEntry ? 'readonly class="status-readonly"' : ''}></td>
                <td><input type="number" name="adminFee_notarization_${index}" min="0" value="${studentSemData.adminFees.notarization || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields || !isNewEntry ? 'readonly class="status-readonly"' : ''}></td>
                <td><input type="number" name="adminFee_healthCheck_${index}" min="0" value="${studentSemData.adminFees.healthCheck || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields || !isNewEntry ? 'readonly class="status-readonly"' : ''}></td>
                <td><input type="number" name="adminFee_visa_${index}" min="0" value="${studentSemData.adminFees.visa || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields || !isNewEntry ? 'readonly class="status-readonly"' : ''}></td>
                <td><input type="number" name="adminFee_total_${index}" value="${studentSemData.adminFees.total || 0}" readonly class="readonly-field"></td>
                <td><input type="number" name="airfare_${index}" min="0" max="9000" value="${studentSemData.airfare || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields || !isNewEntry ? 'readonly class="status-readonly"' : ''}></td>
                <td>
                     <input type="number" name="tuition_${index}" min="0" max="50000" value="${studentSemData.tuition || 0}" oninput="calculateTotals('${index}', ${isNewEntry}, ${isCorpNonHireYes})" ${!enableSubsidyFields ? 'readonly class="status-readonly"' : ''} required>
                     <div class="notes highlight-important">${studentSemData.autoFillNote || ''}</div>
                </td>
                <td><input type="number" name="subsidyTotal_${index}" value="${studentSemData.subsidyTotal || 0}" readonly class="readonly-field"></td>
                <td id="subsidyNotes_${index}" class="notes">${notesHtml}</td>
            </tr>`;
    });
    tableHtml += `</tbody></table>`;

    if (isEditable) {
        tableHtml += `<div class="page-actions">
                        <button type="button" onclick="saveSubsidyData('${programName}', '${currentProgramSemester}', false)">暫存</button>
                        <button type="button" onclick="submitSubsidyData('${programName}', '${currentProgramSemester}')">提交審核</button>
                     </div>`;
    } else if (!isEditable && isOverallSubmitted && isOverallApproved === true) {
        const signedReceiptUploaded = representativeSemData.signedSubsidyReceiptUploaded;
        tableHtml += `<div class="page-actions">
                        <p>已審核通過。
                        <button type="button" onclick="downloadReceipt('${programName}', '${currentProgramSemester}', 'subsidy')" ${signedReceiptUploaded ? 'disabled' : ''}>下載印領清冊</button>
                        ${!signedReceiptUploaded ? `並蓋章後
                        <label for="uploadSignedReceipt_${programName.replace(/\s+/g, '_')}" class="${signedReceiptUploaded ? 'disabled-label' : ''}">上傳檔案 (PDF):</label>
                        <input type="file" id="uploadSignedReceipt_${programName.replace(/\s+/g, '_')}" accept=".pdf" onchange="handleSignedReceiptUpload(this, '${programName}', '${currentProgramSemester}', 'subsidy')" ${signedReceiptUploaded ? 'disabled' : ''}>
                        <span id="uploadStatus_${programName.replace(/\s+/g, '_')}"></span>` : '<span class="status-approved">已上傳簽署檔案。</span>'}
                        </p>
                     </div>`;
    }
    tableHtml += `</form>`;
    container.innerHTML = tableHtml;

    programStudents.forEach((student, index) => {
        const studentSemData = getStudentCurrentSemesterData(student.id, currentProgramSemester);
        const regStatusSelect = $(`select[name="regStatus_${index}"]`);
        if (regStatusSelect) {
            let isNewEntry = false;
            if (currentProgramSemester === programInitialSemester) {
                isNewEntry = studentSemData.isNewSemesterEntry === undefined ? true : studentSemData.isNewSemesterEntry;
            }
            const notSubsidized = studentSemData.notSubsidizedThisYear ?? false;
            const isCorpNonHireYes = student.corporateNonHire === '是';
            updateSubsidyFields(regStatusSelect, index.toString(), isNewEntry, notSubsidized, isCorpNonHireYes);
            calculateTotals(index.toString(), isNewEntry, isCorpNonHireYes);
        }
    });
};

window.updateSubsidyFields = function (selectElement, index, isNewEntry, isNotSubsidized, isCorpNonHireYes) {
    const selectedStatus = selectElement.value;
    const form = $('#subsidyForm');
    if (!form) return;

    const noteDiv = $(`#regStatusNote_${index}`);
    if (noteDiv) noteDiv.textContent = '';

    const getInputElement = (name) => form[name];

    const adminFeeInputs = [
        getInputElement(`adminFee_docTranslation_${index}`), getInputElement(`adminFee_notarization_${index}`),
        getInputElement(`adminFee_healthCheck_${index}`), getInputElement(`adminFee_visa_${index}`)];
    const airfareInput = getInputElement(`airfare_${index}`);
    const tuitionInput = getInputElement(`tuition_${index}`);

    const allValueInputs = [...adminFeeInputs, airfareInput, tuitionInput];
    const isSubsidyApplicable = (selectedStatus === '已註冊' && !isNotSubsidized && !isCorpNonHireYes);

    allValueInputs.forEach(input => {
        if (!input) return;
        const isAdminOrAirfare = adminFeeInputs.includes(input) || input === airfareInput;
        const isReadOnly = !isSubsidyApplicable || (isAdminOrAirfare && !isNewEntry);
        input.readOnly = isReadOnly;
        input.classList.toggle('status-readonly', isReadOnly);
        if (!isSubsidyApplicable) {
            input.value = 0;
        }
        if (input === tuitionInput) {
            input.required = isSubsidyApplicable;
        }
    });

    if (noteDiv) {
        if (selectedStatus === '不註冊' || selectedStatus === '特殊不註冊') {
            noteDiv.textContent = "請至「不註冊情況登錄」頁面填寫原因。";
        } else if (selectedStatus === '準備註冊') {
            noteDiv.textContent = "此狀態無法提交審核。";
        } else if (isCorpNonHireYes && selectedStatus === '已註冊') {
            noteDiv.textContent = "企業不錄取學生無法設為已註冊。";
            selectElement.value = '準備註冊'; // Revert if invalid selection made
        }
    }

    calculateTotals(index, isNewEntry, isCorpNonHireYes);
};


window.calculateTotals = function (index, isNewEntry, isCorpNonHireYes) {
    const form = $('#subsidyForm');
    if (!form) return;
    const regStatusSelect = form[`regStatus_${index}`];
    const isRegistered = regStatusSelect && regStatusSelect.value === '已註冊';

    const isSubsidyApplicable = isRegistered && !isCorpNonHireYes;

    let adminTotalRaw = 0;
    if (isNewEntry && isSubsidyApplicable) {
        const docTranslation = parseInt(form[`adminFee_docTranslation_${index}`]?.value) || 0;
        const notarization = parseInt(form[`adminFee_notarization_${index}`]?.value) || 0;
        const healthCheck = parseInt(form[`adminFee_healthCheck_${index}`]?.value) || 0;
        const visa = parseInt(form[`adminFee_visa_${index}`]?.value) || 0;
        adminTotalRaw = docTranslation + notarization + healthCheck + visa;
    }

    const cappedAdminTotal = Math.min(Math.max(0, adminTotalRaw), 10000);
    const adminTotalInput = form[`adminFee_total_${index}`];
    if (adminTotalInput) adminTotalInput.value = cappedAdminTotal;


    let airfare = 0;
    const airfareInput = form[`airfare_${index}`];
    if (isNewEntry && isSubsidyApplicable && airfareInput) {
        airfare = parseInt(airfareInput.value) || 0;
        airfare = Math.max(0, Math.min(airfare, 9000));
        airfareInput.value = airfare;
    }

    let tuition = 0;
    const tuitionInput = form[`tuition_${index}`];
    if (isSubsidyApplicable && tuitionInput) {
        tuition = parseInt(tuitionInput.value) || 0;
        tuition = Math.max(0, Math.min(tuition, 50000));
        tuitionInput.value = tuition;
    }

    const subsidyTotal = isSubsidyApplicable ? (cappedAdminTotal + airfare + tuition) : 0;
    const subsidyTotalInput = form[`subsidyTotal_${index}`];
    if (subsidyTotalInput) subsidyTotalInput.value = subsidyTotal;

};

function saveSubsidyData(programName, semester, isSubmitting) {
    const form = $('#subsidyForm');
    if (!form) {
        showModal("錯誤", "找不到表單資料。", true, false);
        return;
    }
    if (!isWithinOpenTime('registerSubsidy')) {
        showModal("錯誤", `操作失敗: ${getOpenTimeMessage('registerSubsidy')}`, true, false);
        return;
    }

    let hasInvalidRegStatus = false;
    let invalidStatusReason = '';
    let requiresNonRegEntry = false;
    const studentRows = form.querySelectorAll('tbody tr');

    if (isSubmitting) {
        studentRows.forEach(row => {
            const index = row.dataset.studentIndex;
            const studentId = row.dataset.studentId;
            const student = students.find(s => s.id === studentId);
            const regStatusSelect = form[`regStatus_${index}`];
            const tuitionInput = form[`tuition_${index}`];

            if (regStatusSelect && regStatusSelect.value === '準備註冊') {
                hasInvalidRegStatus = true;
                invalidStatusReason = '包含狀態為「準備註冊」的學生';
                regStatusSelect.classList.add('input-error');
            } else if (regStatusSelect) {
                regStatusSelect.classList.remove('input-error');
            }

            if (regStatusSelect && regStatusSelect.value === '已註冊' && tuitionInput && !tuitionInput.readOnly && (!tuitionInput.value || parseInt(tuitionInput.value) <= 0)) { // Tuition must be > 0 if registered
                hasInvalidRegStatus = true;
                invalidStatusReason = invalidStatusReason ? invalidStatusReason + '；部分「已註冊」學生學雜費未填或為0' : '部分「已註冊」學生學雜費未填或為0';
                tuitionInput.classList.add('input-error');
            } else if (tuitionInput) {
                tuitionInput.classList.remove('input-error');
            }

            if (student?.corporateNonHire === '是' && regStatusSelect?.value === '已註冊') {
                hasInvalidRegStatus = true;
                invalidStatusReason = invalidStatusReason ? invalidStatusReason + '；企業不錄取學生不得設為已註冊' : '企業不錄取學生不得設為已註冊';
                regStatusSelect.classList.add('input-error');
            }
        });

        if (hasInvalidRegStatus) {
            showModal("錯誤", `提交失敗：${invalidStatusReason}。請修正後再提交。`, true, false);
            return;
        }
    }


    studentRows.forEach(row => {
        const studentId = row.dataset.studentId;
        const index = row.dataset.studentIndex;
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        const studentSemData = getStudentCurrentSemesterData(studentId, semester);
        if (!studentSemData) return;

        const regStatusSelect = form[`regStatus_${index}`];
        const regStatus = regStatusSelect ? regStatusSelect.value : studentSemData.regStatus;

        if (regStatusSelect && !regStatusSelect.disabled) {
            studentSemData.regStatus = regStatus;
        }

        const program = getProgramDetails(student.schoolName, student.programName);
        const programInitialSemester = program ? program.initialSemester : null;
        let isNewEntry = (semester === programInitialSemester) && (studentSemData.isNewSemesterEntry === undefined ? true : studentSemData.isNewSemesterEntry);


        const notSubsidized = studentSemData.notSubsidizedThisYear ?? false;
        const isCorpNonHireYes = student.corporateNonHire === '是';
        const isSubsidyApplicable = (studentSemData.regStatus === '已註冊' && !notSubsidized && !isCorpNonHireYes);

        if (isSubsidyApplicable) {
            studentSemData.adminFees = {
                docTranslation: isNewEntry ? (parseInt(form[`adminFee_docTranslation_${index}`]?.value) || 0) : 0,
                notarization: isNewEntry ? (parseInt(form[`adminFee_notarization_${index}`]?.value) || 0) : 0,
                healthCheck: isNewEntry ? (parseInt(form[`adminFee_healthCheck_${index}`]?.value) || 0) : 0,
                visa: isNewEntry ? (parseInt(form[`adminFee_visa_${index}`]?.value) || 0) : 0,
                total: parseInt(form[`adminFee_total_${index}`]?.value) || 0
            };
            studentSemData.airfare = isNewEntry ? (parseInt(form[`airfare_${index}`]?.value) || 0) : 0;
            studentSemData.tuition = parseInt(form[`tuition_${index}`]?.value) || 0;
            studentSemData.subsidyTotal = parseInt(form[`subsidyTotal_${index}`]?.value) || 0;
        } else {
            studentSemData.adminFees = { total: 0 };
            studentSemData.airfare = 0;
            studentSemData.tuition = 0;
            studentSemData.subsidyTotal = 0;
        }

        if (program && program.currentSemester === semester) {
            if (studentSemData.notSubsidizedThisYear) student.status = '當年未獲補助';
            else if (student.adminApproved === false) student.status = '已退回 (推薦)';
            else if (student.status !== '已畢業') student.status = studentSemData.regStatus;
        }

        if (regStatusSelect && !regStatusSelect.disabled) {
            studentSemData.submitted = isSubmitting;
            studentSemData.subsidyEditable = !isSubmitting;
            if (isSubmitting) {
                studentSemData.approved = null;
                studentSemData.rejectReason = '';
            }
        }

        if (studentSemData.regStatus === '不註冊' || studentSemData.regStatus === '特殊不註冊') {
            requiresNonRegEntry = true;
            studentSemData.nonRegSubmitted = false;
            studentSemData.nonRegApproved = null;
            studentSemData.nonRegEditable = true;
        }
    });

    console.log(`Subsidy data for ${programName} (${semester}) ${isSubmitting ? 'submitted' : 'saved'}.`);
    showModal("成功", `資料已${isSubmitting ? '提交審核' : '暫存'}。`, true, false, () => {
        renderSubsidyTableForProgram(programName);
        if (isSubmitting && requiresNonRegEntry) {
            showModal("提醒", "部分學生狀態為「不註冊」或「特殊不註冊」，請記得前往「不註冊情況登錄」頁面填寫原因。", true, false, () => {
                loadPage('reportNonRegistration');
            }, null, "前往登錄", "稍後處理");
        }
    }, null, "關閉");
}


window.submitSubsidyData = function (programName, semester) {
    saveSubsidyData(programName, semester, true);
}

// --- Review Subsidies / Non-Registration (Admin) ---
function renderReviewSubsidiesPage(container, type = 'subsidy') {
    const pageTitle = type === 'subsidy' ? '審核註冊與補助資料' : '審核不註冊/溢領資料';
    let html = `<h2>${pageTitle} (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;

    let programsToReview = [];
    Object.keys(SCHOOLS_DATA).forEach(schoolName => {
        SCHOOLS_DATA[schoolName]?.programs.forEach(program => {
            const semesterForReview = program.currentSemester; // Review based on program's current semester
            const hasReviewableStudents = students.some(s => {
                if (s.schoolName !== schoolName || s.programName !== program.name) return false;
                const semData = s.semesters ? s.semesters[semesterForReview] : null;
                if (!semData) return false;

                if (type === 'subsidy') { // Changed 'subsidyEditable' to 'subsidy' for clarity
                    return semData.submitted === true && semData.approved === null && semData.regStatus !== '準備註冊';
                } else { // 'nonRegistration'
                    return (semData.regStatus === '不註冊' || semData.regStatus === '特殊不註冊') &&
                        semData.nonRegSubmitted === true && semData.nonRegApproved === null;
                }
            });

            if (hasReviewableStudents) {
                programsToReview.push({ schoolName, programName: program.name, semester: semesterForReview });
            }
        });
    });

    programsToReview = [...new Map(programsToReview.map(item => [`${item.schoolName}-${item.programName}-${item.semester}`, item])).values()];


    if (programsToReview.length === 0) {
        html += `<p>目前沒有待審核的${type === 'subsidy' ? '註冊與補助' : '不註冊/溢領'}資料。</p>`;
        container.innerHTML = html;
        return;
    }

    html += `<p>以下專班已提交${type === 'subsidy' ? '註冊與補助' : '不註冊/溢領'}資料，請審核：</p>
             <table id="reviewSubsidyProgramsTable">
                <thead><tr><th>學校</th><th>專班</th><th>待審核學期</th><th>操作</th></tr></thead>
                <tbody>`;

    programsToReview.forEach(p => {
        html += `<tr>
                    <td>${p.schoolName}</td>
                    <td>${p.programName}</td>
                    <td>${p.semester}</td>
                    <td>
                        <button onclick="viewProgramSubsidyDetails('${p.schoolName}', '${p.programName}', '${p.semester}', '${type}')">檢視/審核</button>
                    </td>
                 </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

window.viewProgramSubsidyDetails = function (schoolName, programName, semester, type = 'subsidy') {
    const relevantStudents = students.filter(s => {
        if (s.schoolName !== schoolName || s.programName !== programName) return false;
        const semData = s.semesters ? s.semesters[semester] : null;
        if (!semData) return false;
        if (type === 'subsidy') {
            return semData.submitted === true && semData.approved === null && semData.regStatus !== '準備註冊';
        } else {
            return (semData.regStatus === '不註冊' || semData.regStatus === '特殊不註冊') &&
                semData.nonRegSubmitted === true && semData.nonRegApproved === null;
        }
    });

    if (relevantStudents.length === 0) {
        showModal("資訊", `專班 ${programName} (${semester}) 的 ${type === 'subsidy' ? '補助' : '不註冊'} 資料似乎已被處理或無待審項目。`, true, false, null, null, "關閉");
        renderReviewSubsidiesPage($('#contentArea'), type);
        return;
    }


    let modalContent = `<h3>審核: ${schoolName} - ${programName} (${semester}) - ${type === 'subsidy' ? '補助資料' : '不註冊資料'}</h3>`;

    if (type === 'subsidy') {
        modalContent += `<table class="registration-table review-table">
            <thead><tr><th>姓名</th><th>護照</th><th>註冊狀態</th><th>行政費</th><th>機票</th><th>學雜費</th><th>總補助</th></tr></thead><tbody>`;
        relevantStudents.forEach(s => {
            const semData = getStudentCurrentSemesterData(s.id, semester);
            modalContent += `<tr>
                <td>${s.engName}</td><td>${s.passportNo}</td><td>${semData.regStatus}</td>
                <td>${semData.adminFees?.total || 0}</td><td>${semData.airfare || 0}</td><td>${semData.tuition || 0}</td>
                <td><strong>${semData.subsidyTotal || 0}</strong></td>
            </tr>`;
        });
        modalContent += `</tbody></table>`;
    } else { // nonRegistration
        modalContent += `<table class="registration-table review-table">
            <thead><tr><th>姓名</th><th>護照</th><th>註冊狀態</th><th>原因</th><th>溢領費用</th></tr></thead><tbody>`;
        relevantStudents.forEach(s => {
            const semData = getStudentCurrentSemesterData(s.id, semester);
            let displayOverpaid = 0;
            if (semData.regStatus === '不註冊') {
                displayOverpaid = calculateOverpayment(s.id, semester);
            }

            modalContent += `<tr>
                <td>${s.engName}</td><td>${s.passportNo}</td><td>${semData.regStatus}</td>
                <td class="wrap-text">${semData.nonRegReason || '<span class="error-message">未填寫</span>'}</td>
                <td><strong>${displayOverpaid}</strong></td>
            </tr>`;
        });
        modalContent += `</tbody></table>`;
    }

    modalContent += `<div class="form-group" style="margin-top:15px;">
                        <label for="adminReviewNotes">審核意見/退回原因 (若選擇退回，此項必填):</label>
                        <textarea id="adminReviewNotes" style="width:95%; min-height:60px;"></textarea>
                     </div>`;

    showModal(type === 'subsidy' ? "審核註冊與補助" : "審核不註冊/溢領", modalContent, true, true,
        () => adminDecideSubsidy(schoolName, programName, semester, true, type),
        () => adminDecideSubsidy(schoolName, programName, semester, false, type),
        "通過",
        "退回"
    );
}

function calculateOverpayment(studentId, currentSemester) {
    const student = students.find(s => s.id === studentId);
    if (!student || !student.semesters) return 0;

    let totalOverpaid = 0;
    const currentSemIndex = SEMESTERS.indexOf(currentSemester);
    if (currentSemIndex === -1) return 0;

    for (const semKey in student.semesters) {
        const semIndex = SEMESTERS.indexOf(semKey);
        if (semIndex !== -1 && semIndex > currentSemIndex) { // Only past semesters
            totalOverpaid += (student.semesters[semKey].subsidyTotal || 0);
        }
    }
    console.log(`Calculated overpayment for ${studentId} up to ${currentSemester}: ${totalOverpaid}`);
    return totalOverpaid;
}

window.adminDownloadProgramData = function (schoolName, programName, semester, type) {
    showModal("通知", `${schoolName} - ${programName} (${semester}) 的 ${type === 'subsidy' ? '補助' : '不註冊'} 學校用印資料已下載。`);
}


function adminDecideSubsidy(schoolName, programName, semester, isApproved, type = 'subsidy') {
    const reviewNotes = $('#adminReviewNotes') ? $('#adminReviewNotes').value.trim() : '';
    if (!isApproved && !reviewNotes) {
        alert("退回操作必須填寫退回原因。");
        return;
    }

    const studentsInBatch = students.filter(s => {
        if (s.schoolName !== schoolName || s.programName !== programName) return false;
        const semData = s.semesters ? s.semesters[semester] : null;
        if (!semData) return false;
        if (type === 'subsidy') {
            return semData.submitted === true && semData.approved === null && semData.regStatus !== '準備註冊';
        } else {
            return (semData.regStatus === '不註冊' || semData.regStatus === '特殊不註冊') &&
                semData.nonRegSubmitted === true && semData.nonRegApproved === null;
        }
    });

    if (studentsInBatch.length === 0) {
        console.warn(`No students found matching review criteria for ${schoolName}-${programName}-${semester}-${type}.`);
        closeModal();
        showModal("警告", "找不到待審核的學生資料 (可能已被其他操作處理)。", true, false);
        renderReviewSubsidiesPage($('#contentArea'), type);
        return;
    }


    studentsInBatch.forEach(student => {
        const semData = getStudentCurrentSemesterData(student.id, semester);
        if (type === 'subsidy') {
            semData.approved = isApproved;
            semData.subsidyEditable = !isApproved;
            semData.rejectReason = isApproved ? '' : reviewNotes;
            console.log(`Subsidy decision for ${student.id} (${semester}): ${isApproved}, Reason: ${semData.rejectReason}`);
        } else if (type === 'nonRegistration') {
            semData.nonRegApproved = isApproved;
            semData.nonRegEditable = !isApproved;
            semData.nonRegRejectReason = isApproved ? '' : reviewNotes;
            if (semData.regStatus === '不註冊') {
                semData.overpaidAmount = calculateOverpayment(student.id, semester);
            } else {
                semData.overpaidAmount = 0;
            }
            console.log(`NonReg decision for ${student.id} (${semester}): ${isApproved}, Reason: ${semData.nonRegRejectReason}, Stored Overpaid: ${semData.overpaidAmount}`);
        }
    });

    console.log(`${type} data decision for ${programName} (${semester}): ${isApproved ? 'Approved' : 'Rejected'}. Reason: ${reviewNotes}`);
    closeModal();
    showModal("成功", `資料審核狀態已更新。`, true, false, () => {
        renderReviewSubsidiesPage($('#contentArea'), type);
    }, null, "關閉");
}

// --- Report Non-Registration ---
function renderReportNonRegistrationPage(container) {
    let html = `<h2>不註冊情況與溢領處理 (${userSchool}) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    html += `<p class="info-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
    if (!isWithinOpenTime('registerSubsidy')) {
        container.innerHTML = html;
        return;
    }

    const schoolPrograms = SCHOOLS_DATA[userSchool]?.programs.filter(p => (p.status || '進行中') === '進行中') || [];
    html += `<div class="form-group">
                <label for="selectProgramForNonReg" class="required-field-label">選擇有「不註冊」或「特殊不註冊」學生的專班:</label>
                <select id="selectProgramForNonReg" onchange="renderNonRegTableForProgram(this.value)">
                    <option value="">-- 請選擇專班 --</option>
                    ${schoolPrograms.map(p => `<option value="${p.name}">${p.name} (處理學期: ${p.currentSemester})</option>`).join('')}
                </select>
             </div>
             <div id="nonRegTableContainer"></div>`;
    container.innerHTML = html;
}

window.renderNonRegTableForProgram = function (programName) {
    const container = $('#nonRegTableContainer');
    if (!programName) { container.innerHTML = ''; return; }

    if (!isWithinOpenTime('registerSubsidy')) {
        container.innerHTML = `<p class="error-message">${getOpenTimeMessage('registerSubsidy')}</p>`;
        return;
    }

    const program = SCHOOLS_DATA[userSchool]?.programs.find(p => p.name === programName);
    if (!program || program.status === '已結束') {
        container.innerHTML = '<p class="error-message">選擇的專班無效或已結束。</p>';
        return;
    }
    const currentProgramSemester = program.currentSemester; // Semester being processed
    const nonRegStudents = students.filter(s => {
        if (s.schoolName !== userSchool || s.programName !== programName) return false;
        const semData = getStudentCurrentSemesterData(s.id, currentProgramSemester);
        return semData && (semData.regStatus === '不註冊' || semData.regStatus === '特殊不註冊');
    });

    if (nonRegStudents.length === 0) {
        container.innerHTML = `<p>專班 "${programName}" (${currentProgramSemester}) 目前沒有狀態為「不註冊」或「特殊不註冊」的學生需要處理。</p>`;
        return;
    }

    const needsProcessing = nonRegStudents.some(s => {
        const semData = getStudentCurrentSemesterData(s.id, currentProgramSemester);
        return semData && semData.nonRegEditable === true;
    });

    const isEditable = isWithinOpenTime('registerSubsidy') && needsProcessing;

    const representativeSemData = nonRegStudents.length > 0 ? getStudentCurrentSemesterData(nonRegStudents[0].id, currentProgramSemester) : {};
    const isOverallSubmitted = representativeSemData.nonRegSubmitted;
    const isOverallApproved = representativeSemData.nonRegApproved;

    let statusMessage = '';
    if (!isEditable && isOverallSubmitted && isOverallApproved === null) statusMessage = `<p class="status-submitted">此專班不註冊資料已提交，等待管理員審核。</p>`;
    else if (!isEditable && isOverallSubmitted && isOverallApproved === true) statusMessage = `<p class="status-approved">此專班不註冊資料已審核通過。</p>`;
    else if (isEditable && representativeSemData.nonRegApproved === false) {
        statusMessage = `<p class="status-rejected">此專班不註冊資料先前已被退回。原因: ${representativeSemData.nonRegRejectReason || '未提供'}. 請修改後重新提交。</p>`;
    } else if (isEditable) {
        statusMessage = `<p class="info-message">請填寫需要處理學生的不註冊原因。</p>`;
    } else {
        statusMessage = `<p class="info-message">此專班的不註冊資料不需處理或已完成審核。</p>`;
    }


    let tableHtml = `<h3>${programName} - ${currentProgramSemester} - 不註冊學生原因登錄</h3>${statusMessage}
        <form id="nonRegForm">
        <table class="registration-table">
        <thead>
            <tr><th>英文姓名</th><th>護照號碼</th><th>註冊狀態</th><th class="required-field-label">原因</th><th>溢領費用(系統計算)</th></tr>
        </thead>
        <tbody>`;

    nonRegStudents.forEach((student, index) => {
        const semData = getStudentCurrentSemesterData(student.id, currentProgramSemester);
        const studentNonRegEditable = isEditable && semData.nonRegEditable === true;

        let displayOverpaid = 0;
        if (semData.regStatus === '不註冊') {
            displayOverpaid = calculateOverpayment(student.id, currentProgramSemester);
        }

        tableHtml += `
            <tr data-student-id="${student.id}" data-student-index="${index}">
                <td>${student.engName}</td>
                <td>${student.passportNo}</td>
                <td><input type="text" value="${semData.regStatus}" readonly class="readonly-field"></td>
                <td><textarea name="nonRegReason_${index}" ${!studentNonRegEditable ? 'readonly class="status-readonly"' : ''} required rows="2">${semData.nonRegReason || ''}</textarea></td>
                <td><input type="number" name="overpaidAmount_${index}" value="${displayOverpaid}" readonly class="readonly-field"></td>
            </tr>`;
    });
    tableHtml += `</tbody></table>`;
    if (isEditable) {
        tableHtml += `<div class="page-actions">
                        <button type="button" onclick="saveNonRegData('${programName}', '${currentProgramSemester}', false)">暫存</button>
                        <button type="button" onclick="submitNonRegData('${programName}', '${currentProgramSemester}')">提交審核</button>
                      </div>`;
    } else if (isOverallSubmitted && isOverallApproved === true) {
        const signedReceiptUploaded = representativeSemData.signedNonRegReceiptUploaded;
        tableHtml += `<div class="page-actions">
                        <p>已審核通過。
                        <button type="button" onclick="downloadReceipt('${programName}', '${currentProgramSemester}', 'nonRegistration')" ${signedReceiptUploaded ? 'disabled' : ''}>下載溢領清冊</button>
                         ${!signedReceiptUploaded ? `並蓋章後
                        <label for="uploadSignedNonRegReceipt_${programName.replace(/\s+/g, '_')}" class="${signedReceiptUploaded ? 'disabled-label' : ''}">上傳檔案 (PDF):</label>
                        <input type="file" id="uploadSignedNonRegReceipt_${programName.replace(/\s+/g, '_')}" accept=".pdf" onchange="handleSignedReceiptUpload(this, '${programName}', '${currentProgramSemester}', 'nonRegistration')" ${signedReceiptUploaded ? 'disabled' : ''}>
                        <span id="uploadNonRegStatus_${programName.replace(/\s+/g, '_')}"></span>` : '<span class="status-approved">已上傳簽署檔案。</span>'}
                        </p>
                     </div>`;
    }
    tableHtml += `</form>`;
    container.innerHTML = tableHtml;
}

function saveNonRegData(programName, semester, isSubmitting) {
    const form = $('#nonRegForm');
    if (!form) return;

    if (!isWithinOpenTime('registerSubsidy')) {
        showModal("錯誤", `操作失敗: ${getOpenTimeMessage('registerSubsidy')}`, true, false);
        return;
    }

    let hasEmptyReason = false;
    if (isSubmitting) {
        const studentRows = form.querySelectorAll('tbody tr');
        studentRows.forEach(row => {
            const index = row.dataset.studentIndex;
            const textarea = form[`nonRegReason_${index}`];
            if (textarea && !textarea.readOnly && !textarea.value.trim()) {
                textarea.classList.add('input-error');
                hasEmptyReason = true;
            } else if (textarea) {
                textarea.classList.remove('input-error');
            }
        });

        if (hasEmptyReason) {
            showModal("錯誤", "提交失敗：請填寫所有需要處理學生的不註冊原因。", false, true);
            return;
        }
    }


    const studentRows = form.querySelectorAll('tbody tr');
    studentRows.forEach(row => {
        const studentId = row.dataset.studentId;
        const index = row.dataset.studentIndex;
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        const semData = getStudentCurrentSemesterData(studentId, semester);
        if (!semData) return;

        const textarea = form[`nonRegReason_${index}`];
        if (textarea && !textarea.readOnly) {
            semData.nonRegReason = textarea.value.trim();
            semData.nonRegEditable = !isSubmitting;
            semData.nonRegSubmitted = isSubmitting;
            if (isSubmitting) {
                semData.nonRegApproved = null;
                semData.nonRegRejectReason = '';
                if (semData.regStatus === '不註冊') {
                    semData.overpaidAmount = calculateOverpayment(student.id, semester);
                } else {
                    semData.overpaidAmount = 0;
                }
                console.log(`Stored overpaid amount for ${studentId} on submit: ${semData.overpaidAmount}`);
            }
        }
    });

    console.log(`Non-registration data for ${programName} (${semester}) ${isSubmitting ? 'submitted' : 'saved'}.`);
    showModal("成功", `不註冊資料已${isSubmitting ? '提交審核' : '暫存'}。`, true, false, () => {
        renderNonRegTableForProgram(programName);
    }, null, "關閉");
}
window.submitNonRegData = function (programName, semester) {
    saveNonRegData(programName, semester, true);
}

window.downloadReceipt = function (programName, semester, type) {
    const title = type === 'subsidy' ? '印領清冊' : '溢領清冊';
    showModal("下載模擬", `正在產生 ${title} for ${programName} (${semester}) 的 PDF 檔案...`, true, false);
    console.log(`Simulating PDF Download: ${title} for ${programName}, ${semester}`);
}

window.handleSignedReceiptUpload = function (fileInput, programName, semester, type) {
    const statusSpanId = type === 'subsidy' ? `uploadStatus_${programName.replace(/\s+/g, '_')}` : `uploadNonRegStatus_${programName.replace(/\s+/g, '_')}`;
    const statusSpan = $(`#${statusSpanId}`);
    if (!statusSpan) return;


    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;
        if (!fileName.toLowerCase().endsWith('.pdf')) {
            showModal("錯誤", "僅接受 PDF 檔案格式。", true, false);
            fileInput.value = '';
            statusSpan.textContent = '';
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            showModal("錯誤", `檔案 ${fileName} 過大，請限制在 10MB 以內。`, true, false);
            fileInput.value = '';
            statusSpan.textContent = '';
            return;
        }

        console.log(`Uploaded signed ${type} receipt: ${fileName} for ${programName}, ${semester}`);
        statusSpan.textContent = `檔案 ${fileName} 已上傳 (模擬).`;
        statusSpan.style.color = 'green';
        fileInput.disabled = true;
        const downloadButton = fileInput.form.querySelector(`button[onclick*="downloadReceipt"][onclick*="${type}"]`);
        if (downloadButton) downloadButton.disabled = true;
        if (fileInput.labels && fileInput.labels[0]) {
            fileInput.labels[0].classList.add('disabled-label');
        }

        const programStudents = students.filter(s => s.schoolName === userSchool && s.programName === programName);
        programStudents.forEach(student => {
            const semData = getStudentCurrentSemesterData(student.id, semester);
            if (semData) {
                if (type === 'subsidy' && semData.approved === true) semData.signedSubsidyReceiptUploaded = true;
                else if (type === 'nonRegistration' && semData.nonRegApproved === true) semData.signedNonRegReceiptUploaded = true;
            }
        });

        showModal("成功", `已簽署的${type === 'subsidy' ? '印領' : '溢領'}清冊 (${fileName}) 已上傳。本次流程結束。`, true, false);
    } else {
        statusSpan.textContent = '';
    }
}

// --- Export Receipts (Admin) ---
function renderExportReceiptsPage(container) {
    let html = `<h2>印領清冊匯出 (Excel) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>
        <div class="form-grid">
            <div class="form-group">
                <label for="exportType">匯出類型:</label>
                <select id="exportType">
                    <option value="subsidy">補助單</option>
                    <option value="overpayment">溢領單 (不註冊)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exportScope">匯出範圍:</label>
                <select id="exportScope" onchange="toggleExportOptions(this.value)">
                    <option value="program">按專班匯出</option>
                    <option value="school">按學校匯出</option>
                </select>
            </div>
             <div class="form-group" id="exportSchoolGroup">
                <label for="exportSchoolSelect">選擇學校:</label>
                <select id="exportSchoolSelect" onchange="updateExportProgramOptions()">
                     <option value="">-- 請選擇學校 --</option>
                    ${Object.keys(SCHOOLS_DATA).map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
            </div>
            <div class="form-group" id="exportProgramGroup">
                <label for="exportProgramSelect">選擇專班:</label>
                <select id="exportProgramSelect">
                    <option value="">-- 先選擇學校 --</option>
                </select>
            </div>
             <div class="form-group">
                <label for="exportSemesterSelect">選擇學期 (清冊資料的學期):</label>
                 <select id="exportSemesterSelect">
                     <option value="">-- 請選擇學期 --</option>
                    ${SEMESTERS.map(s => `<option value="${s}">${s}</option>`).join('')}
                 </select>
            </div>
        </div>
        <button onclick="performExportReceipts()">匯出 Excel (.xlsx)</button>`;
    container.innerHTML = html;
    toggleExportOptions($('#exportScope').value);
}

window.toggleExportOptions = function (scope) {
    $('#exportProgramGroup').style.display = scope === 'program' ? 'block' : 'none';
    $('#exportSchoolGroup').style.display = 'block';

    if (scope === 'school') {
        const programSelect = $('#exportProgramSelect');
        if (programSelect) programSelect.value = '';
    }
    updateExportProgramOptions();
}

function updateExportProgramOptions() {
    const school = $('#exportSchoolSelect').value;
    const programSelect = $('#exportProgramSelect');
    if (!programSelect) return;

    let options = '<option value="">-- 請選擇專班 --</option>';
    if (school && SCHOOLS_DATA[school] && SCHOOLS_DATA[school].programs) {
        SCHOOLS_DATA[school].programs.forEach(p => {
            options += `<option value="${p.name}">${p.name}</option>`;
        });
    } else if (!school) {
        options = '<option value="">-- 先選擇學校 --</option>';
    } else {
        options = '<option value="">-- 該校無專班 --</option>';
    }
    programSelect.innerHTML = options;
}

function performExportReceipts() {
    const type = $('#exportType').value;
    const scope = $('#exportScope').value;
    const school = $('#exportSchoolSelect').value;
    const programNameFilter = (scope === 'program') ? $('#exportProgramSelect').value : null;
    const semesterForExport = $('#exportSemesterSelect').value;

    if (!school) { showModal("錯誤", "請選擇學校。", true, false); return; }
    if (scope === 'program' && !programNameFilter) { showModal("錯誤", "請選擇專班。", true, false); return; }
    if (!semesterForExport) { showModal("錯誤", "請選擇學期。", true, false); return; }

    console.log(`Exporting ${type} receipts for Scope: ${scope}, School: ${school}, Program: ${programNameFilter || 'N/A'}, Semester: ${semesterForExport}`);

    let dataToExport = [];
    let headers = [];

    if (type === 'subsidy') {
        headers = ["學校", "專班", "學期", "英文姓名", "護照號碼", "註冊狀態", "行政費總額", "機票", "學雜費", "補助合計"];
        students.forEach(s => {
            const semData = s.semesters ? s.semesters[semesterForExport] : null;
            const schoolMatch = s.schoolName === school;
            const programMatch = !programNameFilter || s.programName === programNameFilter;
            const semesterDataExists = !!semData;
            const statusMatch = semData && semData.approved === true && semData.regStatus === '已註冊';

            if (schoolMatch && programMatch && semesterDataExists && statusMatch) {
                dataToExport.push([
                    s.schoolName, s.programName, semesterForExport, s.engName, s.passportNo, semData.regStatus,
                    semData.adminFees?.total || 0, semData.airfare || 0, semData.tuition || 0, semData.subsidyTotal || 0
                ]);
            }
        });
    } else { // overpayment
        headers = ["學校", "專班", "學期", "英文姓名", "護照號碼", "註冊狀態", "不註冊原因", "溢領費用"];
        students.forEach(s => {
            const semData = s.semesters ? s.semesters[semesterForExport] : null;
            const schoolMatch = s.schoolName === school;
            const programMatch = !programNameFilter || s.programName === programNameFilter;
            const semesterDataExists = !!semData;
            const statusMatch = semData && semData.nonRegApproved === true && semData.regStatus === '不註冊';

            if (schoolMatch && programMatch && semesterDataExists && statusMatch) {
                const overpaid = semData.overpaidAmount || 0; // Use stored amount
                dataToExport.push([
                    s.schoolName, s.programName, semesterForExport, s.engName, s.passportNo, semData.regStatus,
                    semData.nonRegReason || '', overpaid
                ]);
            }
        });
    }

    if (dataToExport.length === 0) {
        showModal("提示", "沒有符合條件的資料可供匯出。", true, false);
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n"
        + dataToExport.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${school}_${programNameFilter || 'AllPrograms'}_${semesterForExport}_${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showModal("成功", `已開始下載 ${type === 'subsidy' ? '補助' : '溢領'} 清冊資料 (模擬 CSV 匯出)。`);
}


// --- Manage Open Times (Admin) ---
function renderManageOpenTimesPage(container) {
    let html = `<h2>設定學校編輯的「開放時間」</h2>
        <p>管理員可個別控制以下功能的開啟時段 (設定開始與結束日期)。</p>
        <form id="openTimesForm">
            <div class="open-time-setting">
                <label>提交推薦學生名冊:</label>
                <div class="date-range">
                    <label for="ot_rec_start">開始:</label> <input type="date" id="ot_rec_start" value="${openTimes.recommendStudents.start}">
                    <label for="ot_rec_end">結束:</label> <input type="date" id="ot_rec_end" value="${openTimes.recommendStudents.end}">
                </div>
            </div>
             <div class="open-time-setting">
                <label>註冊/補助/不註冊登錄:</label>
                 <div class="date-range">
                    <label for="ot_reg_start">開始:</label> <input type="date" id="ot_reg_start" value="${openTimes.registerSubsidy.start}">
                    <label for="ot_reg_end">結束:</label> <input type="date" id="ot_reg_end" value="${openTimes.registerSubsidy.end}">
                </div>
            </div>
            <div class="open-time-setting">
                <label>華語文能力等級調查:</label>
                 <div class="date-range">
                    <label for="ot_chn_start">開始:</label> <input type="date" id="ot_chn_start" value="${openTimes.chineseSurvey.start}">
                    <label for="ot_chn_end">結束:</label> <input type="date" id="ot_chn_end" value="${openTimes.chineseSurvey.end}">
                </div>
            </div>
            <button type="button" onclick="saveOpenTimes()">儲存設定</button>
        </form>`;
    container.innerHTML = html;
}

function saveOpenTimes() {
    const recStart = $('#ot_rec_start').value;
    const recEnd = $('#ot_rec_end').value;
    const regStart = $('#ot_reg_start').value;
    const regEnd = $('#ot_reg_end').value;
    const chnStart = $('#ot_chn_start').value;
    const chnEnd = $('#ot_chn_end').value;

    if ((recStart && recEnd && recEnd < recStart) ||
        (regStart && regEnd && regEnd < regStart) ||
        (chnStart && chnEnd && chnEnd < chnStart)) {
        showModal("錯誤", "結束日期不能早於開始日期。", true, false);
        return;
    }

    openTimes.recommendStudents = { start: recStart, end: recEnd };
    openTimes.registerSubsidy = { start: regStart, end: regEnd };
    openTimes.chineseSurvey = { start: chnStart, end: chnEnd };

    console.log("Open times updated:", openTimes);
    showModal("成功", "開放時間設定已更新。", true, false);
}

// --- Chinese Survey (School Admin) ---
function renderChineseSurveyPage(container) {
    let html = `<h2>華語文能力調查 (${userSchool}) (系統目前學期: ${SYSTEM_CURRENT_SEMESTER})</h2>`;
    html += `<p class="info-message">${getOpenTimeMessage('chineseSurvey')}</p>`;
    if (!isWithinOpenTime('chineseSurvey')) {
        container.innerHTML = html;
        return;
    }

    const schoolPrograms = SCHOOLS_DATA[userSchool]?.programs.filter(p => (p.status || '進行中') === '進行中') || [];
    html += `<div class="form-group">
                <label for="selectProgramForChineseSurvey" class="required-field-label">選擇專班:</label>
                <select id="selectProgramForChineseSurvey" onchange="renderChineseSurveyTable(this.value)">
                    <option value="">-- 請選擇專班 --</option>
                    ${schoolPrograms.map(p => `<option value="${p.name}">${p.name} (調查學期: ${p.currentSemester})</option>`).join('')}
                </select>
             </div>
             <div id="chineseSurveyTableContainer"></div>`;
    container.innerHTML = html;
}

window.renderChineseSurveyTable = function (programName) {
    const container = $('#chineseSurveyTableContainer');
    if (!programName) { container.innerHTML = ''; return; }

    if (!isWithinOpenTime('chineseSurvey')) {
        container.innerHTML = `<p class="error-message">${getOpenTimeMessage('chineseSurvey')}</p>`;
        return;
    }

    const program = SCHOOLS_DATA[userSchool]?.programs.find(p => p.name === programName);
    if (!program || program.status === '已結束') { container.innerHTML = '<p class="error-message">選擇的專班無效或已結束。</p>'; return; }

    const surveySemester = program.currentSemester; // Survey for the program's current semester
    const programStudents = students.filter(s => {
        if (s.schoolName !== userSchool || s.programName !== programName) return false;
        const semData = getStudentCurrentSemesterData(s.id, surveySemester);
        return semData && (semData.regStatus === '已註冊' || semData.regStatus === '準備註冊');
    });

    if (programStudents.length === 0) {
        container.innerHTML = `<p>專班 "${programName}" (${surveySemester}) 目前沒有符合條件的學生可填寫華語文能力。</p>`;
        return;
    }
    const surveySubmittedKey = `chineseSurveySubmitted_${surveySemester}`; // Key per semester
    const isSubmitted = program[surveySubmittedKey] === true;

    let tableHtml = `<h3>${programName} - ${surveySemester} - 華語文能力調查</h3>`;
    if (isSubmitted) {
        tableHtml += `<p class="status-submitted">此專班此學期的華語文能力調查已提交。</p>`;
    } else {
        tableHtml += `<p class="info-message">請填寫學生的華語文能力等級。</p>`;
    }


    tableHtml += `<form id="chineseSurveyForm">
        <table class="registration-table">
        <thead><tr><th>英文姓名</th><th>護照號碼</th><th>華語文能力等級</th></tr></thead>
        <tbody>`;
    programStudents.forEach((student, index) => {
        tableHtml += `
            <tr data-student-id="${student.id}">
                <td>${student.engName}</td>
                <td>${student.passportNo}</td>
                <td><input type="text" name="chineseLevel_${index}" value="${student.chineseLevel || ''}" ${isSubmitted ? 'readonly class="status-readonly"' : ''}></td>
            </tr>`;
    });
    tableHtml += `</tbody></table>`;
    if (!isSubmitted && isWithinOpenTime('chineseSurvey')) {
        tableHtml += `<div class="page-actions"><button type="button" onclick="submitChineseSurvey('${programName}', '${surveySemester}')">提交調查結果</button></div>`;
    }
    tableHtml += `</form>`;
    container.innerHTML = tableHtml;
}

function submitChineseSurvey(programName, semester) {
    if (!isWithinOpenTime('chineseSurvey')) {
        showModal("錯誤", `操作失敗: ${getOpenTimeMessage('chineseSurvey')}`, true, false);
        return;
    }

    const form = $('#chineseSurveyForm');
    const studentRows = form.querySelectorAll('tbody tr');
    const surveySubmittedKey = `chineseSurveySubmitted_${semester}`;


    studentRows.forEach((row, index) => {
        const studentId = row.dataset.studentId;
        const studentIdx = students.findIndex(s => s.id === studentId);
        if (studentIdx !== -1) {
            students[studentIdx].chineseLevel = form[`chineseLevel_${index}`]?.value || '';
        }
    });

    const program = SCHOOLS_DATA[userSchool]?.programs.find(p => p.name === programName);
    if (program) {
        program[surveySubmittedKey] = true;
    }


    console.log(`Chinese survey for ${programName} (${semester}) submitted.`);
    showModal("成功", "華語文能力調查結果已提交。", true, false, () => {
        renderChineseSurveyTable(programName);
    }, null, "關閉");
}

// --- Admin Actions: Mark Not Subsidized / Re-Evaluate ---
window.markNotSubsidized = function (studentId, schoolName, programName) {
    const studentIdx = students.findIndex(s => s.id === studentId);
    if (studentIdx === -1) return;
    const student = students[studentIdx];

    if (student.corporateNonHire === '是') {
        showModal("錯誤", "企業不錄取的學生無法標記為「當年未獲補助」。", true, false);
        return;
    }

    showModal("確認操作", `確定要將學生 ${student.engName} 標記為「當年未獲補助」嗎？<br>該學生將有連續兩個學期無法獲得任何補助。`, true, true, () => {
        closeModal(); // Close the confirmation modal first
        student.status = '當年未獲補助';
        // student.notSubsidizedCounter = 2; // This will be set by markStudentSemestersAsNotSubsidized

        const program = getProgramDetails(student.schoolName, student.programName);
        const semesterToMarkFrom = program ? program.currentSemester : SYSTEM_CURRENT_SEMESTER;

        markStudentSemestersAsNotSubsidized(student, semesterToMarkFrom, 2);

        console.log(`Student ${student.engName} marked as '當年未獲補助'. Counter: ${student.notSubsidizedCounter}`);
        renderProgramDetailsPage($('#contentArea'), schoolName, programName, true); // Re-render the page
        showModal("成功", `學生 ${student.engName} 已標記為「當年未獲補助」。`, true, false); // Show success modal
    }, null, "確定標記", "取消");
}

function markStudentSemestersAsNotSubsidized(student, startSemester, count) {
    if (!student || !startSemester || count <= 0) return;

    const startSemIdx = SEMESTERS.indexOf(startSemester);
    if (startSemIdx === -1) {
        console.error(`Start semester ${startSemester} not found in SEMESTERS list.`);
        return;
    }

    for (let i = 0; i < count; i++) {
        const targetSemIdx = startSemIdx - i; // Iterating towards more recent semesters
        if (targetSemIdx >= 0 && targetSemIdx < SEMESTERS.length) {
            const semKey = SEMESTERS[targetSemIdx];
            const semData = getStudentCurrentSemesterData(student.id, semKey); // Ensures data exists
            if (semData) {
                console.log(`Marking student ${student.id} as Not Subsidized for semester ${semKey}`);
                semData.regStatus = '當年未獲補助';
                semData.subsidyEditable = false;
                semData.submitted = true; // Mark as submitted/processed from school side
                semData.approved = true;  // Mark as approved (as in, admin acknowledges this status)
                semData.notSubsidizedThisYear = true;
                semData.adminFees = { total: 0 };
                semData.airfare = 0;
                semData.tuition = 0;
                semData.subsidyTotal = 0;
                semData.nonRegReason = '';
                semData.nonRegSubmitted = false;
                semData.nonRegApproved = null;
                semData.nonRegEditable = false;
                semData.nonRegRejectReason = '';
                semData.overpaidAmount = 0;
            }
        } else {
            console.warn(`Semester index out of bounds (${targetSemIdx}) when marking non-subsidized for student ${student.id}.`);
            break;
        }
    }
    student.notSubsidizedCounter = count;
}

window.reEvaluateSubsidy = function (studentId, schoolName, programName) {
    const studentIdx = students.findIndex(s => s.id === studentId);
    if (studentIdx === -1) return;
    const student = students[studentIdx];

    showModal("確認操作", `確定要為學生 ${student.engName} 解除「當年未獲補助」狀態嗎？<br>相關學期狀態將重設為「準備註冊」，補助計數器將歸零。`, true, true, () => {
        closeModal(); // Close the confirmation modal first

        student.status = '準備註冊'; // Update main status
        student.notSubsidizedCounter = 0;

        for (const semKey in student.semesters) {
            const semData = student.semesters[semKey];
            // Condition for reset: if it was marked as not subsidized this year, or if its status is '當年未獲補助'
            if (semData.notSubsidizedThisYear === true || semData.regStatus === '當年未獲補助') {
                console.log(`Re-evaluating subsidy for student ${student.id}, semester ${semKey}. Resetting status.`);
                semData.notSubsidizedThisYear = false;
                semData.subsidyEditable = true;
                semData.regStatus = '準備註冊';
                semData.submitted = false;
                semData.approved = null;
                semData.rejectReason = ''; // Clear previous rejection if any
                semData.adminFees = { docTranslation: 0, notarization: 0, healthCheck: 0, visa: 0, total: 0 };
                semData.airfare = 0;
                semData.tuition = 0;
                semData.subsidyTotal = 0;
                // Also reset non-registration fields for this semester if they were set due to '當年未獲補助'
                semData.nonRegReason = '';
                semData.overpaidAmount = 0;
                semData.nonRegSubmitted = false;
                semData.nonRegApproved = null;
                semData.nonRegEditable = true; // Make it editable again if it becomes '不註冊'
                semData.nonRegRejectReason = '';
            }
        }

        console.log(`Student ${student.engName} re-evaluated for subsidy. Status reset.`);
        renderProgramDetailsPage($('#contentArea'), schoolName, programName, true); // Re-render the page
        showModal("成功", `學生 ${student.engName} 的「當年未獲補助」狀態已解除。`, true, false); // Show success modal
    }, null, "確定解除", "取消");
};


// --- Semester Stage Management ---
window.batchProgramAction = function (action) {
    const selectedCheckboxes = $all('.program-checkbox:checked');
    if (selectedCheckboxes.length === 0) {
        showModal("提示", "請至少選擇一個專班進行操作。", true, false);
        return;
    }

    let affectedPrograms = [];
    selectedCheckboxes.forEach(cb => {
        affectedPrograms.push({ school: cb.dataset.school, programName: cb.dataset.program });
    });

    if (action === 'endProgram') {
        showModal("確認操作", `確定要將選取的 ${affectedPrograms.length} 個專班標記為「已結束」嗎？<br>所有相關學生狀態將改為「已畢業」。`, true, true, () => {
            closeModal();
            affectedPrograms.forEach(item => {
                const program = getProgramDetails(item.school, item.programName);
                if (program) {
                    program.status = '已結束';
                    const finalSemester = program.currentSemester;
                    students.filter(s => s.schoolName === item.school && s.programName === item.programName).forEach(stud => {
                        stud.status = '已畢業';
                        const studSemData = getStudentCurrentSemesterData(stud.id, finalSemester);
                        if (studSemData) {
                            studSemData.regStatus = '已畢業';
                            studSemData.subsidyEditable = false;
                            studSemData.submitted = true;
                            studSemData.approved = true;
                        }
                    });
                    console.log(`Program ${item.programName} ended.`);
                } else {
                    console.warn(`Program not found during 'endProgram': ${item.school} - ${item.programName}`);
                }
            });
            renderManageProgramsPage($('#contentArea'));
            showModal("成功", "選取的專班已標記為結束。", true, false);
        }, null, "確定結束", "取消");

    } else if (action === 'newSemester') {
        // This action should ideally advance the SYSTEM_CURRENT_SEMESTER and update ALL active programs.
        // For prototype simplicity, we will advance selected programs, but this might lead to inconsistencies
        // if not all active programs are selected. A real system would have a global "Advance System Semester" function.

        const currentSystemSemIdx = SEMESTERS.indexOf(SYSTEM_CURRENT_SEMESTER);
        if (currentSystemSemIdx <= 0) {
            showModal("提示", `系統已在最新學期 (${SYSTEM_CURRENT_SEMESTER})，無法再推進。`, true, false);
            return;
        }
        const nextSystemSemester = SEMESTERS[currentSystemSemIdx - 1];

        showModal("確認操作", `確定要將選取的 ${affectedPrograms.length} 個專班推進至學期 ${nextSystemSemester} 嗎？<br>注意：此操作會將這些專班的「目前學期」更新。`, true, true, () => {
            closeModal();
            let programsAdvancedCount = 0;

            affectedPrograms.forEach(item => {
                const program = getProgramDetails(item.school, item.programName);
                if (program && (program.status || '進行中') === '進行中' && program.currentSemester === SYSTEM_CURRENT_SEMESTER) {
                    program.currentSemester = nextSystemSemester; // Update program's current semester
                    programsAdvancedCount++;
                    console.log(`Program ${program.name} advanced to semester ${nextSystemSemester}.`);

                    students.filter(s => s.schoolName === item.school && s.programName === item.programName && s.status !== '已畢業').forEach(stud => {
                        const newSemData = getStudentCurrentSemesterData(stud.id, nextSystemSemester);
                        newSemData.isNewSemesterEntry = false; // Not a new entry for the program overall

                        if (stud.notSubsidizedCounter && stud.notSubsidizedCounter > 0) {
                            stud.notSubsidizedCounter--;
                            console.log(`Student ${stud.id} entering new semester ${nextSystemSemester}. Counter remaining: ${stud.notSubsidizedCounter}`);
                            if (stud.notSubsidizedCounter > 0) {
                                markStudentSemestersAsNotSubsidized(stud, nextSystemSemester, 1); // Mark only the current new semester
                                stud.status = '當年未獲補助'; // Update student's main status for consistency
                            } else { // Became eligible
                                newSemData.notSubsidizedThisYear = false;
                                newSemData.regStatus = '準備註冊';
                                newSemData.subsidyEditable = true;
                                stud.status = '準備註冊';
                            }
                        } else if (stud.status !== '不註冊' && stud.status !== '特殊不註冊' && stud.status !== '已退回 (推薦)' && stud.status !== '當年未獲補助') {
                            newSemData.notSubsidizedThisYear = false;
                            newSemData.regStatus = '準備註冊';
                            newSemData.subsidyEditable = true;
                            if (stud.status !== '已註冊') stud.status = '準備註冊'; // if was '準備註冊', keep it. if other, set to '準備註冊'
                        } else { // Carry forward non-reg/rejected/not-subsidized status
                            newSemData.regStatus = stud.status; // e.g. '不註冊', '當年未獲補助'
                            newSemData.subsidyEditable = false; // Generally not editable initially
                            if (stud.status === '不註冊' || stud.status === '特殊不註冊') {
                                newSemData.nonRegSubmitted = false;
                                newSemData.nonRegApproved = null;
                                newSemData.nonRegEditable = true;
                                newSemData.overpaidAmount = 0;
                            }
                            if (stud.status === '當年未獲補助') {
                                newSemData.notSubsidizedThisYear = true; // Ensure this is set for the new semester
                            }
                        }
                        // Reset common fields for new semester data
                        newSemData.submitted = false;
                        newSemData.approved = null;
                        newSemData.adminFees = { total: 0 };
                        newSemData.airfare = 0;
                        newSemData.tuition = 0;
                        newSemData.subsidyTotal = 0;
                    });
                } else if (program && program.currentSemester !== SYSTEM_CURRENT_SEMESTER) {
                    console.warn(`Program ${program.name} (current: ${program.currentSemester}) not aligned with system semester ${SYSTEM_CURRENT_SEMESTER}. Not advanced by this action.`);
                } else if (program) {
                    console.warn(`Program ${program.name} is not '進行中'. Not advanced.`);
                }
            });
            // IMPORTANT: In a real system, after processing, you'd update the global SYSTEM_CURRENT_SEMESTER.
            // For prototype, this is skipped to allow re-running on 113-2.
            // If this were a real "next system semester" action, you'd do:
            // SYSTEM_CURRENT_SEMESTER = nextSystemSemester; // (but this would change behavior for next run)

            renderManageProgramsPage($('#contentArea'));
            showModal("完成", `${programsAdvancedCount} 個專班已更新其目前學期至 ${nextSystemSemester}。`, true, false);
        }, null, "確定推進", "取消");
    }
}

// --- INITIALIZATION & LOGIN/LOGOUT ---
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = $('#loginForm');
    const logoutButton = $('#logoutButton');
    const modal = $('#modal');
    const modalCloseButton = modal ? modal.querySelector('.close-button') : null;


    if (loginForm) { // Login page
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = $('#username').value;
            const password = $('#password').value;
            const role = $('#role').value;
            const loginError = $('#loginError');

            if (DEMO_USERS[username] && DEMO_USERS[username].password === password && DEMO_USERS[username].role === role) {
                localStorage.setItem('currentUser', username);
                localStorage.setItem('currentRole', role);
                if (role === 'school_admin') {
                    localStorage.setItem('userSchool', DEMO_USERS[username].school);
                } else {
                    localStorage.removeItem('userSchool');
                }
                window.location.href = 'app.html';
            } else {
                loginError.textContent = '帳號、密碼或角色錯誤。';
                loginError.style.display = 'block';
            }
        });
    } else if (logoutButton) { // App page
        currentUser = localStorage.getItem('currentUser');
        currentRole = localStorage.getItem('currentRole');
        userSchool = localStorage.getItem('userSchool');

        if (!currentUser || !currentRole) {
            window.location.href = 'index.html';
            return;
        }

        $('#currentUser').textContent = currentUser;
        $('#currentRole').textContent = currentRole === 'admin' ? '管理員' : `學校行政 (${userSchool || ''})`;

        renderSidebar();
        if (currentRole === 'admin') loadPage('adminDashboard');
        else loadPage('schoolDashboard');

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentRole');
            localStorage.removeItem('userSchool');
            window.location.href = 'index.html';
        });

        if (modalCloseButton) modalCloseButton.onclick = closeModal;
        if (modal) {
            modal.addEventListener('click', function (event) {
                if (event.target === modal) closeModal();
            });
        }
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal && modal.style.display === 'block') closeModal();
        });
    }
});

// Add necessary styles dynamically
const style = document.createElement('style');
style.textContent = `
    .input-error { border: 2px solid red !important; background-color: #fff0f0; }
    textarea.input-error { border: 2px solid red !important; }
    .program-info-box { background-color: #eef; border: 1px solid #ccf; border-radius: 5px; padding: 10px 15px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 5px 15px; }
    .program-info-box p { margin: 5px 0; }
    .program-info-box strong { margin-right: 5px;}
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px 25px; align-items: start; }
    .form-group label { margin-bottom: 3px; }
    .form-group input[type="radio"] + label { margin-right: 15px; font-weight: normal; display: inline-block; margin-bottom: 0; }
    .open-time-setting { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
    .open-time-setting > label { font-weight: bold; display: block; margin-bottom: 10px; }
    .date-range label { margin-right: 5px; margin-left: 10px;}
    .date-range input[type="date"] { padding: 5px; }
    .registration-table.review-table td, .registration-table.review-table th { padding: 8px; }
    button.link-button { background: none; border: none; color: #007bff; text-decoration: underline; cursor: pointer; padding: 0 5px;}
    .filter-section.program-filters select, .filter-section.program-filters input[type="search"], .filter-section.program-filters button { margin-right: 10px;}
    .filter-section.program-filters input[type="search"] { padding: 5px 8px; width: 200px; }
    #studentDetailForm .form-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    #studentDetailForm h4 { margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;}
    .review-group { border: 1px solid #ccc; margin-bottom: 20px; border-radius: 5px; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .review-group h3, .review-group h4 { background-color: #e9ecef; padding: 10px 15px; margin-top: 0; margin-bottom: 0; border-bottom: 1px solid #ccc; font-size: 1.1em; }
    .review-group h3 { border-top-left-radius: 5px; border-top-right-radius: 5px; font-size: 1.2em; color: #0056b3; }
    .review-group .program-group { margin: 15px; border: 1px dashed #aaa; background-color: #fdfdfd; border-radius: 4px; padding-bottom: 10px; }
    .review-group .program-group h4 { background-color: #f8f9fa; font-size: 1.05em; border-top-left-radius: 4px; border-top-right-radius: 4px; color: #333; }
    .program-actions { padding: 10px 15px; border-bottom: 1px dashed #aaa; background-color: #f8f9fa; }
    .program-actions button { margin-right: 8px; padding: 5px 10px; font-size: 0.85em; }
    .reviewStudentsTable-inner { margin: 0; width: 100%; border: none; box-shadow: none; min-width: inherit; table-layout: fixed; }
    .reviewStudentsTable-inner th, .reviewStudentsTable-inner td { font-size: 0.85em; padding: 8px 10px; white-space: normal; word-break: break-word; border-bottom: 1px solid #eee; border-right: 1px solid #eee; vertical-align: middle; }
    .reviewStudentsTable-inner thead th { background-color: #f1f1f1; color: #333; position: static; text-align: center; vertical-align: middle;}
    .reviewStudentsTable-inner tbody tr:nth-child(even) { background-color: #fff; }
    .reviewStudentsTable-inner tbody tr:hover { background-color: #e9f5ff; }
    .reviewStudentsTable-inner th:nth-child(1), .reviewStudentsTable-inner td:nth-child(1) { width: 14%; } /* Name */
    .reviewStudentsTable-inner th:nth-child(2), .reviewStudentsTable-inner td:nth-child(2) { width: 11%; } /* Passport */
    .reviewStudentsTable-inner th:nth-child(3), .reviewStudentsTable-inner td:nth-child(3) { width: 9%; }  /* DOB */
    .reviewStudentsTable-inner th:nth-child(4), .reviewStudentsTable-inner td:nth-child(4) { width: 7%; font-size: 0.75em; line-height: 1.1; text-align: center;} /* CorpNonHire */
    .reviewStudentsTable-inner th:nth-child(5), .reviewStudentsTable-inner td:nth-child(5) { width: 16%; } /* Local School */
    .reviewStudentsTable-inner th:nth-child(6), .reviewStudentsTable-inner td:nth-child(6) { width: 18%; } /* Notes */
    .reviewStudentsTable-inner th:nth-child(7), .reviewStudentsTable-inner td:nth-child(7) { width: 25%; text-align: center;} /* Actions */
    .reviewStudentsTable-inner td button { padding: 4px 8px; font-size: 0.8em; margin: 2px;}
    .highlight-warning { color: #856404; background-color: #fff3cd; padding: 2px 4px; border-radius: 3px; font-weight: bold; border: 1px dashed #ffeeba; }
    label.disabled-label { color: #6c757d; cursor: not-allowed; text-decoration: line-through; }
    span.corp-non-hire-note { color: #dc3545; font-weight: bold; font-size: 0.9em; margin-left: 5px; display: inline-block; }
    span.corp-non-hire-tag { background-color: #f8d7da; color: #721c24; padding: 1px 4px; border-radius: 3px; font-size: 0.8em; margin-left: 5px; white-space: nowrap;}
`;
document.head.appendChild(style);