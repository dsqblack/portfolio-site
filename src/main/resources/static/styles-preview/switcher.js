/* ============================================================
   风格切换器 — 注入到主站与所有预览页顶部
   用法：在页面 </body> 前引入 <script src="/styles-preview/switcher.js"></script>
   ============================================================ */
(function () {
  var STYLES = [
    { id: '', fileName: null, zh: '主站', en: 'Editorial', n: 'S00' },
    { fileName: 's01-editorial', zh: '编辑风', en: 'Editorial', n: 'S01' },
    { fileName: 's02-swiss', zh: '瑞士极简', en: 'Swiss', n: 'S02' },
    { fileName: 's03-cyberpunk', zh: '赛博朋克', en: 'Cyberpunk', n: 'S03' },
    { fileName: 's04-newspaper', zh: '报纸风', en: 'Newspaper', n: 'S04' },
    { fileName: 's05-glass', zh: '玻璃拟态', en: 'Glass', n: 'S05' },
    { fileName: 's06-neumorphism', zh: '新拟物', en: 'Neumorphism', n: 'S06' },
    { fileName: 's07-memphis', zh: '孟菲斯', en: 'Memphis', n: 'S07' },
    { fileName: 's08-bauhaus', zh: '包豪斯', en: 'Bauhaus', n: 'S08' },
    { fileName: 's09-vaporwave', zh: '蒸汽波', en: 'Vaporwave', n: 'S09' },
    { fileName: 's10-aurora', zh: '极光渐变', en: 'Aurora', n: 'S10' },
    { fileName: 's11-terminal', zh: '终端', en: 'Terminal', n: 'S11' },
    { fileName: 's12-magazine', zh: '杂志封面', en: 'Magazine', n: 'S12' },
    { fileName: 's13-handdrawn', zh: '手绘涂鸦', en: 'Handdrawn', n: 'S13' },
    { fileName: 's14-pixel', zh: '像素风', en: 'Pixel', n: 'S14' },
    { fileName: 's15-film', zh: '复古胶片', en: 'Film', n: 'S15' },
    { fileName: 's16-wabisabi', zh: '日式侘寂', en: 'Wabi-sabi', n: 'S16' },
    { fileName: 's17-industrial', zh: '工业机械', en: 'Industrial', n: 'S17' },
    { fileName: 's18-international', zh: '瑞士国际', en: 'Intl', n: 'S18' },
    { fileName: 's19-popart', zh: '波普艺术', en: 'Pop Art', n: 'S19' },
    { fileName: 's20-y2k', zh: 'Y2K 液态金属', en: 'Y2K Chrome', n: 'S20' }
  ];

  // 当前页面判断
  var path = location.pathname;
  var current = '';
  if (path.indexOf('/styles-preview/') === 0) {
    var m = path.match(/\/(s\d+-[a-z0-9]+)\.html/);
    if (m) current = m[1];
  }

  function url(s) {
    return s.fileName
      ? '/styles-preview/' + s.fileName + '.html'
      : '/';
  }

  // ---------- 样式 ----------
  var css = '' +
    '#style-switch{position:fixed;left:0;right:0;bottom:0;z-index:99999;' +
      'background:rgba(18,18,22,.94);backdrop-filter:blur(14px);' +
      'border-top:1px solid rgba(255,255,255,.12);' +
      'font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;' +
      'transition:transform .25s cubic-bezier(.4,0,.2,1);' +
      'box-shadow:0 -6px 24px rgba(0,0,0,.25)}' +
    '#style-switch.collapsed{transform:translateY(calc(100% - 44px))}' +
    '#style-switch .sw-bar{height:44px;display:flex;align-items:center;gap:12px;' +
      'padding:0 16px;color:#e8e8ea;font-size:13px}' +
    '#style-switch .sw-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;' +
      'font-weight:600;letter-spacing:.02em;user-select:none;white-space:nowrap}' +
    '#style-switch .sw-toggle .dot{width:8px;height:8px;border-radius:50%;' +
      'background:#7c9dff;box-shadow:0 0 8px #7c9dff}' +
    '#style-switch .sw-current{color:#8a8a94;font-size:12px;' +
      'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}' +
    '#style-switch .sw-current b{color:#c8c8d0;font-weight:500}' +
    '#style-switch .sw-arrow{color:#8a8a94;font-size:11px;transition:transform .25s}' +
    '#style-switch.collapsed .sw-arrow{transform:rotate(180deg)}' +
    '#style-switch .sw-list{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px 14px;' +
      'max-height:40vh;overflow-y:auto}' +
    '#style-switch .sw-item{display:flex;align-items:center;gap:6px;padding:6px 11px;' +
      'border-radius:7px;background:rgba(255,255,255,.06);color:#c8c8d0;' +
      'font-size:12.5px;text-decoration:none;border:1px solid transparent;' +
      'transition:.15s;white-space:nowrap}' +
    '#style-switch .sw-item:hover{background:rgba(124,157,255,.2);color:#fff}' +
    '#style-switch .sw-item .n{font-family:ui-monospace,monospace;font-size:11px;' +
      'color:#7c9dff;font-weight:600}' +
    '#style-switch .sw-item.active{background:#7c9dff;color:#0d0d12;font-weight:600}' +
    '#style-switch .sw-item.active .n{color:#0d0d12;opacity:.7}' +
    '#style-switch .sw-item.home{background:rgba(255,255,255,.1)}' +
    '#style-switch .sw-item.home.active{background:#7c9dff}' +
    '@media(max-width:640px){#style-switch .sw-list{max-height:50vh}' +
      '#style-switch .sw-current{display:none}}';

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ---------- DOM ----------
  var box = document.createElement('div');
  box.id = 'style-switch';
  box.className = 'collapsed'; // 默认折叠，不挡页面

  var cur = STYLES.filter(function (s) { return s.fileName === current; })[0] || STYLES[0];

  var items = STYLES.map(function (s) {
    var cls = 'sw-item' + (s.fileName === '' ? ' home' : '') +
      (s.fileName === current ? ' active' : '');
    return '<a class="' + cls + '" href="' + url(s) + '">' +
      '<span class="n">' + s.n + '</span>' + s.zh + '</a>';
  }).join('');

  box.innerHTML =
    '<div class="sw-bar">' +
      '<div class="sw-toggle" id="sw-toggle">' +
        '<span class="dot"></span><span>风格切换</span>' +
        '<span class="sw-arrow">▲</span>' +
      '</div>' +
      '<div class="sw-current">当前：<b>' + cur.n + ' ' + cur.zh + '</b></div>' +
    '</div>' +
    '<div class="sw-list">' + items + '</div>';

  document.body.appendChild(box);

  document.getElementById('sw-toggle').addEventListener('click', function () {
    box.classList.toggle('collapsed');
  });

  // 给页面底部留出折叠条高度，避免遮挡内容
  document.body.style.paddingBottom = '44px';
})();
