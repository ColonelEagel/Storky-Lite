# Learning Platform

This repository contains the frontend code for the Learning Platform, a web application built with Next.js, React, and Tailwind CSS. The backend is implemented using Node.js and is hosted in a separate repository.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Installation](#Installation)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **React Hook Form**: A library for building performant, flexible, and extensible forms with easy-to-use validation.
- **React Hot Toast**: A library for showing toast notifications in React applications.
- **Lucide React**: A library for using Lucide icons in React applications.
- **shadcn/ui**: Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source

## Project Structure

```plaintext
.
├── actions
│   ├── useGetAllContents.ts
│   ├── useDeleteRequest.ts
│   ├── useGetAllSessions.ts
│   ├── useGetAllUsers.ts
│   ├── useGetContents.ts
│   ├── useGetCourses.ts
│   ├── useGetSession.ts
│   ├── usePostRequest.ts
├── app
│   ├── (auth)
│   │   ├── login
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   ├── sign-up
│   │       ├── page.tsx
│   ├── (user)
│   │   ├── change-data
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   ├── change-password
│   │       ├── page.tsx
│   ├── (courses)
│   │   ├── edit-course
│   │       ├── page.tsx
│   ├── (sessions)
│   │   ├── edit-session
│   │       ├── page.tsx
│   ├── (content)
│   │   ├── edit-content
│   │       ├── page.tsx
│   ├── (tutors)
│   │   ├── edit-course
│   │       ├── page.tsx
│   ├── api
│       ├── auth
│           ├── [...nextauth].ts
├── components
│   ├── gallery
│   │   ├── Gallery.tsx
│   │   ├── GalleryTabs.tsx
│   │   ├── MediaDisplay.tsx
│   │   ├── RenderLessonContent.tsx
│   ├── models
│   │   ├── AlertModal.tsx
│   ├── ui
│       ├── Accordion.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── DataTable.tsx
│       ├── Dialog.tsx
│       ├── DropdownMenu.tsx
│       ├── Form.tsx
│       ├── HeaderComponent.tsx
│       ├── Heading.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── Loader.tsx
│       ├── LoginButton.tsx
│       ├── MobileNav.tsx
│       ├── Navbar.tsx
│       ├── SignUp.tsx
│       ├── UpdateUserData.tsx
├── data
│   ├── auth.ts
│   ├── utils.ts
├── lib
│   ├── providers
│       ├── AuthProvider.tsx
│       ├── ContentProvider.tsx
│       ├── QueryProvider.tsx
│       ├── ThemeProvider.tsx
│       ├── ToastProvider.tsx
├── public
│   ├── icons
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── apple-touch-icon.png
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon.ico
│       ├── logo.png
│   ├── images
│       ├── palestineflag.svg
│       ├── site.webmanifest
├── styles
│   ├── globals.css
│   ├── layout.css
├── types
│   ├── index.ts
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
```

Folder Usage

-**actions**: Contains custom hooks for performing API requests.

- **app**: Contains the main application structure, including pages and API route handlers.
- **(auth)**: Authentication-related pages like login and sign-up.
- **(user)**: User profile and settings pages.
- **(courses)**: Course management pages.
- **(sessions)**: Session management pages.
- **(content)**: Content management pages.
- **(tutors)**: Tutor management pages.
- **api**: API route handlers.
- **components**: Contains reusable components.

- **gallery**: Components for media galleries.
- **models**: Components for modals and alerts.
- **ui**: UI components like buttons, forms, inputs, etc.
- **data**: Utility functions and constants related to data - **handling**.

- **lib**: Providers for application context (e.g., authentication, content, theme).

- **public**: Static assets like images and icons.

- **styles**: Global stylesheets for the application.

- **types**: TypeScript type definitions.

- **.**eslintignore: Specifies files and directories ignored by ESLint.

- **.**eslintrc.json: Configuration for ESLint.

- **.**gitignore: Specifies files and directories ignored by Git.

- **jest**.config.js: Configuration for Jest testing framework.

- **middleware**.ts: Middleware configuration for Next.js.

- **next**-env.d.ts: TypeScript environment definitions for Next.js.

- **next**.config.js: Configuration for Next.js.

- **package**-lock.json: Auto-generated file for npm dependencies.

- **package**.json: Configuration for npm.

- **postcss**.config.js: Configuration for PostCSS.

- **README**.md: Main documentation file for the project.

- **tailwind**.config.js: Configuration for Tailwind CSS.

## Installation

To get started with the project, follow these steps:

Clone the repository:

```bash
git clone https://github.com/ColonelEagel/Storky-Lite
```

Navigate to the project directory:

```bash
cd your-repo
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

```

## Usage

After running the development server, you can access the application at http://localhost:3000.

## Contributing

If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch with a descriptive name:

```bash
git checkout -b my-new-feature
```

Make your changes:
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Commit your changes with a meaningful commit message:

```bash
git commit -m "Add my new feature"
```

Push to your branch:

```bash
git push origin my-new-feature
```

Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
