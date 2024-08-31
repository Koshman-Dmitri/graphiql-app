export default function getErrorMessage(errorCode: string): string {
  if (errorCode.includes('(auth/invalid-credential)')) {
    return 'Incorrect email or password';
  }
  if (errorCode.includes('(auth/too-many-requests)')) {
    return 'Too many attempts. Try again later';
  }
  return 'An unexpected error occurred';
}
