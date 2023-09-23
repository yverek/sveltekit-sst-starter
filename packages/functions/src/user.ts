import { ApiHandler } from "sst/node/api";
import { User } from "@sveltekit-sst-starter/core/user";

export const list = ApiHandler(async (_evt) => {
  const data = await User.list();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
