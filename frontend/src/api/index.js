/**
 * Cred.ai Unified API Layer
 * 
 * All components MUST import API functions exclusively from this module.
 * No component should make direct fetch calls or import mocks directly.
 */

export { USE_MOCKS, API_BASE_URL } from './config';

export {
  verifyCustomerIdentity,
  verifyCustomerOtp,
  customerLogout,
  bankerLogin,
  bankerLogout,
  getStoredCustomerToken,
  getStoredBankerToken,
} from './auth';

export {
  getCustomerProfile,
  submitLoanApplication,
  getApplicationStatus,
} from './customer';

export {
  getBankerApplications,
  getBankerApplicationDetail,
  submitBankerDecision,
  resetDemoStore,
} from './banker';

