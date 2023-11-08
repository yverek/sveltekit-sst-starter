import loginFormSchema from "./login-form.schema";

const resetPasswordFormSchema = loginFormSchema.pick({ email: true });

export default resetPasswordFormSchema;
