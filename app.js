/**
 * NexusLink Pro - Core Application & Form Automation Engine
 * MoneyRobot-Class Autonomous SEO Matrix
 */

const state = {
    targetUrl: '',
    seedKeyword: '',
    keywords: [],
    targetSites: [],
    payloads: [],
    identity: {
        email: '',
        username: '',
        password: '',
        bio: ''
    }
};

// Curated High-DA Platform Lists
const CURATED_LISTS = {
    forums: [
        "https://xenforo.com/community/",
        "https://forum.webmastertalk.com",
        "https://discourse.mozilla.org",
        "https://community.letsencrypt.org",
        "https://discuss.python.org",
        "https://forum.gitlab.com",
        "https://community.brave.com",
        "https://community.cloudflare.com",
        "https://forum.xda-developers.com",
        "https://community.postman.com",
        "https://discourse.threejs.org",
        "https://discuss.elastic.co",
        "https://forum.djangoproject.com",
        "https://community.atlassian.com",
        "https://community.snowflake.com"
    ],
    web2: [
        "https://medium.com",
        "https://dev.to",
        "https://hashnode.com",
        "https://wordpress.com",
        "https://github.com",
        "https://gitlab.com",
        "https://tumblr.com",
        "https://wix.com",
        "https://weebly.com",
        "https://substack.com",
        "https://livejournal.com",
        "https://blogger.com",
        "https://telegra.ph",
        "https://notion.site",
        "https://gitbook.io"
    ],
    directories: [
        "https://botw.org",
        "https://about.me",
        "https://linktr.ee",
        "https://bio.link",
        "https://bento.me",
        "https://carrd.co",
        "https://behance.net",
        "https://dribbble.com",
        "https://crunchbase.com",
        "https://producthunt.com",
        "https://yellowpages.com",
        "https://hotfrog.com"
    ]
};

// DOM Selectors
const DOM = {
    targetUrl: document.getElementById('targetUrl'),
    seedKeyword: document.getElementById('seedKeyword'),
    keywordList: document.getElementById('keywordList'),
    kwCountBadge: document.getElementById('kwCountBadge'),
    
    accountEmail: document.getElementById('accountEmail'),
    accountUser: document.getElementById('accountUser'),
    accountPass: document.getElementById('accountPass'),
    spintaxBio: document.getElementById('spintaxBio'),
    
    targetSitesInput: document.getElementById('targetSitesInput'),
    fileInput: document.getElementById('fileInput'),
    dropZone: document.getElementById('dropZone'),
    
    btnGenerateKw: document.getElementById('btnGenerateKw'),
    btnExtractKw: document.getElementById('btnExtractKw'),
    btnGenPass: document.getElementById('btnGenPass'),
    btnGenSpintax: document.getElementById('btnGenSpintax'),
    btnLoadDemoCampaign: document.getElementById('btnLoadDemoCampaign'),
    
    btnLoadForums: document.getElementById('btnLoadForums'),
    btnLoadWeb2: document.getElementById('btnLoadWeb2'),
    btnLoadDirectories: document.getElementById('btnLoadDirectories'),
    
    btnBuildCampaign: document.getElementById('btnBuildCampaign'),
    btnPushToIndexer: document.getElementById('btnPushToIndexer'),
    btnExportPayloads: document.getElementById('btnExportPayloads'),
    btnCopyAllLinks: document.getElementById('btnCopyAllLinks'),
    btnClearTerminal: document.getElementById('btnClearTerminal'),
    
    autoFillBookmarklet: document.getElementById('autoFillBookmarklet'),
    terminalOutput: document.getElementById('terminalOutput'),
    liveStatusBadge: document.getElementById('liveStatusBadge'),
    
    statKeywordCount: document.getElementById('statKeywordCount'),
    statTargetSites: document.getElementById('statTargetSites'),
    statProfilesReady: document.getElementById('statProfilesReady'),
    
    payloadCount: document.getElementById('payloadCount'),
    payloadTableBody: document.getElementById('payloadTableBody')
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateBookmarkletScript();
    logTerminal('NexusLink Pro Engine Online. Armed with Spintax, Keyword Multiplier & Form Injector.', 'system');
});

