import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { fromIni } from "@aws-sdk/credential-providers";

export const rdsClient = new RDSDataClient({
  credentials: fromIni({ profile: process.env.AWS_PROFILE }),
  region: "eu-central-1",
});
