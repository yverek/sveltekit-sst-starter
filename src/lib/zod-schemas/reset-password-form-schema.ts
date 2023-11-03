import { z } from "zod";
import { EMAIL_MIN_LEN, EMAIL_MAX_LEN } from "$lib/constants/fields-length";

const resetPasswordFormSchema = z.object({
  email: z.string().trim().email().min(EMAIL_MIN_LEN).max(EMAIL_MAX_LEN)
});

export default resetPasswordFormSchema;