function setupEventListeners() {
    // Keyword Generator
    DOM.btnGenerateKw.addEventListener('click', generateKeywordVariations);
    DOM.btnExtractKw.addEventListener('click', generateQuestionKeywords);
    DOM.keywordList.addEventListener('input', updateKeywordStats);
    
    // Identity Tools
    DOM.btnGenPass.addEventListener('click', generateSecurePassword);
    DOM.btnGenSpintax.addEventListener('click', reSpinBioPreview);
    
    // Target Sites Presets
    DOM.btnLoadForums.addEventListener('click', () => loadPresetSites(CURATED_LISTS.forums, '25+ High-DA Forums'));
    DOM.btnLoadWeb2.addEventListener('click', () => loadPresetSites(CURATED_LISTS.web2, '25+ Web 2.0 Platforms'));
    DOM.btnLoadDirectories.addEventListener('click', () => loadPresetSites(CURATED_LISTS.directories, '20+ High-DA Directories'));
    
    // File Dropzone
    DOM.dropZone.addEventListener('click', () => DOM.fileInput.click());
    DOM.fileInput.addEventListener('change', handleFileSelect);
    DOM.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); DOM.dropZone.classList.add('dragover'); });
    DOM.dropZone.addEventListener('dragleave', () => DOM.dropZone.classList.remove('dragover'));
    DOM.dropZone.addEventListener('drop', handleFileDrop);

    // Campaign Actions
    DOM.btnLoadDemoCampaign.addEventListener('click', loadDemoCampaign);
    DOM.btnBuildCampaign.addEventListener('click', buildBacklinkPayloads);
    DOM.btnPushToIndexer.addEventListener('click', pushLinksToNexusIndex);
    DOM.btnExportPayloads.addEventListener('click', exportCampaignExcel);
    DOM.btnCopyAllLinks.addEventListener('click', copyAllPayloadLinks);
    
    DOM.btnClearTerminal.addEventListener('click', () => {
        DOM.terminalOutput.innerHTML = '';
        logTerminal('Terminal buffer reset.', 'system');
    });

    // Inputs updates bookmarklet
    [DOM.targetUrl, DOM.accountEmail, DOM.accountUser, DOM.accountPass, DOM.spintaxBio].forEach(el => {
        el.addEventListener('input', updateBookmarkletScript);
    });
}

