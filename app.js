// ============================================
// MY FOOD MAP — APP.JS  (2026 redesign)
// Fixes: compact route panel, markers persist,
//        from/to as hidden inputs + display divs
// ============================================

const i18n = {
    uz: {
        app_name: "My Food Map",
        search_placeholder: "Shahar yoki joy nomi...",
        search_cities: "Shaharlarni qidirish",
        foods: "Oziq-ovqat", services: "Xizmatlar", all: "Hammasi",
        map: "Xarita", profile: "Profil",
        route: "Yo'nalish", directions: "Yo'nalish",
        open_map: "Xaritada", call: "Qo'ng'iroq",
        menu: "Menu", delivery: "Yetkazib berish",
        from_loc: "Qayerdan", to_loc: "Qayerga",
        build_route: "Yo'l chizish",
        admin_panel: "Admin", add_place: "Joy qo'shish",
        cancel: "Bekor", save: "Saqlash",
        map_pick_hint: "Xaritada joy tanlang",
        demo_mode: "Demo rejim", no_auth: "Avtorizatsiya yo'q",
        no_coords_warning: "⚠️ Koordinatasiz joylar bor!",
        view: "Ko'rish", place_name: "Joy nomi", food: "Oziq-ovqat",
        address_placeholder: "Manzil", name_placeholder: "Nomi *",
        phone_placeholder: "Telefon", details_placeholder: "Tafsilotlar",
        lat_placeholder: "Kenglik", lng_placeholder: "Uzunlik",
        coordinates: "Koordinatalar", list: "Ro'yxat",
        all_restaurants: "Barcha restoranlar",
        select_language: "Tilni tanlang", current_language: "Joriy til",
        my_location: "Mening joylashuvim", km: "km", min: "daqiqa",
        geolocation_not_supported: "Geolocation qo'llab-quvvatlanmaydi",
        location_not_detected: "Joylashuv aniqlanmadi",
        please_select_locations: "Iltimos, joylarni tanlang",
        place_added: "Joy qo'shildi!", save_error: "Saqlashda xatolik",
        server_error: "Server xatosi",
        demo_mode_message: "⚠️ Demo rejim - ba'zi funksiyalar cheklangan",
        no_places_found: "Joy topilmadi", no_address: "Manzil yo'q",
        no_coords: "Koordinatasiz", find: "Topish",
        update_coords_confirm: "Barcha koordinatasiz joylarni avtomatik topishni xohlaysizmi?",
        updated: "Yangilandi", failed: "Topilmadi", not_found: "Topilmadi",
        geocode_error: "Geocode xatosi", you_are_here: "Siz shu yerdasiz",
        admin_mode_active: "👨‍💼 Admin rejimi faol.",
        start_point: "Boshlanish nuqtasi", end_point: "Tugash nuqtasi",
        select_start_point: "Endi boshlanish nuqtasini tanlang",
        select_end_point: "Endi tugash nuqtasini tanlang",
        locating: "Joylashuv aniqlanmoqda...",
        route_not_found: "Yo'l topilmadi",
        invalid_coords: "Noto'g'ri koordinatalar",
        route_error: "Yo'l chizishda xatolik",
        lang_selected_uz: "✅ O'zbek tili tanlandi",
        lang_selected_ru: "✅ Rus tili tanlandi",
        lang_selected_en: "✅ English selected",
        searching: "Qidirilmoqda...",
        no_results: "Natija topilmadi",
        city: "Shahar",
        country: "Davlat",
        state: "Viloyat",
        place: "Joy",
        work_time: "Ish vaqti",
        maps_url_placeholder: "Google Maps link",
        extract_coords: "Koordinatalarni topish",
        pick_on_map: "Xaritadan tanlash",
        coords_extracted: "Koordinatalar avtomatik to'ldirildi",
        invalid_maps_url: "Google Maps linkidan koordinata olib bo'lmadi",
        short_url_hint: "Qisqa link. Brauzerda ochib to'liq linkni yuboring yoki xaritadan tanlang",       
    },
    ru: {
        app_name: "My Food Map",
        search_placeholder: "Город или название места...",
        search_cities: "Поиск городов",
        foods: "Еда", services: "Услуги", all: "Все",
        map: "Карта", profile: "Профиль",
        route: "Маршрут", directions: "Маршрут",
        open_map: "На карте", call: "Позвонить",
        menu: "Меню", delivery: "Доставка",
        from_loc: "Откуда", to_loc: "Куда",
        build_route: "Построить маршрут",
        admin_panel: "Админ", add_place: "Добавить место",
        cancel: "Отмена", save: "Сохранить",
        map_pick_hint: "Выберите место на карте",
        demo_mode: "Демо режим", no_auth: "Нет авторизации",
        no_coords_warning: "⚠️ Есть места без координат!",
        view: "Смотреть", place_name: "Название места", food: "Еда",
        address_placeholder: "Адрес", name_placeholder: "Название *",
        phone_placeholder: "Телефон", details_placeholder: "Детали",
        lat_placeholder: "Широта", lng_placeholder: "Долгота",
        coordinates: "Координаты", list: "Список",
        all_restaurants: "Все рестораны",
        select_language: "Выберите язык", current_language: "Текущий язык",
        my_location: "Мое местоположение", km: "км", min: "мин",
        geolocation_not_supported: "Геолокация не поддерживается",
        location_not_detected: "Местоположение не определено",
        please_select_locations: "Пожалуйста, выберите места",
        place_added: "Место добавлено!", save_error: "Ошибка сохранения",
        server_error: "Ошибка сервера",
        demo_mode_message: "⚠️ Демо режим - некоторые функции ограничены",
        no_places_found: "Места не найдены", no_address: "Нет адреса",
        no_coords: "Без координат", find: "Найти",
        update_coords_confirm: "Хотите автоматически найти координаты для всех мест без координат?",
        updated: "Обновлено", failed: "Не найдено", not_found: "Не найдено",
        geocode_error: "Ошибка геокодирования", you_are_here: "Вы здесь",
        admin_mode_active: "👨‍💼 Режим администратора активен.",
        start_point: "Начальная точка", end_point: "Конечная точка",
        select_start_point: "Теперь выберите начальную точку",
        select_end_point: "Теперь выберите конечную точку",
        locating: "Определяется местоположение...",
        route_not_found: "Маршрут не найден",
        invalid_coords: "Неверные координаты",
        route_error: "Ошибка построения маршрута",
        lang_selected_uz: "✅ Выбран узбекский",
        lang_selected_ru: "✅ Выбран русский",
        lang_selected_en: "✅ English selected",
        searching: "Поиск...",
        no_results: "Ничего не найдено",
        city: "Город",
        country: "Страна",
        state: "Область",
        place: "Место",
        work_time: "Время работы",
        maps_url_placeholder: "Ссылка Google Maps",
        extract_coords: "Найти координаты",
        pick_on_map: "Выбрать на карте",
        coords_extracted: "Координаты автоматически заполнены",
        invalid_maps_url: "Не удалось извлечь координаты из ссылки",
        short_url_hint: "Короткая ссылка. Откройте в браузере и отправьте полную ссылку или выберите на карте",
    },
    en: {
        app_name: "My Food Map",
        search_placeholder: "City or place name...",
        search_cities: "Search cities",
        foods: "Foods", services: "Services", all: "All",
        map: "Map", profile: "Profile",
        route: "Route", directions: "Directions",
        open_map: "Open Map", call: "Call",
        menu: "Menu", delivery: "Delivery",
        from_loc: "From", to_loc: "To",
        build_route: "Build Route",
        admin_panel: "Admin", add_place: "Add Place",
        cancel: "Cancel", save: "Save",
        map_pick_hint: "Pick location on map",
        demo_mode: "Demo mode", no_auth: "No authorization",
        no_coords_warning: "⚠️ Places without coordinates!",
        view: "View", place_name: "Place Name", food: "Food",
        address_placeholder: "Address", name_placeholder: "Name *",
        phone_placeholder: "Phone", details_placeholder: "Details",
        lat_placeholder: "Latitude", lng_placeholder: "Longitude",
        coordinates: "Coordinates", list: "List",
        all_restaurants: "All Restaurants",
        select_language: "Select Language", current_language: "Current Language",
        my_location: "My Location", km: "km", min: "min",
        geolocation_not_supported: "Geolocation not supported",
        location_not_detected: "Location not detected",
        please_select_locations: "Please select locations",
        place_added: "Place added!", save_error: "Save error",
        server_error: "Server error",
        demo_mode_message: "⚠️ Demo mode - some features limited",
        no_places_found: "No places found", no_address: "No address",
        no_coords: "No coordinates", find: "Find",
        update_coords_confirm: "Auto-find coordinates for all places without coordinates?",
        updated: "Updated", failed: "Failed", not_found: "Not found",
        geocode_error: "Geocode error", you_are_here: "You are here",
        admin_mode_active: "👨‍💼 Admin mode active.",
        start_point: "Starting point", end_point: "Ending point",
        select_start_point: "Now select the starting point",
        select_end_point: "Now select the ending point",
        locating: "Locating...",
        route_not_found: "Route not found",
        invalid_coords: "Invalid coordinates",
        route_error: "Route error",
        lang_selected_uz: "✅ Uzbek selected",
        lang_selected_ru: "✅ Russian selected",
        lang_selected_en: "✅ English selected",
        searching: "Searching...",
        no_results: "No results found",
        city: "City",
        country: "Country",
        state: "State",
        place: "Place",
        work_time: "Work Time",
        maps_url_placeholder: "Google Maps link",
        extract_coords: "Extract coordinates",
        pick_on_map: "Pick on map",
        coords_extracted: "Coordinates auto-filled",
        invalid_maps_url: "Could not extract coordinates from link",
        short_url_hint: "Short link. Open in browser and send full link, or pick on map",
        
    }
};

