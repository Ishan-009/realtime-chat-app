=== Setup Steps

=> Install Nextjs, and Setup Nextjs Project
=> Install Clerk and Convex DB
=> Create Project In Clerk and Convex DB
=> Get Necessary Environment Variables as described in .env.example.local file like this below
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

checkout .env.example.local for other env variables :)

=> Also you have to setup webhook in clerk of convex url in this manner => https://wonderasd-toad-42.convex.site/clerk-users-webhook, this is just tweaked domain example for privacy reasons will not work you have to use your own url :)

=> Creating JWT Template in clerk of convex type and copy issuer and create file in convex folder named auth.config.ts
=> Set Environment Variable in Convex Project, like this CLERK_WEBHOOK_SECRET ••••••
