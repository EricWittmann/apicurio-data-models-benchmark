import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

const PORT: number = parseInt(process.env.SERVER_PORT || "3333");

export default defineConfig({
    base: "./",
    plugins: [react(), tsconfigPaths()],
    server: {
        port: PORT
    },
    // define: {
    //     "process.platform": {}
    // }
});
