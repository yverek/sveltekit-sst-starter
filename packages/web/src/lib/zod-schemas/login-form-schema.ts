import { z } from 'zod';
import { EMAIL_MIN_LEN, EMAIL_MAX_LEN, PASSWORD_MIN_LEN, PASSWORD_MAX_LEN } from '$lib/constants/fields-length';

const loginFormSchema = z.object({
  email: z.string().trim().min(EMAIL_MIN_LEN).max(EMAIL_MAX_LEN).email(),
  password: z.string().min(PASSWORD_MIN_LEN).max(PASSWORD_MAX_LEN)
});

export default loginFormSchema;
