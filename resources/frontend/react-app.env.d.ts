declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";

interface ImportMetaEnv {
    readonly VITE_PUSHER_APP_KEY: string
    readonly VITE_PUSHER_APP_CLUSTER: string
    readonly VITE_PUSHER_HOST: string
    readonly VITE_PUSHER_PORT: string
    readonly VITE_PUSHER_SCHEME: string
    readonly VITE_PUSHER_ENCRYPTED: string
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
