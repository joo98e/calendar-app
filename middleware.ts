import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.href.includes("practice2")) {
    const data = await (await fetch("https://jsonplaceholder.typicode.com/users/1")).json();
    console.log(data);

    const url = req.nextUrl.clone();
    url.pathname = "/goods";

    if (req.cookies.has("good")) {
      return NextResponse.redirect(url);
    }
  }
}