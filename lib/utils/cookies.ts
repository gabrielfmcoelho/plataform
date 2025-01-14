import Cookies from 'js-cookie';
import { LoginResponse } from '@/types/api';

/**
 * Save tokens in cookies.
 */
export function storeTokensInCookies(tokens: LoginResponse) {
    // Example: Store tokens in cookies for 1 day (24h).
    Cookies.set('accessToken', tokens.accessToken, { expires: 1 });
    Cookies.set('refreshToken', tokens.refreshToken, { expires: 1 });
  }
  
  /**
   * Remove tokens from cookies.
   */
  export function removeTokensFromCookies() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
  
  /**
   * Helper to get Access Token.
   */
  export function getAccessToken(): string | undefined {
    return Cookies.get('accessToken');
  }