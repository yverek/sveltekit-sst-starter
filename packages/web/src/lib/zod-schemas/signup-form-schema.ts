import { z } from 'zod';
import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN,
  PASSWORD_MAX_LEN
} from '$lib/constants/fields-length';

/**
 * This regex checks if the password is inside [8, 100] characters.
 * Moreover, it must contain at least
 *  - One capital letter
 *  - One number
 *  - One special character
 */
// TODO check this regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// TODO this should be fully translated
const signupFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(NAME_MIN_LEN, { message: `Name must be at least ${NAME_MIN_LEN} characters` })
      .max(NAME_MAX_LEN, { message: `Name must be max ${NAME_MAX_LEN} characters` }),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email({ message: 'Email must be a valid email address' })
      .min(EMAIL_MIN_LEN, { message: `Email must be at least ${EMAIL_MIN_LEN} characters` })
      .max(EMAIL_MAX_LEN, { message: `Email must be max ${EMAIL_MAX_LEN} characters` }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(PASSWORD_MIN_LEN, { message: `Password must be at least ${PASSWORD_MIN_LEN} characters` })
      .max(PASSWORD_MAX_LEN, { message: `Password must be max ${PASSWORD_MAX_LEN} characters` })
      .regex(passwordRegex, {
        message: 'Password must contain at least 1 capital letter, 1 number and 1 special character'
      }),
    passwordConfirm: z.string({ required_error: 'Password is required' })
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and password confirm must match',
        path: ['password']
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and password confirm must match',
        path: ['passwordConfirm']
      });
    }
  });

export default signupFormSchema;
