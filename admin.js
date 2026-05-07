// ============================================
// MY FOOD MAP - ADMIN PANEL JS
// ============================================

const API_URL = "https://webbot-production-5ea8.up.railway.app";

let map;
let markers = [];
let places = [];
let filteredPlaces = [];
let currentTab = 'all';
let selectedPlaceId = null;
let cachedInitData = '';
let selectedPlaceIdForMap = null;
let tempMarker = null;
let isMapPickerMode = false;  // Xarita tanlash rejimi

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    const tg = window.Telegram?.WebApp;
    cachedInitData = tg?.initData || sessionStorage.getItem('tg_init_data') || '';
    if (!cachedInitData) {
        cachedInitData = 'demo_mode_' + Date.now();
        sessionStorage.setItem('tg_init_data', cachedInitData);
    }
    // Admin panel brauzerdan ham ochiladi - auth talab qilinmaydi
    initMap();
    await loadPlaces();
    document.getElementById('search-places').addEventListener('input', (e) => filterPlaces(e.target.value));

    // Google Maps link kirgizilganda avtomatik koordinata qidirish
    let _linkTimer = null;
    document.addEventListener('input', (e) => {
        if (e.target.id !== 'place-address-link') return;
        clearTimeout(_linkTimer);
        const val = e.target.value.trim();
        if (val.length > 8 && isMapsUrl(val)) {
            _linkTimer = setTimeout(() => {
                console.log('[AUTO] Link o\'zgardi, koordinat qidirilmoqda...');
                extractCoordsFromLink(true);
            }, 1000);
        }
    });
});

async function validateAdmin() {
    const res = await fetch(`${API_URL}/api/validate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ init_data: cachedInitData })
    });
    const data = await res.json();
    if (!data.success || !data.user.is_admin) throw new Error('Not admin');
}

function initMap() {
    map = new maplibregl.Map({
        container: 'map',
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [-98.5795, 39.8283],
        zoom: 4,
        attributionControl: false
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    // Map click - normal mode vs picker mode
    map.on('click', (e) => {
        if (isMapPickerMode) {
            // Map picker mode - set coordinates
            const lat = e.lngLat.lat;
            const lng = e.lngLat.lng;
            document.getElementById('place-lat').value = lat.toFixed(6);
            document.getElementById('place-lng').value = lng.toFixed(6);
            showTempMarker(lat, lng);
            showToast(`📍 Belgilandi: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        } else {
            // Normal mode - hide floating panel
            if (e.originalEvent && !e.originalEvent.target.closest('.maplibregl-marker')) {
                hideMapPlaceActions();
            }
        }
    });
}

async function loadPlaces() {
    try {
        const res = await fetch(`${API_URL}/api/places/all`);
        const data = await res.json();
        if (data.success) {
            places = data.data;
            filteredPlaces = [...places];
            updateStats(); renderPlacesList(); renderMarkers(); checkNoCoords();
        }
    } catch (e) { showToast('Yuklashda xatolik'); }
}

function updateStats() {
    const total = places.length;
    const withCoords = places.filter(p => p.lat && p.lng).length;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-with-coords').textContent = withCoords;
    document.getElementById('stat-no-coords').textContent = total - withCoords;
    document.getElementById('count-all').textContent = total;
}

function checkNoCoords() {
    const noCoords = places.filter(p => !p.lat || !p.lng);
    document.getElementById('sidebar-warning').classList.toggle('hidden', noCoords.length === 0);
}

