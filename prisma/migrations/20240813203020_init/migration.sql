
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "collection" (
    "name" VARCHAR(40) DEFAULT 'Untitled Collection',
    "collectionid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(200),
    "collectionimage" BYTEA,
    "username" VARCHAR(100),
    "userid" UUID,
    "publish" BOOLEAN,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("collectionid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "date_of_birth" DATE NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "fk_user" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
