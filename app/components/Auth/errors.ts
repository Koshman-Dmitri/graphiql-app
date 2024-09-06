const AuthErrors: { [key: string]: string } = {
  'auth/invalid-credential': 'Ошибка: неправильные данные',
  'auth/credential-already-in-use': 'Ошибка: данные уже используются',
  'auth/email-already-in-use': 'Ошибка: данная почта уже используется',
  'auth/invalid-email': 'Ошибка: неправильная почта',
  'auth/internal-error': 'Ошибка: внутренняя ошибка',
  'auth/invalid-user-token': 'Ошибка: неверный токен пользователя',
  'auth/user-token-expired': 'Ошибка: токен истек',
  'auth/timeout': 'Ошибка: попробуйте позже',
  'auth/too-many-requests': 'Ошибка: слишком много запросов',
  'auth/user-not-found': 'Ошибка: пользователь не найден',
  unexpectedError: 'Ошибка: непредвиденная ошибка',
};

export default AuthErrors;