// ==========================================
// Keyword Variation Matrix Engine
// ==========================================
function generateKeywordVariations() {
    const seed = (DOM.seedKeyword.value || DOM.targetUrl.value || '').trim();
    if (!seed) {
        alert('Please enter a Primary Seed Keyword or Target URL first!');
        return;
    }

    const cleanSeed = seed.toLowerCase().replace(/https?:\/\//, '').replace(/^www\./, '').split(/[\/\?]/)[0].replace(/[-_]/g, ' ');
    const variations = new Set();
    variations.add(cleanSeed);

    // Prefixes
    KEYWORD_MODIFIERS.prefixes.forEach(p => {
        variations.add(`${p} ${cleanSeed}`);
    });

    // Suffixes
    KEYWORD_MODIFIERS.suffixes.forEach(s => {
        variations.add(`${cleanSeed} ${s}`);
    });

    // Combinations (Prefix + Suffix)
    for (let i = 0; i < 15; i++) {
        const p = KEYWORD_MODIFIERS.prefixes[Math.floor(Math.random() * KEYWORD_MODIFIERS.prefixes.length)];
        const s = KEYWORD_MODIFIERS.suffixes[Math.floor(Math.random() * KEYWORD_MODIFIERS.suffixes.length)];
        variations.add(`${p} ${cleanSeed} ${s}`);
    }

    DOM.keywordList.value = Array.from(variations).join('\n');
    updateKeywordStats();
    logTerminal(`[Keyword Engine] Generated ${variations.size} high-CTR LSI variations for "${cleanSeed}".`, 'success');
}

function generateQuestionKeywords() {
    const seed = (DOM.seedKeyword.value || 'services').trim();
    const questions = KEYWORD_MODIFIERS.questions.map(q => `${q} ${seed}?`);
    DOM.keywordList.value += '\n' + questions.join('\n');
    updateKeywordStats();
    logTerminal(`[Keyword Engine] Added ${questions.length} long-tail search question variations.`, 'info');
}

function updateKeywordStats() {
    const lines = DOM.keywordList.value.split('\n').map(k => k.trim()).filter(Boolean);
    state.keywords = lines;
    DOM.kwCountBadge.textContent = `${lines.length} Keywords Ready`;
    DOM.statKeywordCount.textContent = lines.length;
}

// ==========================================
// Spintax & Identity Utilities
// ==========================================
function spinText(template) {
    const spintaxRegex = /\{([^{}]+)\}/;
    let match;
    let text = template;
    while ((match = spintaxRegex.exec(text)) !== null) {
        const options = match[1].split('|');
        const chosen = options[Math.floor(Math.random() * options.length)];
        text = text.replace(match[0], chosen);
    }
    return text;
}

function reSpinBioPreview() {
    const template = DOM.spintaxBio.value;
    const spun = spinText(template).replace('{LINK}', DOM.targetUrl.value || 'https://mywebsite.com');
    logTerminal(`[Spintax Preview] "${spun}"`, 'info');
}

function generateSecurePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = 'Nexus!';
    for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    DOM.accountPass.value = pass;
    updateBookmarkletScript();
    logTerminal('Generated high-entropy secure password.', 'info');
}

// ==========================================
// Target Sites & CSV Upload
// ==========================================
function loadPresetSites(list, name) {
    DOM.targetSitesInput.value = list.join('\n');
    updateTargetSitesCount();
    logTerminal(`[Matrix Loaded] Armed with ${list.length} target endpoints from ${name}.`, 'success');
}

function updateTargetSitesCount() {
    const sites = extractCleanUrls(DOM.targetSitesInput.value);
    state.targetSites = sites;
    DOM.statTargetSites.textContent = sites.length;
}

function extractCleanUrls(text) {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s"'<>,;]+)/gi;
    const matches = text.match(urlRegex) || [];
    return [...new Set(matches.map(u => u.trim()))];
}

function handleFileDrop(e) {
    e.preventDefault();
    DOM.dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        parseUploadedFile(e.dataTransfer.files[0]);
    }
}

function handleFileSelect(e) {
    if (e.target.files.length) {
        parseUploadedFile(e.target.files[0]);
    }
}

function parseUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const content = event.target.result;
        const urls = extractCleanUrls(content);
        if (urls.length > 0) {
            DOM.targetSitesInput.value = urls.join('\n');
            updateTargetSitesCount();
            logTerminal(`[Excel / CSV Imported] Parsed ${urls.length} target website URLs from "${file.name}".`, 'success');
        } else {
            alert('No valid website URLs found in this file!');
        }
    };
    reader.readAsText(file);
}

