# Real-Time Chat App Setup Guide

This project is a real-time chat application built with Next.js, using Clerk for authentication and Convex for real-time data synchronization. Currently, the project has implemented basic authentication and data storage.

## Setup Steps

1. **Install Next.js and Set Up the Project**

   ```bash
   npx create-next-app@latest your-project-name
   cd your-project-name
   ```

2. **Install Clerk and Convex**

   ```bash
   npm install @clerk/nextjs @clerk/clerk-react convex
   # or
   yarn add @clerk/nextjs @clerk/clerk-react convex
   ```

3. **Create Projects in Clerk and Convex**

   - Sign up or log in to [Clerk](https://clerk.com/) and create a new project
   - Sign up or log in to [Convex](https://www.convex.dev/) and create a new project

4. **Set Up Environment Variables**
   Create a `.env.local` file in the root of your project and add the following variables:

   ```
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_WEBHOOK_SECRET=
   ```

   Refer to `.env.example.local` for any additional required variables.

5. **Set Up Clerk Webhook**
   In your Clerk dashboard, set up a webhook with the Convex URL in this format:

   ```
   https://your-project-domain.convex.site/clerk-users-webhook
   ```

   Replace `your-project-domain` with your actual Convex project domain.

6. **Create JWT Template in Clerk**

   - In Clerk, create a JWT template of type "Convex"
   - Copy the issuer URL

7. **Configure Convex Authentication**
   Create a file named `auth.config.ts` in the `convex` folder of your project:

   ```typescript
   export default {
     providers: [
       {
         domain: 'https://your-clerk-issuer-url',
         applicationID: 'convex',
       },
     ],
   };
   ```

   Replace `https://your-clerk-issuer-url` with the issuer URL you copied from Clerk.

8. **Set Environment Variable in Convex Project**
   In your Convex project settings, add the following environment variable:
   ```
   CLERK_WEBHOOK_SECRET=your_webhook_secret
   ```

## Running the Project

After completing the setup steps, you can run the project using:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Current Project Status

At this point, the project has:

- Basic authentication implemented using Clerk
- Initial setup for storing data in Convex
- Basic project structure and routing

Next steps will involve implementing the chat functionality and real-time updates.

## Additional Information

For more detailed information on configuring Clerk and Convex, please refer to their respective documentation:

- [Clerk Documentation](https://clerk.com/docs)
- [Convex Documentation](https://docs.convex.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