// ============================================
// MARKERS
// ============================================
function renderMarkers() {
    markers.forEach(m => m.remove());
    markers = [];

    const locationPinSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.5L17.5 16C20.5 13 20.5 8.5 17.5 5.5C14.5 2.5 9.5 2.5 6.5 5.5C3.5 8.5 3.5 13 6.5 16L12 21.5Z" fill="#34C759" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
        </svg>`;

    const validPlaces = filteredPlaces.filter(p => p.lat && p.lng);

    validPlaces.forEach(place => {
        const el = document.createElement('div');
        el.innerHTML = `
            <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 2px 8px rgba(52,199,89,0.45));transition:transform 0.2s ease;cursor:pointer;">
                ${locationPinSvg}
            </div>
        `;

        el.addEventListener('mouseenter', () => { el.firstElementChild.style.transform = 'scale(1.15)'; });
        el.addEventListener('mouseleave', () => { el.firstElementChild.style.transform = 'scale(1)'; });

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat([place.lng, place.lat])
            .setPopup(
                new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`
                    <div style="font-family:-apple-system,sans-serif;min-width:200px;padding:4px;">
                        <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${place.name}</div>
                        <div style="font-size:12px;color:#666;margin-bottom:8px;">${place.address || ''}</div>
                        <div style="display:flex;gap:6px;">
                            <button onclick="editPlace(${place.id})" style="flex:1;padding:6px;background:#007AFF;color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;">Tahrirlash</button>
                            <button onclick="deletePlace(${place.id})" style="flex:1;padding:6px;background:#FF3B30;color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;">O'chirish</button>
                        </div>
                    </div>
                `)
            )
            .addTo(map);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            selectPlace(place.id);
        });

        markers.push(marker);
    });

    if (markers.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        validPlaces.forEach(p => bounds.extend([p.lng, p.lat]));
        map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 900 });
    }
}

// ============================================
// SIDEBAR LIST
// ============================================
function renderPlacesList() {
    const list = document.getElementById('places-list');
    if (filteredPlaces.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:40px 20px;color:#8E8E93;"><div style="font-size:40px;margin-bottom:12px;">📭</div><div style="font-size:14px;font-weight:600;">Joylar topilmadi</div></div>`;
        return;
    }

    list.innerHTML = filteredPlaces.map(place => {
        const hasCoords = place.lat && place.lng;
        return `
            <div class="place-item ${selectedPlaceId === place.id ? 'active' : ''}" onclick="selectPlace(${place.id})" data-id="${place.id}">
                <div class="place-marker-icon food">🍽️</div>
                <div class="place-info">
                    <div class="place-name">${place.name}</div>
                    <div class="place-address">${place.address || 'Manzil yo\'q'}</div>
                    <div class="place-meta">
                        <span style="color:${hasCoords ? '#34C759' : '#FF3B30'};font-size:11px;">
                            ${hasCoords ? '📍 Koordinata bor' : '⚠️ Koordinata yo\'q'}
                        </span>
                    </div>
                </div>
                <div class="place-actions" onclick="event.stopPropagation()">
                    <button class="btn-edit" onclick="editPlace(${place.id})" title="Tahrirlash">✏️</button>
                    <button class="btn-delete" onclick="deletePlace(${place.id})" title="O'chirish">🗑️</button>
                </div>
            </div>`;
    }).join('');
}

function selectPlace(id) {
    selectedPlaceId = id;
    selectedPlaceIdForMap = id;
    const place = places.find(p => p.id === id);
    if (!place) return;
    document.querySelectorAll('.place-item').forEach(el => el.classList.toggle('active', parseInt(el.dataset.id) === id));

    const actionPanel = document.getElementById('map-place-actions');
    const nameEl = document.getElementById('mpa-name');
    if (actionPanel && nameEl) {
        nameEl.textContent = place.name;
        actionPanel.classList.remove('hidden');
    }

    if (place.lat && place.lng) {
        map.flyTo({ center: [place.lng, place.lat], zoom: 16, duration: 800 });
    }
}

function switchTab(tab) {
    currentTab = 'all';
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.toggle('active', el.dataset.tab === 'all'));
    renderPlacesList(); renderMarkers();
}

function filterPlaces(query) {
    const q = query.toLowerCase().trim();
    filteredPlaces = !q ? [...places] : places.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.address && p.address.toLowerCase().includes(q))
    );
    renderPlacesList(); renderMarkers();
}

// ============================================
// GOOGLE MAPS LINK -> KOORDINAT (FULL DIAGNOSTICS)
// ============================================

