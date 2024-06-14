FROM node:20 AS builder

WORKDIR /app

RUN npm install -g typescript
RUN npm install --save-dev @types/node @types/aws-lambda

COPY index.ts ./
RUN tsc index.ts

FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:20

COPY --from=builder /app/index.js ${LAMBDA_TASK_ROOT}/
COPY prisma ${LAMBDA_TASK_ROOT}/
RUN npm install -g prisma

CMD [ "index.handler" ]
