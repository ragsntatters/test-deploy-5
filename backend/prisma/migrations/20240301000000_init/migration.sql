-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'editor', 'viewer', 'user');
CREATE TYPE "TeamRole" AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE "ReviewStatus" AS ENUM ('active', 'flagged', 'resolved', 'deleted');
CREATE TYPE "ResponseStatus" AS ENUM ('pending', 'approved', 'rejected', 'published');
CREATE TYPE "PostStatus" AS ENUM ('draft', 'pending', 'scheduled', 'published', 'rejected', 'archived');
CREATE TYPE "Platform" AS ENUM ('google', 'facebook', 'instagram', 'wordpress');
CREATE TYPE "MediaType" AS ENUM ('image', 'video');
CREATE TYPE "DistanceUnit" AS ENUM ('km', 'mi');
CREATE TYPE "Plan" AS ENUM ('free', 'starter', 'professional', 'enterprise');
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'past_due', 'canceled', 'trialing');
CREATE TYPE "InvoiceStatus" AS ENUM ('draft', 'open', 'paid', 'void', 'uncollectible');
CREATE TYPE "Feature" AS ENUM ('locations', 'keywords', 'posts', 'users');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'user',
  "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
  "verificationToken" TEXT,
  "resetToken" TEXT,
  "resetTokenExpiry" TIMESTAMP(3),
  "lastLogin" TIMESTAMP(3),
  "stripeCustomerId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
  -- Location table schema
  -- Rest of the schema from the prisma/schema.prisma file
);

-- Add other table creation statements
-- Following the schema from prisma/schema.prisma

-- CreateIndexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Location_placeId_key" ON "Location"("placeId");
-- Add other necessary indexes