// Barcha Google Maps URL formatlaridan koordinat olish
function extractCoordsFromUrl(url) {
    if (!url) return null;
    // FIX: Trim whitespace and trailing spaces/percent-encoding
    url = url.trim().replace(/\s+$/, '').replace(/%20$/, '');
    console.log('[COORDS] URL tahlil qilinmoqda:', url);
    
    const patterns = [
        // @lat,lng,zoom format (eng keng tarqalgan)
        { re: /@(-?\d+\.\d+),(-?\d+\.\d+)/, name: '@lat,lng' },
        // ?q=lat,lng
        { re: /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/, name: '?q=lat,lng' },
        // ll=lat,lng
        { re: /ll=(-?\d+\.\d+),(-?\d+\.\d+)/, name: 'll=' },
        // /place/.../@lat,lng
        { re: /\/place\/[^/@]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/, name: '/place/@' },
        // maps?q=lat,lng
        { re: /maps[?/].*q=(-?\d+\.\d+),(-?\d+\.\d+)/, name: 'maps?q=' },
        // !3d lat !4d lng (Google encoded)
        { re: /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, name: '!3d!4d' },
        // "lat,lng" anywhere with enough decimals
        { re: /(-?\d{2,3}\.\d{4,}),(-?\d{2,3}\.\d{4,})/, name: 'raw coords' },
    ];

    for (const { re, name } of patterns) {
        const m = url.match(re);
        if (m) {
            const lat = parseFloat(m[1]);
            const lng = parseFloat(m[2]);
            if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                console.log(`[COORDS] ✅ Topildi (${name}): lat=${lat}, lng=${lng}`);
                return { lat, lng };
            }
        }
    }
    console.log('[COORDS] ❌ Koordinat topilmadi URL da');
    return null;
}

// URL qisqartirilganmi yoki Google Maps linki?
function isMapsUrl(url) {
    return /goo\.gl|maps\.app\.goo\.gl|maps\.google\.com|google\.com\/maps|maps\.google/i.test(url);
}

async function extractCoordsFromLink(silent = false) {
    const linkEl = document.getElementById('place-address-link');
    let link = linkEl ? linkEl.value.trim() : '';
    
    // URL ni tozalash: barcha bo'sh joylarni olib tashlash
    link = link.replace(/\s+/g, '').replace(/%20/g, '');
    
    if (linkEl && linkEl.value !== link) {
        linkEl.value = link;
    }
    
    if (!link) {
        if (!silent) showToast('Avval manzil linkini kiriting');
        return;
    }

    const btn = document.getElementById('btn-extract-coords');
    const origHTML = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '⏳'; btn.disabled = true; }

    console.group('[COORDS] Koordinat qidirish boshlandi');
    console.log('Link:', link);

    try {
        // ── QADAM 1: To'g'ridan-to'g'ri URL ni tahlil qilish ──
        console.log('[COORDS] Qadam 1: URL tahlil...');
        let coords = extractCoordsFromUrl(link);
        if (coords) {
            applyCoords(coords, 'URL tahlil');
            if (btn) { btn.innerHTML = '✅'; setTimeout(() => { btn.innerHTML = origHTML; btn.disabled = false; }, 2000); }
            console.groupEnd();
            return;
        }

        // ── QADAM 2: Backend resolve-link (faqat Google Maps linklar uchun) ──
        if (isMapsUrl(link)) {
            console.log('[COORDS] Qadam 2: Backend orqali kengaytirish...');
            if (!silent) showToast('🔗 Link tahlil qilinmoqda...');
            
            try {
                const res = await fetch(`${API_URL}/api/admin/resolve-link`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: link, init_data: cachedInitData })
                });
                
                console.log('[COORDS] Backend response status:', res.status);

                if (res.status === 403) {
                    showToast('❌ Admin huquqi yo\'q');
                    if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
                    console.groupEnd();
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    console.log('[COORDS] Backend javobi (raw):', JSON.stringify(data));
                    console.log('[COORDS] data.lat:', data.lat, 'data.lng:', data.lng);
                    console.log('[COORDS] lat != null?:', data.lat != null, 'lng != null?:', data.lng != null);
                    
                    if (data.lat != null && data.lng != null) {
                        applyCoords({ lat: data.lat, lng: data.lng }, 'Backend resolve');
                        if (btn) { btn.innerHTML = '✅'; setTimeout(() => { btn.innerHTML = origHTML; btn.disabled = false; }, 2000); }
                        console.groupEnd();
                        return;
                    }
                }
                
                // Backend ham ishlamadi - foydalanuvchiga xabar
                console.warn('[COORDS] Backend ham topa olmadi');
                
            } catch (fetchErr) {
                console.error('[COORDS] Backend fetch xatosi:', fetchErr.message);
            }
            
            // ❌ MUHIM: Google Maps link bo'lsa, manzil nomidan QIDIRMAYDI
            // Faqat foydalanuvchiga xabar beradi
            if (!silent) {
                showToast('❌ Linkdan koordinat topilmadi — xaritadan tanlang yoki qo\'lda kiriting');
            }
            
        } else {
            // Google Maps link emas - boshqa hech narsa qilmaydi
            if (!silent) showToast('❌ Noto\'g\'ri Google Maps link');
        }

    } catch (e) {
        console.error('[COORDS] Kutilmagan xato:', e);
        if (!silent) showToast('Xatolik: ' + e.message);
    }

    if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
    console.groupEnd();
}


