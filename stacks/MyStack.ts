import {
  StackContext,
  Api,
  EventBus,
  SvelteKitSite,
  RDS,
} from "sst/constructs";

export function MyStack({ stack }: StackContext) {
  const rds = new RDS(stack, "database", {
    defaultDatabaseName: "mydb",
    engine: "postgresql13.9",
    migrations: "packages/core/migrations",
  });

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [rds, bus],
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
      "GET /user": "packages/functions/src/user.list",
    },
  });

  const site = new SvelteKitSite(stack, "site", {
    path: "packages/web",
    environment: {
      API_ENDPOINT: api.url,
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    url: site.url,
    RDS_ARN: rds.clusterArn,
    RDS_SECRET: rds.secretArn,
    RDS_DATABASE: rds.defaultDatabaseName,
  });
}
