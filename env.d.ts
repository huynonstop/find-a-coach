/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_KEY: string;
  readonly VITE_FIREBASE_DATABASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
