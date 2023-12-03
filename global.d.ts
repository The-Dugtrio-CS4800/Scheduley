declare global {
    namespace NodeJS{
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
        }
    }
}

//makes this file a module
export {}