// Koordinatlarni inputlarga yozish va xaritada ko'rsatish
function applyCoords(coords, source) {
    console.log(`[COORDS] ✅ Qo\'llanildi (${source}): lat=${coords.lat}, lng=${coords.lng}`);
    document.getElementById('place-lat').value = parseFloat(coords.lat).toFixed(6);
    document.getElementById('place-lng').value = parseFloat(coords.lng).toFixed(6);
    showTempMarker(parseFloat(coords.lat), parseFloat(coords.lng));
    
    const msg = document.getElementById('coords-status-msg');
    if (msg) {
        msg.textContent = `✅ ${parseFloat(coords.lat).toFixed(5)}, ${parseFloat(coords.lng).toFixed(5)}`;
        msg.style.display = 'block';
        msg.style.color = '#34C759';
        msg.style.fontWeight = '700';
    }
    showToast(`✅ Koordinat topildi: ${parseFloat(coords.lat).toFixed(4)}, ${parseFloat(coords.lng).toFixed(4)}`);
}

// URL qisqartirilganmi?
function isShortenedUrl(url) {
    return isMapsUrl(url);
}

async function geocodeByName(name) {
    try {
        console.log('[GEOCODE] Qidirilmoqda:', name);
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1`;
        const res = await fetch(url, { headers: { 'User-Agent': 'MyFoodMap/1.0' } });
        const data = await res.json();
        console.log('[GEOCODE] Natija:', data);
        if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } catch (e) { console.error('[GEOCODE] Xato:', e); }
    return null;
}

// ============================================
// MAP PICKER - Xaritadan tanlash
// ============================================
function toggleMapPicker() {
    isMapPickerMode = !isMapPickerMode;
    const btn = document.getElementById('btn-map-picker');

    if (isMapPickerMode) {
        // Picker mode ON
        btn.innerHTML = '✅ Tanlashni yakunlash';
        btn.style.background = '#34C759';
        btn.style.color = '#fff';
        showToast('🗺 Xaritada joy belgilang. Koordinatalar avtomatik to\'ldiriladi.');

        // Change cursor
        map.getCanvas().style.cursor = 'crosshair';

        // Add click hint
        addMapClickHint();
        
        // Map click handler for picker mode
        map.once('click', handleMapPickerClick);
    } else {
        // Picker mode OFF
        btn.innerHTML = '🗺 Xaritadan tanlash';
        btn.style.background = '';
        btn.style.color = '';
        showToast('Xarita tanlash rejimi o\'chirildi');

        // Reset cursor
        map.getCanvas().style.cursor = '';

        // Remove hint
        removeMapClickHint();
        
        // Remove click handler
        map.off('click', handleMapPickerClick);
    }
}

function handleMapPickerClick(e) {
    if (!isMapPickerMode) return;
    
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    
    // Fill inputs
    document.getElementById('place-lat').value = lat.toFixed(6);
    document.getElementById('place-lng').value = lng.toFixed(6);
    
    // Show temp marker
    showTempMarker(lat, lng);
    
    // Show success
    showToast(`📍 Belgilandi: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    
    // Auto turn off picker mode
    isMapPickerMode = false;
    const btn = document.getElementById('btn-map-picker');
    if (btn) {
        btn.innerHTML = '🗺 Xaritadan tanlash';
        btn.style.background = '';
        btn.style.color = '';
    }
    map.getCanvas().style.cursor = '';
    removeMapClickHint();
}


function addMapClickHint() {
    removeMapClickHint();
    const hint = document.createElement('div');
    hint.id = 'map-click-hint';
    hint.innerHTML = '👆 Xaritada istalgan joyni bosing';
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.75);
        color: white;
        padding: 14px 24px;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 700;
        z-index: 2000;
        pointer-events: none;
        animation: fadeUp 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    document.body.appendChild(hint);

    setTimeout(() => {
        if (document.getElementById('map-click-hint')) {
            document.getElementById('map-click-hint').style.opacity = '0';
            document.getElementById('map-click-hint').style.transition = 'opacity 0.5s';
            setTimeout(removeMapClickHint, 500);
        }
    }, 3000);
}

