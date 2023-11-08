import { z } from "zod";
import {
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
  USERNAME_MIN_LEN,
  USERNAME_MAX_LEN,
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  MAX_AVATAR_SIZE,
  IMAGE_TYPES
} from "$lib/constants/fields-length";

// TODO translate this
// TODO check this schema if it's correct
const userProfileFormSchema = z.object({
  name: z.string().trim().min(NAME_MIN_LEN).max(NAME_MAX_LEN),
  email: z.string().trim().email().min(EMAIL_MIN_LEN).max(EMAIL_MAX_LEN),
  username: z
    .string()
    .trim()
    .min(USERNAME_MIN_LEN)
    .max(USERNAME_MAX_LEN)
    .regex(/^[a-zA-Z0-9]*$/, { message: "Username can only contain letters or numbers." }),
  avatar: z
    .instanceof(Blob)
    .optional()
    .superRefine((val, ctx) => {
      if (val) {
        if (val.size > MAX_AVATAR_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Avatar must be less than 5MB"
          });
        }

        if (!IMAGE_TYPES.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif"
          });
        }
      }
    })
});

export default userProfileFormSchema;