// ============================================
// GLOBALS
// ============================================
let map;
let markers = [];
let tempMarkers = [];
let searchMarkers = [];
let routeMarkers = [];
let userLocation = null;
let selectedPlace = null;
let places = [];
let allPlaces = [];
let currentLang = 'uz';
let userData = null;
let isDemoMode = false;
let isAdmin = false;
let cachedInitData = '';
let routeFrom = { lat: null, lng: null, label: '' };
let routeTo   = { lat: null, lng: null, label: '' };
let mapSelectMode = null;
let longPressTimer = null;

const API_URL = "https://webbot-production-5ea8.up.railway.app";
const ROUTE_SOURCE_ID = 'route-source';
const ROUTE_LAYER_ID  = 'route-line';

// Nominatim search state
let nominatimAbortController = null;


// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    const tg = window.Telegram?.WebApp;
    let initData = tg?.initData || '';

    if (initData) {
        cachedInitData = initData;
        sessionStorage.setItem('tg_init_data', initData);
    } else {
        cachedInitData = sessionStorage.getItem('tg_init_data') || '';
    }

    if (!cachedInitData && location.hash.length > 1) {
        cachedInitData = decodeURIComponent(location.hash.slice(1));
        sessionStorage.setItem('tg_init_data', cachedInitData);
    }
    if (!cachedInitData) {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('init_data');
        if (q) { cachedInitData = q; sessionStorage.setItem('tg_init_data', cachedInitData); }
    }

    if (!cachedInitData) {
        isDemoMode = true;
        cachedInitData = 'demo_mode_' + Date.now();
        sessionStorage.setItem('tg_init_data', cachedInitData);
        userData = { id: 0, name: 'Demo User', username: 'demo', language: 'uz', is_admin: false };
    }

    tg?.expand();
    tg?.ready();
    const ver = parseFloat(tg?.version || '6.0');
    if (ver >= 6.1) {
        tg.setHeaderColor?.('#FFFFFF');
        tg.setBackgroundColor?.('#FFFFFF');
    }

    try {
        await validateUser(cachedInitData);
    } catch (e) {
        console.warn('Auth failed:', e);
        isDemoMode = true;
        userData = { id: 0, name: 'Demo User', username: 'demo', language: 'uz', is_admin: false };
    }

    initMap();
    await loadPlaces();
    await loadAllPlaces();
    setupEventListeners();
    setupNominatimSearch();

    const lang = userData?.language || 'uz';
    await setLang(lang);
    updateLanguageSelectorUI(lang);
});

