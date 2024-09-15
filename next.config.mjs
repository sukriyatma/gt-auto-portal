/** @type {import('next').NextConfig} */
import configuration from "./src/config/configuration.js";
const nextConfig = {
    reactStrictMode: false,
    env: configuration()
};

export default nextConfig;
