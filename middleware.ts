import { auth } from "@/auth"

export const config = {
    matcher: ["/users/:id*"],
}

export default auth((req) => {
    if (!req.auth) {
        const newUrl = new URL("/api/auth/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})