async function validateUser(initData) {
    try {
        const res = await fetch(`${API_URL}/api/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: initData })
        });
        const data = await res.json();
        if (data.success) {
            userData = data.user;
            isAdmin = data.user.is_admin;
        } else {
            if (res.status === 403) {
                isDemoMode = true;
                userData = { id: 0, name: 'Demo User', username: 'demo', language: 'uz', is_admin: false };
            }
        }
    } catch (e) {
        isDemoMode = true;
        userData = { id: 0, name: 'Demo User', username: 'demo', language: 'uz', is_admin: false };
    }
}

// ============================================
// NOMINATIM SEARCH (worldwide cities, countries, places)
// ============================================
function setupNominatimSearch() {
    const searchInput = document.getElementById('search-input');
    const autocompleteList = document.getElementById('search-autocomplete-list');
    const autocompleteContainer = document.getElementById('search-autocomplete');
    const searchClear = document.getElementById('search-clear');

    if (!searchInput) return;

    let debounceTimer = null;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length > 0) {
            searchClear.classList.remove('hidden');
        } else {
            searchClear.classList.add('hidden');
            autocompleteContainer.classList.add('hidden');
            clearSearchMarkers();
            return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchNominatim(query);
        }, 400);
    });

    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            searchNominatim(query);
        }
    });

    // Hide autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            autocompleteContainer.classList.add('hidden');
        }
    });

    // Clear button
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        autocompleteContainer.classList.add('hidden');
        clearSearchMarkers();
        loadPlaces('all', '');
        renderMarkers();
    });
}

async function searchNominatim(query) {
    const autocompleteList = document.getElementById('search-autocomplete-list');
    const autocompleteContainer = document.getElementById('search-autocomplete');

    if (query.length < 2) {
        autocompleteContainer.classList.add('hidden');
        return;
    }

    // Cancel previous request
    if (nominatimAbortController) {
        nominatimAbortController.abort();
    }
    nominatimAbortController = new AbortController();

    // Show loading
    autocompleteList.innerHTML = `
        <div class="search-loading">
            <span class="search-loading-spinner"></span>
            <span>${getText('searching')}</span>
        </div>
    `;
    autocompleteContainer.classList.remove('hidden');

    try {
        const lang = currentLang === 'uz' ? 'uz' : currentLang === 'ru' ? 'ru' : 'en';
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=8&addressdetails=1&accept-language=${lang}`;

        const res = await fetch(url, {
            signal: nominatimAbortController.signal,
            headers: {
                'User-Agent': 'MyFoodMap/1.0'
            }
        });

        if (!res.ok) throw new Error('Nominatim error');

        const data = await res.json();

        if (data.length === 0) {
            autocompleteList.innerHTML = `
                <div class="search-no-results">${getText('no_results')}</div>
            `;
            return;
        }

        renderNominatimResults(data);

    } catch (e) {
        if (e.name === 'AbortError') return;
        console.error('Nominatim search error:', e);
        autocompleteList.innerHTML = `
            <div class="search-no-results">${getText('no_results')}</div>
        `;
    }
}

function renderNominatimResults(results) {
    const autocompleteList = document.getElementById('search-autocomplete-list');

    autocompleteList.innerHTML = results.map((item, index) => {
        const displayName = item.display_name;
        const parts = displayName.split(',').map(p => p.trim());
        const mainName = parts[0];
        const subName = parts.slice(1, 3).join(', ');

        // Determine type icon and label
        let typeLabel = getText('place');
        let typeIcon = '';
        const type = item.type || '';
        const category = item.category || '';

        if (type === 'city' || type === 'town' || type === 'village') {
            typeLabel = getText('city');
            typeIcon = '';
        } else if (type === 'country') {
            typeLabel = getText('country');
            typeIcon = '';
        } else if (type === 'state' || type === 'region') {
            typeLabel = getText('state');
            typeIcon = '';
        } else if (category === 'boundary') {
            typeLabel = getText('place');
            typeIcon = '';
        }

        return `
            <div class="search-suggestion" onclick="selectNominatimResult(${index})" data-index="${index}">
                <span class="search-suggestion-icon">${typeIcon}</span>
                <div class="search-suggestion-text">
                    <div class="search-suggestion-main">${escapeHtml(mainName)}</div>
                    <div class="search-suggestion-sub">${escapeHtml(subName)} · ${typeLabel}</div>
                </div>
            </div>
        `;
    }).join('');

    // Store results for selection
    window._nominatimResults = results;
}

function selectNominatimResult(index) {
    const results = window._nominatimResults;
    if (!results || !results[index]) return;

    const item = results[index];
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    const searchInput = document.getElementById('search-input');
    const autocompleteContainer = document.getElementById('search-autocomplete');

    searchInput.value = item.display_name.split(',')[0];
    autocompleteContainer.classList.add('hidden');

    clearSearchMarkers();

    const el = document.createElement('div');
    el.innerHTML = `
        <div style="width:20px;height:20px;background:#007AFF;border-radius:50%;border:3px solid white;box-shadow:0 2px 12px rgba(0,122,255,0.5);animation:markerPulse 1.5s ease-in-out infinite;"></div>
    `;

    const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lon, lat])
        .addTo(map);
    searchMarkers.push(marker);

    let zoom = 14;
    const type = item.type || '';
    if (type === 'country') zoom = 5;
    else if (type === 'state' || type === 'region') zoom = 7;
    else if (type === 'city' || type === 'town') zoom = 11;
    else if (type === 'village') zoom = 13;

    map.flyTo({ center: [lon, lat], zoom: zoom, duration: 1200 });
    showToast(item.display_name.split(',')[0]);
}

function clearSearchMarkers() {
    searchMarkers.forEach(m => m.remove());
    searchMarkers = [];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// LANGUAGE
// ============================================
function getText(key) {
    return i18n[currentLang]?.[key] || i18n['uz']?.[key] || key;
}

async function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (i18n[lang][key]) el.placeholder = i18n[lang][key];
    });
    document.title = i18n[lang].app_name || 'My Food Map';
}