function removeMapClickHint() {
    const hint = document.getElementById('map-click-hint');
    if (hint) hint.remove();
}

// ============================================
// PARSE HELPERS
// ============================================
function parseDetailsFromTextUser(text) {
    if (!text) return '';
    const lines = text.split('\n');
    const detailLines = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (/^[🏠🏬🚛🏪🧾🍜🚘🚚⏰❌❗️🅿️]/.test(trimmed)) {
            detailLines.push(trimmed);
        }
    }
    return detailLines.join('\n');
}

// ============================================
// ADD / EDIT PLACE
// ============================================
function openAddModal() {
    document.getElementById('place-id').value = '';
    document.getElementById('modal-title').textContent = 'Yangi joy qo\'shish';
    ['place-name','place-lat','place-lng','place-address-name','place-address-link',
     'place-phone','place-telegram','place-menu','place-details'].forEach(id => {
        document.getElementById(id).value = '';
    });
    const msg = document.getElementById('coords-status-msg');
    if (msg) { msg.style.display = 'none'; msg.textContent = ''; }

    // Reset map picker
    isMapPickerMode = false;
    const pickerBtn = document.getElementById('btn-map-picker');
    if (pickerBtn) {
        pickerBtn.innerHTML = '🗺 Xaritadan tanlash';
        pickerBtn.style.background = '';
        pickerBtn.style.color = '';
    }
    removeMapClickHint();

    document.getElementById('place-modal').classList.add('active');
}

function editPlace(id) {
    const place = places.find(p => p.id === id);
    if (!place) return;

    document.getElementById('place-id').value = place.id;
    document.getElementById('modal-title').textContent = 'Joyni tahrirlash';
    document.getElementById('place-name').value = place.name || '';
    document.getElementById('place-lat').value = place.lat || '';
    document.getElementById('place-lng').value = place.lng || '';
    document.getElementById('place-address-name').value = place.address_name || place.address || '';
    document.getElementById('place-address-link').value = place.address_link || place.maps_url || '';
    document.getElementById('place-phone').value = place.phone || '';
    document.getElementById('place-telegram').value = place.telegram || '';
    document.getElementById('place-menu').value = place.menu_url || '';

    const details = place.details || parseDetailsFromTextUser(place.text_user || place.description || '');
    document.getElementById('place-details').value = details;

    // Reset map picker
    isMapPickerMode = false;
    const pickerBtn = document.getElementById('btn-map-picker');
    if (pickerBtn) {
        pickerBtn.innerHTML = '🗺 Xaritadan tanlash';
        pickerBtn.style.background = '';
        pickerBtn.style.color = '';
    }
    removeMapClickHint();

    document.getElementById('place-modal').classList.add('active');

    if (place.lat && place.lng) {
        showTempMarker(place.lat, place.lng);
    }
}

function closeModal() {
    document.getElementById('place-modal').classList.remove('active');
    clearTempMarker();
    removeMapClickHint();
    isMapPickerMode = false;
    const pickerBtn = document.getElementById('btn-map-picker');
    if (pickerBtn) {
        pickerBtn.innerHTML = '🗺 Xaritadan tanlash';
        pickerBtn.style.background = '';
        pickerBtn.style.color = '';
    }
    map.getCanvas().style.cursor = '';
}

