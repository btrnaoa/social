import { auth } from "@/lib/auth"
import { LuciaError } from "lucia"
import * as context from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const username = formData.get("username")
  const password = formData.get("password")

  if (typeof username !== "string") {
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      }
    )
  }

  if (typeof password !== "string") {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      }
    )
  }

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password)
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(req.method, context)
    authRequest.setSession(session)

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    })
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      return NextResponse.json(
        {
          error: "Incorrect username or password",
        },
        {
          status: 400,
        }
      )
    }
    return NextResponse.json(
      {
        error: "Unhandled error",
      },
      {
        status: 500,
      }
    )
  }
}