async function changeLanguage(lang) {
    if (lang === currentLang) return;
    await setLang(lang);
    updateLanguageSelectorUI(lang);

    if (!isDemoMode && userData?.id) {
        try {
            const body = { language: lang };
            if (cachedInitData && !cachedInitData.startsWith('demo_mode_')) {
                body.init_data = cachedInitData;
            }
            await fetch(`${API_URL}/api/user/language`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch(e) { console.log('Lang sync error:', e); }
    }

    if (userData) userData.language = lang;

    const msgs = {
        uz: i18n.uz.lang_selected_uz,
        ru: i18n.ru.lang_selected_ru,
        en: i18n.en.lang_selected_en
    };
    showToast(msgs[lang] || msgs['uz']);
}

function updateLanguageSelectorUI(lang) {
    document.querySelectorAll('.lang-option').forEach(btn => {
        const bl = btn.dataset.lang;
        const chk = btn.querySelector('.lang-check');
        if (bl === lang) {
            btn.classList.add('active');
            if (chk) chk.style.display = 'flex';
        } else {
            btn.classList.remove('active');
            if (chk) chk.style.display = 'none';
        }
    });
    const flags = { uz: '🇺🇿', ru: '🇷🇺', en: '🇬🇧' };
    const names = { uz: 'UZ', ru: 'RU', en: 'EN' };
    const fe = document.getElementById('profile-lang-flag');
    const le = document.getElementById('profile-lang');
    if (fe) fe.textContent = flags[lang] || '🌐';
    if (le) le.textContent = names[lang] || lang.toUpperCase();
}

// ============================================
// MAP INIT
// ============================================
function initMap() {
    map = new maplibregl.Map({
        container: 'map',
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: [-98.5795, 39.8283], // [lng, lat]
        zoom: 4,
        attributionControl: false
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    
    // ❌ Default NavigationControl ni o'chiramiz
    // map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // ✅ Custom zoom tugmalari
    document.getElementById('zoom-in').addEventListener('click', () => {
        map.zoomIn({ duration: 250 });
    });
    document.getElementById('zoom-out').addEventListener('click', () => {
        map.zoomOut({ duration: 250 });
    });

    setupMapLongPress();
}

// ============================================
// MAP CLICK SELECTION
// ============================================
function setupMapLongPress() {
    map.on('click', (e) => {
        const latlng = e.lngLat;
        if (!latlng) return;

        if (mapSelectMode === 'pick_point') {
            mapSelectMode = null;
            showMapPointMenu(latlng);
            return;
        }

        if (mapSelectMode === 'waiting_to') {
            setRoutePoint('to', latlng.lat, latlng.lng, `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
        } else if (mapSelectMode === 'waiting_from') {
            setRoutePoint('from', latlng.lat, latlng.lng, `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`);
        }
    });
}

function toggleRoutePanel() {
    document.getElementById('route-panel').classList.toggle('minimized');
}

function minimizeRoutePanel() {
    document.getElementById('route-panel').classList.add('minimized');
}

function expandRoutePanel() {
    document.getElementById('route-panel').classList.remove('minimized');
}

function showMapPointMenu(latlng) {
    const existing = document.getElementById('map-point-menu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.id = 'map-point-menu';
    menu.innerHTML = `
        <div style="padding:10px 14px;border-bottom:1px solid rgba(0,0,0,0.07);display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:11px;color:#8E8E93;font-weight:700;">${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}</div>
            <button onclick="closeMapPointMenu()"
                style="background:rgba(0,0,0,0.06);border:none;border-radius:50%;width:22px;height:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;">✕</button>
        </div>
        <div style="padding:6px;">
            <button onclick="setMapPointAsFrom(${latlng.lat}, ${latlng.lng})"
                style="width:100%;padding:10px 12px;background:none;border:none;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;color:#34C759;text-align:left;display:flex;align-items:center;gap:9px;">
                <span style="width:9px;height:9px;border-radius:50%;background:#fff;border:2.5px solid #34C759;flex-shrink:0;"></span>
                ${getText('start_point')}
            </button>
            <button onclick="setMapPointAsTo(${latlng.lat}, ${latlng.lng})"
                style="width:100%;padding:10px 12px;background:none;border:none;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;color:#FF3B30;text-align:left;display:flex;align-items:center;gap:9px;">
                <span style="width:9px;height:9px;border-radius:50%;background:#fff;border:2.5px solid #FF3B30;flex-shrink:0;"></span>
                ${getText('end_point')}
            </button>
        </div>
    `;

    document.body.appendChild(menu);
    addTempMarker(latlng, '#8E8E93');

    setTimeout(() => { if (document.getElementById('map-point-menu')) closeMapPointMenu(); }, 5000);
}

function closeMapPointMenu() {
    const menu = document.getElementById('map-point-menu');
    if (menu) menu.remove();
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    clearTempMarkers();
}

// ============================================
// TEMP MARKERS
// ============================================
function addTempMarker(latlng, color) {
    const lng = latlng.lng !== undefined ? latlng.lng : latlng[1];
    const lat = latlng.lat !== undefined ? latlng.lat : latlng[0];

    const el = document.createElement('div');
    el.innerHTML = `<div style="width:18px;height:18px;background:${color};border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`;

    const m = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lng, lat])
        .addTo(map);
    tempMarkers.push(m);
}

function clearTempMarkers() {
    tempMarkers.forEach(m => m.remove());
    tempMarkers = [];
}



// ============================================
// ROUTE POINT HELPERS
// ============================================
function setRoutePoint(type, lat, lng, label) {
    if (type === 'from') {
        routeFrom = { lat, lng, label };
        const el = document.getElementById('rp-from-text');
        if (el) { el.textContent = label; el.classList.remove('empty'); }
        addTempMarker({ lat, lng }, '#34C759');

        if (routeTo.lat !== null) {
            mapSelectMode = null;
            openRoutePanel();
            setTimeout(() => calculateRoute(), 350);
        } else {
            openRoutePanel();
            mapSelectMode = 'waiting_to';
            showToast(getText('select_end_point'));
        }
    } else {
        routeTo = { lat, lng, label };
        const el = document.getElementById('rp-to-text');
        if (el) { el.textContent = label; el.classList.remove('empty'); }
        addTempMarker({ lat, lng }, '#FF3B30');

        if (routeFrom.lat !== null) {
            mapSelectMode = null;
            openRoutePanel();
            setTimeout(() => calculateRoute(), 350);
        } else {
            openRoutePanel();
            mapSelectMode = 'waiting_from';
            showToast(getText('select_start_point'));
        }
    }
}

function startMapPointPicker() {
    if (mapSelectMode === 'pick_point') {
        showToast(getText('pick_on_map'));
        return;
    }
    mapSelectMode = 'pick_point';
    showToast(getText('pick_on_map'));
}

function setMapPointAsFrom(lat, lng) {
    closeMapPointMenu();
    setRoutePoint('from', lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
}

function setMapPointAsTo(lat, lng) {
    closeMapPointMenu();
    setRoutePoint('to', lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
}

function openRoutePanel() {
    const panel = document.getElementById('route-panel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        panel.classList.remove('minimized');
        const fromEl = document.getElementById('rp-from-text');
        const toEl   = document.getElementById('rp-to-text');
        if (fromEl) {
            if (routeFrom.lat !== null) { fromEl.textContent = routeFrom.label; fromEl.classList.remove('empty'); }
            else { fromEl.textContent = '—'; fromEl.classList.add('empty'); }
        }
        if (toEl) {
            if (routeTo.lat !== null) { toEl.textContent = routeTo.label; toEl.classList.remove('empty'); }
            else { toEl.textContent = '—'; toEl.classList.add('empty'); }
        }
    }
}

// ============================================
// LOCATION
// ============================================
function locateUser() {
    if (!navigator.geolocation) { showToast(getText('geolocation_not_supported')); return; }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            userLocation = [lat, lng];
            map.flyTo({ center: [lng, lat], zoom: 13, duration: 1000 });

            const el = document.createElement('div');
            el.innerHTML = `<div style="width:16px;height:16px;background:#34C759;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`;

            new maplibregl.Marker({ element: el, anchor: 'center' })
                .setLngLat([lng, lat])
                .setPopup(new maplibregl.Popup({ offset: 10 }).setText(getText('you_are_here')))
                .addTo(map)
                .togglePopup();

            loadNearby(lat, lng);
        },
        (err) => showToast(getText('location_not_detected') + ': ' + err.message)
    );
}

function setFromCurrent() {
    if (!userLocation) { locateUser(); return; }
    const [lat, lng] = userLocation;
    setRoutePoint('from', lat, lng, getText('my_location'));
    const btn = document.querySelector('.rp-loc-btn');
    if (btn) {
        btn.style.background = '#34C759';
        btn.style.color = '#fff';
        setTimeout(() => { btn.style.background = ''; btn.style.color = ''; }, 500);
    }
}

function swapRoute() {
    const tmp = { ...routeFrom };
    routeFrom = { ...routeTo };
    routeTo = tmp;

    const fromEl = document.getElementById('rp-from-text');
    const toEl   = document.getElementById('rp-to-text');
    if (fromEl) {
        if (routeFrom.lat !== null) { fromEl.textContent = routeFrom.label; fromEl.classList.remove('empty'); }
        else { fromEl.textContent = '—'; fromEl.classList.add('empty'); }
    }
    if (toEl) {
        if (routeTo.lat !== null) { toEl.textContent = routeTo.label; toEl.classList.remove('empty'); }
        else { toEl.textContent = '—'; toEl.classList.add('empty'); }
    }

    const btn = document.querySelector('.rp-swap');
    if (btn) {
        btn.style.transform = 'rotate(180deg)';
        setTimeout(() => btn.style.transform = '', 300);
    }
}

// ============================================
// PLACES
// ============================================
async function loadPlaces(category = 'all', search = '') {
    try {
        let url = `${API_URL}/api/places?`;
        if (search) url += `search=${encodeURIComponent(search)}`;
        const res = await fetch(url);
        const data = await res.json();
        places = data.success ? data.data : getDemoPlaces();
        renderMarkers();
    } catch (e) {
        places = getDemoPlaces();
        renderMarkers();
    }
}

async function loadAllPlaces() {
    try {
        const res = await fetch(`${API_URL}/api/places/all`);
        const data = await res.json();
        allPlaces = data.success ? data.data : getDemoPlaces();
    } catch (e) { allPlaces = getDemoPlaces(); }
}

function getDemoPlaces() {
    return [
        { id:1, name:"ARZU CHICAGO", lat:42.0451, lng:-87.9073, address:"Mt.Prospect, IL", category:"food", phone:"+13127744771", telegram:"@arzu_chicago", work_time:"11:00-23:00", delivery:true },
        { id:2, name:"SHIRIN FOOD", lat:47.2529, lng:-122.4443, address:"Tacoma, WA", category:"food", phone:"+19296770708", telegram:"@SHIRIN_N1FOOD", work_time:"24/7", delivery:true },
        { id:3, name:"CHAYXANA AMIR", lat:38.6170, lng:-121.5380, address:"Sacramento, CA", category:"food", phone:"+19167506977", telegram:"@N1_Ibragim", work_time:"24/7", delivery:true }
    ];
}

async function loadNearby(lat, lng) {
    try {
        const res = await fetch(`${API_URL}/api/nearby?lat=${lat}&lng=${lng}&radius=50`);
        const data = await res.json();
        if (data.success && data.data.length) console.log('Nearby:', data.data);
    } catch (e) { console.error(e); }
}

// ============================================
// MARKERS - Single SVG icon for all restaurants
// ============================================
function renderMarkers() {
    markers.forEach(m => m.remove());
    markers = [];

    const valid = places.filter(p => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng));

    const pinSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.5L17.5 16C20.5 13 20.5 8.5 17.5 5.5C14.5 2.5 9.5 2.5 6.5 5.5C3.5 8.5 3.5 13 6.5 16L12 21.5Z" fill="#34C759" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
            <g fill="white">
                <!-- Fork -->
                <rect x="9" y="7" width="1.6" height="6.5" rx="0.4"/>
                <rect x="8.2" y="5.5" width="0.45" height="3.2" rx="0.2"/>
                <rect x="9.05" y="5.5" width="0.45" height="3.2" rx="0.2"/>
                <rect x="9.9" y="5.5" width="0.45" height="3.2" rx="0.2"/>
                <!-- Knife -->
                <path d="M13.5 5.5h1.2c0.45 0 0.8 0.3 0.8 0.8v3.5c0 0.45-0.35 0.8-0.8 0.8h-1.2V5.5z"/>
                <rect x="13.5" y="10.5" width="2" height="3.5" rx="0.4"/>
            </g>
        </svg>`;

    valid.forEach((place) => {
        const el = document.createElement('div');
        el.innerHTML = `
            <div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 2px 8px rgba(52,199,89,0.45));transition:transform 0.2s ease;cursor:pointer;">
                ${pinSvg}
            </div>
        `;

        el.addEventListener('mouseenter', () => { el.firstElementChild.style.transform = 'scale(1.15)'; });
        el.addEventListener('mouseleave', () => { el.firstElementChild.style.transform = 'scale(1)'; });

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            showPlaceCard(place);
            map.flyTo({ center: [place.lng, place.lat], zoom: 16, duration: 600 });
        });

        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat([place.lng, place.lat])
            .addTo(map);

        markers.push(marker);
    });

    if (valid.length > 0) {
        const bounds = new maplibregl.LngLatBounds();
        valid.forEach(p => bounds.extend([p.lng, p.lat]));
        map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 900 });
    } else {
        map.flyTo({ center: [-98.5795, 39.8283], zoom: 4 });
    }
}

// ============================================
// PLACE CARD
// ============================================
function showPlaceCard(place) {
    selectedPlace = place;

    // Reset to compact state
    const card = document.getElementById('place-card');
    const desc = document.getElementById('card-description');
    card.classList.remove('expanded');
    desc.classList.add('hidden');
    desc.innerHTML = '';

    // Update name and category
    document.getElementById('card-name').textContent = place.name || getText('place_name');
    document.getElementById('card-category').textContent = place.category || getText('food');

    document.getElementById('place-card').classList.remove('hidden');
}

// Toggle place card expand/collapse
function togglePlaceCard() {
    const card = document.getElementById('place-card');
    const desc = document.getElementById('card-description');

    if (card.classList.contains('expanded')) {
        // Currently expanded -> collapse (yopish)
        card.classList.remove('expanded');
        desc.classList.add('hidden');
    } else {
        // Currently collapsed -> expand (ochish)
        card.classList.add('expanded');
        desc.classList.remove('hidden');
        // Generate description if not already done
        if (selectedPlace && !desc.innerHTML.trim()) {
            updateCardDescription(selectedPlace);
        }
    }
}

// Build text description in the format user wants
function updateCardDescription(place) {
    const descEl = document.getElementById('card-description');
    if (!descEl) return;

    let html = '';

    // Name
    html += `🍽 <strong>${escapeHtml(place.name || getText('place_name'))}</strong>\n`;

    // Address + Google Maps
    if (place.address || place.city) {
        const address = place.address || place.city || '';
        html += `📍 ${escapeHtml(address)}`;
        if (place.lat && place.lng) {
            html += ` (<a href="https://www.google.com/maps?q=${place.lat},${place.lng}" target="_blank">Google Maps</a>)`;
        }
        html += `\n`;
    }

    // MENU - alohida ko'rsatish (agar bo'lsa)
    if (place.menu_url) {
        html += `📋 <a href="${escapeHtml(place.menu_url)}" target="_blank" style="color:#007AFF;text-decoration:none;font-weight:700;cursor:pointer;">${getText('menu')}</a>\n`;
    }

    // Agar description/text_user bo'lsa — shuni chiqaramiz
    const desc = (place.description || place.text_user || '').trim();
    if (desc) {
        const lines = desc.split('\n').filter(l => l.trim());
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('🍽') && !trimmed.startsWith('📍') && !trimmed.startsWith('📋')) {
                html += `${escapeHtml(trimmed)}\n`;
            }
        });
    } else {
        // Description bo'lmasa — alohida maydonlardan chiqaramiz
        if (place.work_time) {
            html += `⏰ ${getText('work_time')}: ${escapeHtml(place.work_time)}\n`;
        }
        if (place.delivery) {
            html += `🚘 ${getText('delivery')}: Mavjud\n`;
        }
        if (place.phone) {
            html += `📞 ${getText('phone')}: <a href="tel:${place.phone.replace(/\s/g, '')}">${escapeHtml(place.phone)}</a>\n`;
        }
        if (place.telegram) {
            const tgUsername = place.telegram.replace('@', '');
            html += `✈️ Telegram: <a href="https://t.me/${tgUsername}" target="_blank">${escapeHtml(place.telegram)}</a>\n`;
        }
    }

    descEl.innerHTML = html.trim();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function closeCard() {
    document.getElementById('place-card').classList.add('hidden');
}

// ============================================
// CARD ACTIONS
// ============================================
function startRouteToPlace() {
    if (!selectedPlace) return;

    const doRoute = () => {
        setRoutePoint('to', selectedPlace.lat, selectedPlace.lng, selectedPlace.name);
        if (userLocation) {
            const [lat, lng] = userLocation;
            setRoutePoint('from', lat, lng, getText('my_location'));
        }
        closeCard();
        openRoutePanel();
        if (routeFrom.lat !== null && routeTo.lat !== null) {
            setTimeout(() => calculateRoute(), 350);
        }
    };

    if (!userLocation) {
        showToast(getText('locating'));
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLocation = [pos.coords.latitude, pos.coords.longitude];
                const el = document.createElement('div');
                el.innerHTML = `<div style="width:16px;height:16px;background:#34C759;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`;
                new maplibregl.Marker({ element: el, anchor: 'center' })
                    .setLngLat([pos.coords.longitude, pos.coords.latitude])
                    .setPopup(new maplibregl.Popup({ offset: 10 }).setText(getText('you_are_here')))
                    .addTo(map);
                doRoute();
            },
            (err) => { showToast(getText('location_not_detected')); doRoute(); },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
        return;
    }
    doRoute();
}

function clearRouteLine() {
    if (map.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
    if (map.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);
    routeMarkers.forEach(m => m.remove());
    routeMarkers = [];
}

async function calculateRoute() {
    if (routeFrom.lat === null || routeTo.lat === null) {
        showToast(getText('please_select_locations'));
        return;
    }

    const startLng = routeFrom.lng, startLat = routeFrom.lat;
    const endLng = routeTo.lng, endLat = routeTo.lat;

    if (!isFinite(startLat) || !isFinite(startLng) || !isFinite(endLat) || !isFinite(endLng)) {
        showToast(getText('please_select_locations'));
        return;
    }
    if (Math.abs(startLat) > 90 || Math.abs(endLat) > 90) {
        showToast(getText('invalid_coords'));
        return;
    }

    const btn = document.getElementById('rp-build-btn');
    const origText = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;

    clearRouteLine();

    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await res.json();

        if (!data.routes || data.routes.length === 0) {
            showToast(getText('route_not_found'));
            btn.textContent = origText; btn.disabled = false;
            return;
        }

        const route = data.routes[0];
        const dist = (route.distance / 1000).toFixed(1);
        const time = Math.round(route.duration / 60);

        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: route.geometry
        };

        map.addSource(ROUTE_SOURCE_ID, { type: 'geojson', data: geojson });
        map.addLayer({
            id: ROUTE_LAYER_ID,
            type: 'line',
            source: ROUTE_SOURCE_ID,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#007AFF', 'line-width': 4, 'line-opacity': 0.85 }
        });

        const startEl = document.createElement('div');
        startEl.innerHTML = `<div style="background:#34C759;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.28);"></div>`;
        const endEl = document.createElement('div');
        endEl.innerHTML = `<div style="background:#FF3B30;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.28);"></div>`;

        const m1 = new maplibregl.Marker({ element: startEl, anchor: 'center' }).setLngLat([startLng, startLat]).addTo(map);
        const m2 = new maplibregl.Marker({ element: endEl, anchor: 'center' }).setLngLat([endLng, endLat]).addTo(map);
        routeMarkers.push(m1, m2);

        document.getElementById('route-dist').textContent = `${dist} km`;
        document.getElementById('route-time').textContent = `${time} min`;
        document.getElementById('route-info').classList.remove('hidden');
        btn.classList.add('hidden');

        const coords = route.geometry.coordinates;
        const bounds = new maplibregl.LngLatBounds();
        coords.forEach(c => bounds.extend(c));
        map.fitBounds(bounds, { padding: { top: 50, bottom: 300, left: 50, right: 50 }, maxZoom: 16, duration: 900 });

    } catch (e) {
        showToast(getText('route_error'));
        btn.textContent = origText; btn.disabled = false;
    }
}

function openInMaps() {
    if (!selectedPlace) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedPlace.lat},${selectedPlace.lng}`;
    window.open(url, '_blank');
}

function callPlace() {
    if (!selectedPlace?.phone) { showToast(getText('no_address')); return; }
    window.open(`tel:${selectedPlace.phone.replace(/\s/g, '')}`, '_self');
}

// ============================================
// ROUTE PANEL
// ============================================
function closeRoute() {
    const panel = document.getElementById('route-panel');
    panel.style.transform = 'translateY(110%)';
    panel.style.opacity = '0';
    panel.style.transition = 'all 0.28s cubic-bezier(0.32,0.72,0,1)';

    mapSelectMode = null;
    clearRouteLine();

    setTimeout(() => {
        panel.classList.add('hidden');
        panel.classList.remove('minimized');
        panel.style.transform = '';
        panel.style.opacity = '';
        panel.style.transition = '';

        routeFrom = { lat: null, lng: null, label: '' };
        routeTo   = { lat: null, lng: null, label: '' };

        const fromEl = document.getElementById('rp-from-text');
        const toEl   = document.getElementById('rp-to-text');
        if (fromEl) { fromEl.textContent = '—'; fromEl.classList.add('empty'); }
        if (toEl)   { toEl.textContent = '—'; toEl.classList.add('empty'); }

        document.getElementById('route-info')?.classList.add('hidden');

        const btn = document.getElementById('rp-build-btn');
        if (btn) { btn.classList.remove('hidden'); btn.disabled = false; btn.textContent = getText('build_route'); }

        clearTempMarkers();
    }, 300);
}

// ============================================
// SEARCH & FILTERS
// ============================================
let searchTimeout;

function setupEventListeners() {
    setupRoutePanelDrag();
    setupCardSwipe();

    const toggleBtn = document.querySelector('.rp-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleRoutePanel();
        });
    }

    const rp = document.getElementById('route-panel');
    rp.addEventListener('click', (e) => {
        if (e.target.closest('.rp-toggle')) return;
        if (rp.classList.contains('minimized')) {
            expandRoutePanel();
        }
    });
}

function setFilter(cat) {
    // No-op - filters removed
}

function toggleFilters() {
    // No-op - filters removed
}

// ============================================
// CARD SWIPE GESTURES (Place Card)
// ============================================
function setupCardSwipe() {
    const card = document.getElementById('place-card');
    if (!card) return;

    let startY = 0;
    let startTime = 0;

    card.addEventListener('touchstart', (e) => {
        const target = e.target;
        if (target.closest('button') || target.closest('a')) return;
        
        startY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
        if (startY === 0) return;

        const endY = e.changedTouches[0].clientY;
        const diffY = startY - endY;
        const elapsed = Date.now() - startTime;

        startY = 0;

        if (elapsed > 400) return;
        if (Math.abs(diffY) < 50) return;

        if (diffY > 0) {
            // ⬆️ TEPAGA — to'liq ochish
            if (!card.classList.contains('expanded')) {
                togglePlaceCard();
            }
        } else {
            // ⬇️ PASTGA
            if (card.classList.contains('expanded')) {
                // To'liq ochiq bo'lsa → qisqartirish (compact)
                togglePlaceCard();
            } else {
                // Qisqa ko'rinishda bo'lsa → to'liq yopish (X vazifasi)
                closeCard();
            }
        }
    }, { passive: true });
}


// ============================================
// ROUTE PANEL DRAG (swipe down to close)
// ============================================
let panelDragY = 0, panelDragging = false;




function setupRoutePanelDrag() {
    const handle = document.getElementById('rp-drag-handle');
    const panel  = document.getElementById('route-panel');
    if (!handle || !panel) return;

    handle.addEventListener('mousedown',  startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: true });
}

function startDrag(e) {
    const panel = document.getElementById('route-panel');
    if (panel.classList.contains('minimized')) {
        expandRoutePanel();
        return;
    }
    panelDragging = true;
    panelDragY = e.touches ? e.touches[0].clientY : e.clientY;
    panel.style.transition = 'none';

    document.addEventListener('mousemove',  moveDrag);
    document.addEventListener('touchmove',  moveDrag, { passive: true });
    document.addEventListener('mouseup',    stopDrag);
    document.addEventListener('touchend',   stopDrag);
}

function moveDrag(e) {
    if (!panelDragging) return;
    const panel = document.getElementById('route-panel');
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = Math.max(0, y - panelDragY);
    panel.style.transform = `translateY(${delta}px)`;
}

function stopDrag(e) {
    if (!panelDragging) return;
    panelDragging = false;
    const panel = document.getElementById('route-panel');
    const m = panel.style.transform.match(/translateY\((\d+)px\)/);
    const delta = m ? parseInt(m[1]) : 0;

    document.removeEventListener('mousemove',  moveDrag);
    document.removeEventListener('touchmove',  moveDrag);
    document.removeEventListener('mouseup',    stopDrag);
    document.removeEventListener('touchend',   stopDrag);

    if (delta > 80) {
        closeRoute();
    } else {
        panel.style.transition = '';
        panel.style.transform = '';
    }
}

// ============================================
// GOOGLE MAPS URL PARSER + MAP PICKER
// ============================================











// ============================================
// TABS
// ============================================
function showTab(tab, btn) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const profilePage = document.getElementById('profile-page');
    const mapDiv = document.getElementById('map');
    const header = document.querySelector('.header');
    const searchContainer = document.querySelector('.search-container');
    const placeCard = document.getElementById('place-card');
    const routePanel = document.getElementById('route-panel');
    const customZoom = document.getElementById('custom-zoom');
    const fabLocation = document.querySelector('.fab-location');

    if (tab === 'profile') {
        updateProfileUI();
        profilePage.classList.add('active');
        mapDiv.style.visibility = 'hidden';
        if (header) header.style.display = 'none';
        if (searchContainer) searchContainer.style.display = 'none';
        if (placeCard) placeCard.classList.add('hidden');
        if (routePanel) routePanel.classList.add('hidden');
        if (customZoom) customZoom.classList.add('hidden');
        if (fabLocation) fabLocation.classList.add('hidden');
    } else {
        profilePage.classList.remove('active');
        mapDiv.style.visibility = 'visible';
        if (header) header.style.display = '';
        if (searchContainer) searchContainer.style.display = '';
        if (customZoom) customZoom.classList.remove('hidden');
        if (fabLocation) fabLocation.classList.remove('hidden');
    }
}

function updateProfileUI() {
    const name = userData?.name || 'User';
    const uname = userData?.username ? '@' + userData.username : '';
    const uid = userData?.id || '—';
    const lang = (userData?.language || currentLang || 'uz').toUpperCase();

    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-username').textContent = uname;
    document.getElementById('profile-id').textContent = uid;

    const flags = { UZ: '🇺🇿', RU: '🇷🇺', EN: '🇬🇧' };
    const fe = document.getElementById('profile-lang-flag');
    const le = document.getElementById('profile-lang');
    if (fe) fe.textContent = flags[lang] || '🌐';
    if (le) le.textContent = lang;

    const avatarImg = document.getElementById('profile-avatar');
    const avatarFb  = document.getElementById('profile-avatar-fb');
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user?.photo_url) {
        avatarImg.src = tg.initDataUnsafe.user.photo_url;
        avatarImg.classList.remove('hidden');
        avatarFb.classList.add('hidden');
    } else {
        avatarImg.classList.add('hidden');
        avatarFb.classList.remove('hidden');
        avatarFb.textContent = name.charAt(0).toUpperCase();
    }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================
function showAddForm() {
    if (isDemoMode) { showToast(getText('demo_mode_message')); return; }
    stopPlaceMapPicker();
    document.getElementById('add-form').classList.remove('hidden');
}

function closeAddForm() { 
    stopPlaceMapPicker();
    document.getElementById('add-form').classList.add('hidden'); 
}

async function savePlace() {
    if (isDemoMode) { showToast(getText('demo_mode_message')); return; }
    const place = {
        name: document.getElementById('new-name').value,
        lat:  parseFloat(document.getElementById('new-lat')?.value || 0),
        lng:  parseFloat(document.getElementById('new-lng')?.value || 0),
        address: document.getElementById('new-address')?.value || '',
        text_user:    document.getElementById('new-details')?.value || '',
        text_channel: document.getElementById('new-details')?.value || ''
    };
    if (!place.name) { showToast(getText('name_placeholder')); return; }
    try {
        const res = await fetch(`${API_URL}/api/places`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: cachedInitData, place })
        });
        const data = await res.json();
        if (data.success) {
            closeAddForm(); await loadPlaces(); await loadAllPlaces();
            showToast(getText('place_added'));
        } else { showToast(getText('save_error') + ': ' + data.error); }
    } catch (e) { showToast(getText('save_error')); }
}

function showPlacesList() {
    const modal = document.getElementById('places-list-modal');
    const content = document.getElementById('places-list-content');
    if (!allPlaces.length) {
        content.innerHTML = `<p style="text-align:center;color:#8E8E93;padding:16px;font-size:13px;">${getText('no_places_found')}</p>`;
    } else {
        content.innerHTML = allPlaces.map(place => {
            const hasCoords = place.lat && place.lng;
            return `
                <div style="padding:10px 12px;border-bottom:1px solid #F2F2F7;display:flex;justify-content:space-between;align-items:center;">
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:800;font-size:13px;color:#000;margin-bottom:2px;">${place.name}</div>
                        <div style="font-size:11px;color:#8E8E93;font-weight:600;">${place.address || getText('no_address')}</div>
                        <div style="font-size:10px;margin-top:3px;">
                            ${hasCoords
                                ? `<span style="color:#34C759;font-weight:700;">${place.lat?.toFixed(4)}, ${place.lng?.toFixed(4)}</span>`
                                : `<span style="color:#FF3B30;font-weight:700;">${getText('no_coords')}</span>`
                            }
                        </div>
                    </div>
                    ${!hasCoords && !isDemoMode ? `
                        <button onclick="geocodeSinglePlace(${place.id})"
                            style="background:linear-gradient(135deg,#FF9500,#FF6B00);color:white;border:none;padding:5px 11px;border-radius:9999px;cursor:pointer;font-size:10px;font-weight:800;">
                            ${getText('find')}
                        </button>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    modal.classList.remove('hidden');
}
function closePlacesList() { document.getElementById('places-list-modal').classList.add('hidden'); }

async function geocodeSinglePlace(placeId) {
    if (isDemoMode) { showToast(getText('demo_mode_message')); return; }
    try {
        const btn = event.target;
        btn.textContent = '...'; btn.disabled = true;
        const res = await fetch(`${API_URL}/api/places/${placeId}/geocode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: cachedInitData })
        });
        const data = await res.json();
        if (data.success) {
            showToast(getText('coordinates') + ' ' + getText('updated') + '!');
            await loadPlaces(); await loadAllPlaces(); showPlacesList();
        } else {
            showToast(getText('not_found') + ': ' + data.error);
            btn.textContent = getText('find'); btn.disabled = false;
        }
    } catch (e) { showToast(getText('geocode_error')); }
}

