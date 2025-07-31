"use client"

import { usePathname } from "next/navigation"

export default function NotFound() {
    const pathname = usePathname()

    if (pathname.includes("/post/")) {
        return <div className="">Not Found</div>
    }
}