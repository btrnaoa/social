import { clsx, type ClassValue } from "clsx"
import { pgTableCreator } from "drizzle-orm/pg-core"
import { twMerge } from "tailwind-merge"
import { tablePrefix } from "./constants"

export const pgTable = pgTableCreator((name) => `${tablePrefix}_${name}`)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