async function geocodeAllPlaces() {
    if (isDemoMode) { showToast(getText('demo_mode_message')); return; }
    if (!confirm(getText('update_coords_confirm'))) return;
    try {
        const res = await fetch(`${API_URL}/api/admin/geocode-all`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: cachedInitData })
        });
        const data = await res.json();
        if (data.success) {
            showToast(`${getText('updated')}: ${data.updated} | ${getText('failed')}: ${data.failed}`);
            await loadPlaces(); await loadAllPlaces();
        } else { showToast(getText('server_error') + ': ' + data.error); }
    } catch (e) { showToast(getText('server_error')); }
}

function toggleMenu() {}
function goToAdmin() {
    const tg = window.Telegram?.WebApp;
    const initData = tg?.initData || sessionStorage.getItem('tg_init_data') || '';
    if (initData) sessionStorage.setItem('tg_init_data', initData);
    const params = initData ? '?init_data=' + encodeURIComponent(initData) : '';
    window.location.href = 'admin.html' + params;
}

// ============================================
// TOAST
// ============================================
function showToast(message) {
    const old = document.querySelector('.toast-notification');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position:fixed; bottom:72px; left:50%;
        transform:translateX(-50%) translateY(20px);
        background:rgba(0,0,0,0.80);
        backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
        color:white; padding:9px 18px; border-radius:9999px;
        font-size:12px; font-weight:700; z-index:9999;
        box-shadow:0 4px 16px rgba(0,0,0,0.18);
        opacity:0; transition:all 0.28s cubic-bezier(0.34,1.56,0.64,1);
        white-space:nowrap; max-width:84vw;
        overflow:hidden; text-overflow:ellipsis;
        letter-spacing:-0.01em;
        font-family:'Nunito',-apple-system,sans-serif;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 280);
    }, 2600);
}
