import express from 'express';

const router = express.Router();

/**
 * @route   GET /health
 * @desc    API Gateway Health Check
 * @access  Public
 */
router.get('/', async (req, res) => {
    const healthcheck = {
        status: 'UP',
        uptime: process.uptime(),
        timestamp: Date.now(),
        gateway: 'OK',
        message: "Report service is running"
    };

    try {
        // Optional: Perform a quick check on a critical dependency if necessary
        // await checkInternalDependency(); 
        
        res.status(200).send(healthcheck);
    } catch (error) {
        healthcheck.status = 'DEGRADED';
        healthcheck.error = error.message;
        res.status(503).send(healthcheck);
    }
});

export default router;