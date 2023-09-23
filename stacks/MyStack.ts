import { StackContext, Api, EventBus, SvelteKitSite } from "sst/constructs";

export function MyStack({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  const site = new SvelteKitSite(stack, "site", {
    path: "packages/web",
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    url: site.url,
  });
}
