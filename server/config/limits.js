// Allows user to send one additional request every minute even if cloud provider haven't terminated function instance
const MINIMUM_REQUESTS_PAUSE = 60000;
// Base request number for one user per work time of one function instance
const MAXIMUM_REQUESTS_PER_SESSION = 10;

export { MINIMUM_REQUESTS_PAUSE, MAXIMUM_REQUESTS_PER_SESSION };
