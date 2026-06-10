(function () {
  var STORAGE_KEY = "registration.lang";

  var dictionaries = {
    en: {
      brand: "Together Mart",
      speed: "SPEED",
      signupTitle: "Sign Up",
      termsHeaderLabel: "Terms and Conditions",
      cancel: "Cancel",
      save: "Save",
      agreeAndSignup: "Agree and Sign Up",
      memberGeneral: "General Member",
      memberBusiness: "Business Member",
      customerNameLabel: "Customer Name",
      mobileLabel: "Mobile Number",
      businessNameLabel: "Business Name",
      businessNumberLabel: "Business Registration No.",
      addressLabel: "Address",
      requiredLabel: "(Required)",
      termsBody:
        '<b class="text-lg mb-4">Membership Terms</b>' +
        '<b class="mt-6 mb-4">Consent to Registration and Personal Information Use</b>' +
        'Thank you for visiting our store.<br /><br />' +
        'To provide membership services, we collect and use personal information with your consent as described below.<br /><br />' +
        '<b class="mt-6 mb-4">1. Purpose of Collection and Use</b>' +
        'We collect only the minimum information required for member identification, point accumulation/use, customer support, and delivery services.<br /><br />' +
        '<table class="table-fix mt-6 leading-tight">' +
        '<tbody>' +
        '<tr><td class="border border-slate-300 p-1">Type</td><td class="border border-slate-300 p-1">Collected Data</td><td class="border border-slate-300 p-1">Purpose</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">Required</td><td class="border border-slate-300 p-1">Name, Mobile</td><td class="border border-slate-300 p-1">Points, Support, Verification</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">Optional</td><td class="border border-slate-300 p-1">Address</td><td class="border border-slate-300 p-1">Delivery</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">Optional</td><td class="border border-slate-300 p-1">Birth Date, Gender</td><td class="border border-slate-300 p-1">Member Management, Events</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">Optional</td><td class="border border-slate-300 p-1">Business Name, Number</td><td class="border border-slate-300 p-1">Tax Invoice, Support</td></tr>' +
        '</tbody>' +
        '</table><br />' +
        '<b class="mt-6 mb-4">2. Retention Period</b>' +
        'Personal information is retained until the purpose of collection is achieved or deletion is requested, unless required by law.<br /><br />' +
        '<b class="mt-6 mb-4">3. Third-party Provision</b>' +
        'We do not provide personal information to third parties unless required by law or separately consented.<br /><br />' +
        '<b class="mt-6 mb-4">4. Membership Withdrawal</b>' +
        'Members may request withdrawal at any time through in-store channels.<br /><br />',
    },
    zh: {
      brand: "Together Mart",
      speed: "SPEED",
      signupTitle: "注册",
      termsHeaderLabel: "使用条款",
      cancel: "取消",
      save: "保存",
      agreeAndSignup: "同意并注册",
      memberGeneral: "普通会员",
      memberBusiness: "企业会员",
      customerNameLabel: "客户姓名",
      mobileLabel: "手机号",
      businessNameLabel: "企业名称",
      businessNumberLabel: "营业执照号",
      addressLabel: "地址",
      requiredLabel: "(必填)",
      termsBody:
        '<b class="text-lg mb-4">会员注册条款</b>' +
        '<b class="mt-6 mb-4">注册与个人信息提供同意</b>' +
        '感谢您访问本店。<br /><br />' +
        '为提供会员服务，我们将按以下内容在您同意后收集和使用必要的个人信息。<br /><br />' +
        '<b class="mt-6 mb-4">1. 收集与使用目的</b>' +
        '我们仅收集提供积分、客户服务、身份确认与配送所需的最少信息。<br /><br />' +
        '<table class="table-fix mt-6 leading-tight">' +
        '<tbody>' +
        '<tr><td class="border border-slate-300 p-1">类别</td><td class="border border-slate-300 p-1">收集项</td><td class="border border-slate-300 p-1">用途</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">必填</td><td class="border border-slate-300 p-1">姓名、手机号</td><td class="border border-slate-300 p-1">积分、咨询、本人确认</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">选填</td><td class="border border-slate-300 p-1">地址</td><td class="border border-slate-300 p-1">配送服务</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">选填</td><td class="border border-slate-300 p-1">生日、性别</td><td class="border border-slate-300 p-1">会员管理、活动</td></tr>' +
        '<tr><td class="border border-slate-300 p-1">选填</td><td class="border border-slate-300 p-1">企业名称、执照号</td><td class="border border-slate-300 p-1">发票、客户咨询</td></tr>' +
        '</tbody>' +
        '</table><br />' +
        '<b class="mt-6 mb-4">2. 保存期限</b>' +
        '个人信息将保存至收集目的达成或您提出删除请求，法律另有规定的除外。<br /><br />' +
        '<b class="mt-6 mb-4">3. 向第三方提供</b>' +
        '除法律要求或另行取得同意外，不向第三方提供个人信息。<br /><br />' +
        '<b class="mt-6 mb-4">4. 会员注销</b>' +
        '会员可随时通过门店渠道申请注销。<br /><br />',
    },
  };

  function normalizeLanguage(languageTag) {
    if (!languageTag) {
      return "en";
    }
    var lang = String(languageTag).toLowerCase();
    if (lang.indexOf("zh") === 0) {
      return "zh";
    }
    return "en";
  }

  function getSavedLanguage() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      return saved === "zh" || saved === "en" ? saved : null;
    } catch (_error) {
      return null;
    }
  }

  function detectLanguage() {
    var saved = getSavedLanguage();
    if (saved) {
      return saved;
    }

    var candidates = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      candidates = navigator.languages;
    } else if (navigator.language) {
      candidates = [navigator.language];
    }

    for (var i = 0; i < candidates.length; i += 1) {
      var normalized = normalizeLanguage(candidates[i]);
      if (normalized === "zh") {
        return "zh";
      }
      if (normalized === "en") {
        return "en";
      }
    }

    return "en";
  }

  function getTranslation(lang, key) {
    var current = dictionaries[lang] || dictionaries.en;
    return current[key] || dictionaries.en[key] || key;
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i += 1) {
      var node = textNodes[i];
      var key = node.getAttribute("data-i18n");
      node.textContent = getTranslation(lang, key);
    }

    var htmlNodes = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlNodes.length; j += 1) {
      var htmlNode = htmlNodes[j];
      var htmlKey = htmlNode.getAttribute("data-i18n-html");
      htmlNode.innerHTML = getTranslation(lang, htmlKey);
    }

    var switchButtons = document.querySelectorAll("[data-lang-switch]");
    for (var k = 0; k < switchButtons.length; k += 1) {
      var btn = switchButtons[k];
      var isActive = btn.getAttribute("data-lang-switch") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function setLanguage(lang) {
    var safeLang = lang === "zh" ? "zh" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, safeLang);
    } catch (_error) {
      // Ignore localStorage write failures.
    }
    applyLanguage(safeLang);
  }

  function bindSwitcher() {
    var switchButtons = document.querySelectorAll("[data-lang-switch]");
    for (var i = 0; i < switchButtons.length; i += 1) {
      switchButtons[i].addEventListener("click", function (event) {
        var lang = event.currentTarget.getAttribute("data-lang-switch");
        setLanguage(lang);
      });
    }
  }

  function initializeI18n() {
    bindSwitcher();
    applyLanguage(detectLanguage());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeI18n);
  } else {
    initializeI18n();
  }
})();
