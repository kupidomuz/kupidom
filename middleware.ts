import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {


  const userCookie = request.cookies.get("user")?.value;



  if (!userCookie) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }



  try {


    const user = JSON.parse(userCookie);

    const pathname = request.nextUrl.pathname;



    // Админ имеет полный доступ
    if (user.role === "admin") {

      return NextResponse.next();

    }



    // Агент:
    // просмотр объектов
    // добавление своих объектов
    if (
      user.role === "agent" &&
      (
        pathname === "/admin" ||
        pathname.startsWith("/admin/properties") ||
        pathname.startsWith("/admin/add")
      )
    ) {

      return NextResponse.next();

    }



    // всё остальное агенту запрещено

    return NextResponse.redirect(
      new URL("/admin/properties", request.url)
    );



  } catch {


    return NextResponse.redirect(
      new URL("/login", request.url)
    );


  }

}



export const config = {

  matcher: [
    "/admin/:path*"
  ],

};