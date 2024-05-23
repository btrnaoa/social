"use server"

import { hash, verify } from "@node-rs/argon2"
import { sql } from "drizzle-orm"
import { generateIdFromEntropySize } from "lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { auth, validateRequest } from "../auth"
import { db } from "../db"
import { users } from "../db/schema"
import { authSchema } from "../validations/auth"

export async function signup(formData: FormData) {
  const userAuth = authSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!userAuth.success) {
    // TODO handle validation errors
    return
  }

  const { username, password } = userAuth.data

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) =>
      eq(sql`lower(${users.username})`, username.toLowerCase()),
  })

  if (userExists) {
    // TODO
    console.log("Username already exists")
    return
  }

  const userId = generateIdFromEntropySize(10)
  await db.insert(users).values({
    id: userId,
    username,
    passwordHash,
  })

  const session = await auth.createSession(userId, {})
  const sessionCookie = auth.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/")
}

export async function signin(formData: FormData) {
  const userAuth = authSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!userAuth.success) {
    // TODO handle validation errors
    return
  }

  const { username, password } = userAuth.data

  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) =>
      eq(sql`lower(${users.username})`, username.toLowerCase()),
  })

  if (!userExists) {
    // TODO
    console.log("User does not exist")
    return
  }

  const validPassword = await verify(userExists.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  if (!validPassword) {
    // TODO
    console.log("Invalid password")
    return
  }

  const session = await auth.createSession(userExists.id, {})
  const sessionCookie = auth.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/")
}

export async function signout() {
  const { session } = await validateRequest()
  if (!session) {
    // TODO
    return
  }

  await auth.invalidateSession(session.id)

  const sessionCookie = auth.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/")
}
