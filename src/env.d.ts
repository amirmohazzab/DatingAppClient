interface ImportMetaEnv {
  readonly NG_APP_BASE_API_URL: string;
  readonly NG_APP_FEATURE_FLAG: string;
  // اینجا متغیرهای محیطی دیگه‌ات رو اضافه کن
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}