// ==========================================
// 1-Click Universal Auto-Fill Bookmarklet
// ==========================================
function updateBookmarkletScript() {
    const targetUrl = DOM.targetUrl.value || 'https://example.com';
    const email = DOM.accountEmail.value || 'contact@example.com';
    const username = DOM.accountUser.value || 'nexus_user';
    const password = DOM.accountPass.value || 'NexusPass2026!';
    const bioTemplate = DOM.spintaxBio.value || 'Verified user profile.';

    // Universal Form Filling Script injected on any forum/profile page
    const script = `javascript:(function(){
        const data = {
            url: "${targetUrl}",
            email: "${email}",
            user: "${username}" + Math.floor(Math.random()*900+100),
            pass: "${password}",
            bio: "${bioTemplate.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
        };
        function fill(selector, val) {
            document.querySelectorAll(selector).forEach(el => {
                if (!el.value || el.type === 'text' || el.type === 'url' || el.type === 'email' || el.tagName === 'TEXTAREA') {
                    el.value = val;
                    el.dispatchEvent(new Event('input', {bubbles:true}));
                    el.dispatchEvent(new Event('change', {bubbles:true}));
                }
            });
        }
        fill('input[type="email"], input[name*="email"], input[id*="email"]', data.email);
        fill('input[name*="user"], input[name*="login"], input[id*="user"]', data.user);
        fill('input[type="password"], input[name*="pass"]', data.pass);
        fill('input[type="url"], input[name*="website"], input[name*="url"], input[name*="home"], input[id*="website"]', data.url);
        fill('textarea, textarea[name*="bio"], textarea[name*="about"], textarea[name*="desc"]', data.bio.replace('{LINK}', data.url));
        alert('⚡ NexusLink: Auto-filled all registration and profile fields successfully!');
    })();`;

    DOM.autoFillBookmarklet.href = script;
}

// ==========================================
// Campaign Builder & Payloads Generator
// ==========================================
function buildBacklinkPayloads() {
    const targetUrl = DOM.targetUrl.value.trim();
    if (!targetUrl) {
        alert('Please specify your Target Website URL first!');
        return;
    }

    if (state.keywords.length === 0) {
        generateKeywordVariations();
    }

    const sites = extractCleanUrls(DOM.targetSitesInput.value);
    if (sites.length === 0) {
        alert('Please add at least one target website (or click one of the preset buttons)!');
        return;
    }

    DOM.liveStatusBadge.textContent = 'GENERATING MATRIX...';
    logTerminal(`=======================================================`, 'system');
    logTerminal(`[CAMPAIGN LAUNCH] Building Backlink Payloads for ${sites.length} Target Platforms`, 'system');

    const email = DOM.accountEmail.value.trim() || 'nexus.seo.bot@gmail.com';
    const userPrefix = DOM.accountUser.value.trim() || 'nexus_pro';
    const password = DOM.accountPass.value.trim() || 'NexusPass2026!';
    const bioTemplate = DOM.spintaxBio.value;

    state.payloads = [];

    sites.forEach((siteUrl, idx) => {
        let domain = 'unknown';
        try { domain = new URL(siteUrl).hostname; } catch(e){}

        // Detect platform / CMS
        let platform = 'Generic Web Profile';
        let icon = '🏢';
        if (siteUrl.includes('xenforo') || siteUrl.includes('xf_')) { platform = 'XenForo Community'; icon = '💬'; }
        else if (siteUrl.includes('discourse') || siteUrl.includes('/u/')) { platform = 'Discourse Forum'; icon = '🌐'; }
        else if (siteUrl.includes('wp-') || siteUrl.includes('wordpress')) { platform = 'WordPress / BuddyPress'; icon = '📝'; }
        else if (siteUrl.includes('phpbb') || siteUrl.includes('ucp.php')) { platform = 'phpBB Forum'; icon = '📋'; }
        else if (siteUrl.includes('wiki') || siteUrl.includes('mediawiki')) { platform = 'MediaWiki Authority'; icon = '📚'; }
        else if (siteUrl.includes('medium') || siteUrl.includes('dev.to') || siteUrl.includes('hashnode')) { platform = 'Web 2.0 Authority'; icon = '⚡'; }

        const assignedKeyword = state.keywords[idx % state.keywords.length] || 'verified web services';
        const spunBio = spinText(bioTemplate).replace('{LINK}', `<a href="${targetUrl}">${assignedKeyword}</a>`);
        const username = `${userPrefix}_${Math.floor(100 + Math.random() * 900)}`;

        const payload = {
            id: idx + 1,
            targetSite: siteUrl,
            domain: domain,
            platform: `${icon} ${platform}`,
            keyword: assignedKeyword,
            username: username,
            email: email,
            password: password,
            bio: spunBio,
            targetUrl: targetUrl,
            status: 'READY'
        };

        state.payloads.push(payload);
    });

    renderPayloadsTable();
    DOM.liveStatusBadge.textContent = 'PAYLOADS ACTIVE';
    DOM.statProfilesReady.textContent = state.payloads.length;
    DOM.payloadCount.textContent = state.payloads.length;
    DOM.btnPushToIndexer.disabled = false;
    DOM.btnExportPayloads.disabled = false;

    logTerminal(`[MATRIX COMPLETE] ${state.payloads.length} Backlink Payloads Compiled & Form-Mapped!`, 'success');
}

