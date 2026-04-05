import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isOrgRoute = createRouteMatcher(['/org/:path*'])
const isUserRoute = createRouteMatcher(['/m/:path*'])
const isAdminRoute = createRouteMatcher(['/org/admin/:path*'])
const isSuperadminRoute = createRouteMatcher(['/sa/:path*'])

const SUPERADMIN_USER_ID = process.env.SUPERADMIN_USER_ID;

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  if (userId === SUPERADMIN_USER_ID) return;

  if (isSuperadminRoute(req)) {
    await auth.protect();
    return Response.redirect(new URL('/', req.url));
  }

  if (isAdminRoute(req)) {
    await auth.protect({ role: 'org:admin' });
    return Response.redirect(new URL('/', req.url));;
  }

  if (isOrgRoute(req)) {
    await auth.protect();
    if (!orgId) return Response.redirect(new URL('/select-org', req.url));
    return;
  }

  if (isUserRoute(req)) {
    await auth.protect()
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};