function showTempMarker(lat, lng) {
    clearTempMarker();

    const markerEl = document.createElement('div');
    markerEl.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22L17.5 16.5C20.5376 13.4624 20.5376 8.53757 17.5 5.5C14.4624 2.46244 9.53757 2.46244 6.5 5.5C3.46244 8.53757 3.46244 13.4624 6.5 16.5L12 22Z" fill="#007AFF" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="12" cy="11" r="3" fill="white"/>
        </svg>
    `;
    markerEl.style.cursor = 'pointer';

    tempMarker = new maplibregl.Marker({ element: markerEl, anchor: 'bottom' })
        .setLngLat([lng, lat])
        .addTo(map);

    map.flyTo({ center: [lng, lat], zoom: 16, duration: 500 });
}

function clearTempMarker() {
    if (tempMarker) {
        tempMarker.remove();
        tempMarker = null;
    }
}

async function savePlace() {
    const id = document.getElementById('place-id').value;
    const addrName = document.getElementById('place-address-name').value.trim();
    const addrLink = document.getElementById('place-address-link').value.trim();
    const details = document.getElementById('place-details').value.trim();

    const place = {
        name: document.getElementById('place-name').value.trim(),
        lat: parseFloat(document.getElementById('place-lat').value) || null,
        lng: parseFloat(document.getElementById('place-lng').value) || null,
        category: 'food',
        address: addrName,
        address_name: addrName,
        address_link: addrLink,
        maps_url: addrLink,
        phone: document.getElementById('place-phone').value.trim(),
        telegram: document.getElementById('place-telegram').value.trim(),
        menu_url: document.getElementById('place-menu').value.trim(),
        details: details,
        text_user: details,
        text_channel: ''
    };

    if (!place.name) { showToast('Nomini kiriting!'); return; }

    try {
        const url = id ? `${API_URL}/api/places/${id}` : `${API_URL}/api/places`;
        const method = id ? 'PUT' : 'POST';
        
        // ✅ Har doim init_data yuborish (demo_mode_ ham admin huquqi bilan)
        const body = { place, init_data: cachedInitData };
        
        const res = await fetch(url, {
            method, 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        
        if (res.status === 403) {
            showToast('❌ Admin huquqi yo\'q. Login qiling');
            return;
        }
        
        const data = await res.json();
        if (data.success) { 
            closeModal(); 
            await loadPlaces(); 
            showToast(id ? 'Yangilandi!' : 'Qo\'shildi!'); 
        } else {
            showToast('Xatolik: ' + data.error);
        }
    } catch (e) { 
        showToast('Saqlashda xatolik'); 
    }
}

// ============================================
// DELETE
// ============================================
async function deletePlace(id) {
    if (!confirm('Haqiqatan ham o\'chirmoqchimisiz?')) return;
    try {
        const res = await fetch(`${API_URL}/api/places/${id}`, {
            method: 'DELETE', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: cachedInitData })
        });
        const data = await res.json();
        if (data.success) { await loadPlaces(); showToast('O\'chirildi!'); }
        else showToast('Xatolik: ' + data.error);
    } catch (e) { showToast('O\'chirishda xatolik'); }
}

// ============================================
// MAP FLOATING ACTIONS
// ============================================
function editSelectedPlace() {
    if (selectedPlaceIdForMap) {
        editPlace(selectedPlaceIdForMap);
    }
}

function deleteSelectedPlace() {
    if (selectedPlaceIdForMap) {
        deletePlace(selectedPlaceIdForMap);
    }
}

function hideMapPlaceActions() {
    const panel = document.getElementById('map-place-actions');
    if (panel) panel.classList.add('hidden');
    selectedPlaceIdForMap = null;
}

// ============================================
// GEOCODE ALL
// ============================================
async function geocodeAllPlaces() {
    if (!confirm('Koordinatasiz joylarni avtomatik topishni xohlaysizmi?')) return;
    try {
        const res = await fetch(`${API_URL}/api/admin/geocode-all`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: cachedInitData })
        });
        const data = await res.json();
        if (data.success) { showToast(`Yangilandi: ${data.updated}, Topilmadi: ${data.failed}`); await loadPlaces(); }
        else showToast('Xatolik: ' + data.error);
    } catch (e) { showToast('Geocode xatosi'); }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}