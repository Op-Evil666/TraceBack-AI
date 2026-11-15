const proxyOptions = {
    changeOrigin: true,
    timeout: 10000,
    proxyTimeout: 10000,

    on: {
        error: (err, req, res) => {
            console.error("Upstream proxy error:", err.message);

            if (!res || res.headersSent || res.destroyed) {
                return;
            }

            const status =
                err.code === "ETIMEDOUT" ? 504 : 502;

            res.status(status).json({
                success: false,
                message:
                    status === 504
                        ? "Upstream service timed out."
                        : "Upstream service is unavailable."
            });
        }
    }
};

export default proxyOptions;