function renderPayloadsTable() {
    if (state.payloads.length === 0) {
        DOM.payloadTableBody.innerHTML = `<tr><td colspan="4" class="empty-table-cell">No payloads generated yet.</td></tr>`;
        return;
    }

    DOM.payloadTableBody.innerHTML = state.payloads.map(p => `
        <tr>
            <td><strong>${p.domain}</strong></td>
            <td>${p.platform}</td>
            <td><span style="color: #00f0ff; font-weight: 600;">${p.keyword}</span></td>
            <td>
                <a href="${p.targetSite}" target="_blank" class="action-link" title="Open and use 1-Click Bookmarklet">
                    🚀 Open & Auto-Fill &rarr;
                </a>
            </td>
        </tr>
    `).join('');
}

// ==========================================
// Push to NexusIndex & Exporting
// ==========================================
function pushLinksToNexusIndex() {
    if (state.payloads.length === 0) return;

    const urls = state.payloads.map(p => p.targetSite).join('\n');
    navigator.clipboard.writeText(urls).then(() => {
        logTerminal(`[NexusIndex Bridge] Copied ${state.payloads.length} links to clipboard!`, 'success');
        const openWindow = confirm(`⚡ Copied ${state.payloads.length} target backlink URLs!\n\nDo you want to open NexusIndex Pro now to start indexing them?`);
        if (openWindow) {
            window.open('https://saifullahkhatri99-blip.github.io/backlink-indexer/', '_blank');
        }
    });
}

function copyAllPayloadLinks() {
    if (state.payloads.length === 0) return;
    const list = state.payloads.map(p => p.targetSite).join('\n');
    navigator.clipboard.writeText(list).then(() => {
        alert('All target backlink URLs copied to clipboard!');
        logTerminal('All target URLs copied to clipboard.', 'success');
    });
}

function exportCampaignExcel() {
    if (state.payloads.length === 0) return;

    let csv = 'ID,Target Website,Domain,CMS Platform,Anchor Keyword,Username,Email,Assigned Password,Money Site URL\n';
    state.payloads.forEach(p => {
        csv += `"${p.id}","${p.targetSite}","${p.domain}","${p.platform}","${p.keyword}","${p.username}","${p.email}","${p.password}","${p.targetUrl}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `NexusLink-Campaign-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    logTerminal('Campaign Excel / CSV Matrix exported successfully.', 'success');
}

function loadDemoCampaign() {
    DOM.targetUrl.value = 'https://saifullahkhatri99-blip.github.io/backlink-indexer/';
    DOM.seedKeyword.value = 'free backlink indexing tool';
    DOM.accountEmail.value = 'saifullah.seo.pro@gmail.com';
    DOM.accountUser.value = 'saif_matrix';
    generateKeywordVariations();
    loadPresetSites(CURATED_LISTS.forums, 'High-DA Forum Hubs');
    logTerminal('Loaded complete demo SEO campaign configuration.', 'info');
}

// Terminal Logger
function logTerminal(message, type = 'info') {
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = `
        <span class="timestamp">${timeStr}</span>
        <span class="tag ${type}">[${type.toUpperCase()}]</span>
        <span class="msg">${escapeHtml(message)}</span>
    `;
    DOM.terminalOutput.appendChild(line);
    DOM.terminalOutput.scrollTop = DOM.terminalOutput.scrollHeight;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
