CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Epics" (
        "EpicId" uuid NOT NULL,
        "EpicName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "EpicDescription" text NULL,
        "Progress" double precision NOT NULL,
        CONSTRAINT "PK_Epics" PRIMARY KEY ("EpicId")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Project" (
        "ProjectId" uuid NOT NULL,
        "ProjectName" text NULL,
        "ProjectDescription" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "Customer" text NULL,
        CONSTRAINT "PK_Project" PRIMARY KEY ("ProjectId")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "StoryHistories" (
        "StoryHistoryId" uuid NOT NULL,
        "StoryHistoryAction" integer NOT NULL,
        "FieldName" text NULL,
        "PreviousValue" text NULL,
        "CurrentValue" text NULL,
        "RecordVersion" bigint NOT NULL,
        CONSTRAINT "PK_StoryHistories" PRIMARY KEY ("StoryHistoryId")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Sprints" (
        "SprintId" uuid NOT NULL,
        "SprintName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "Progress" double precision NOT NULL,
        "EpicId" uuid NULL,
        CONSTRAINT "PK_Sprints" PRIMARY KEY ("SprintId"),
        CONSTRAINT "FK_Sprints_Epics_EpicId" FOREIGN KEY ("EpicId") REFERENCES "Epics" ("EpicId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Teams" (
        "TeamId" uuid NOT NULL,
        "TeamName" text NULL,
        "Location" text NULL,
        "ProjectId" uuid NULL,
        "EpicId" uuid NULL,
        CONSTRAINT "PK_Teams" PRIMARY KEY ("TeamId"),
        CONSTRAINT "FK_Teams_Epics_EpicId" FOREIGN KEY ("EpicId") REFERENCES "Epics" ("EpicId") ON DELETE RESTRICT,
        CONSTRAINT "FK_Teams_Project_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("ProjectId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Users" (
        "UserId" uuid NOT NULL,
        "UserName" text NULL,
        "Password" text NULL,
        "UserRole" integer NOT NULL,
        "UserPosition" integer NOT NULL,
        "IsActive" boolean NOT NULL,
        "Email" text NULL,
        "AvatarLink" text NULL,
        "RecordVersion" bigint NOT NULL,
        "TeamId" uuid NULL,
        "StoryHistoryId" uuid NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("UserId"),
        CONSTRAINT "FK_Users_StoryHistories_StoryHistoryId" FOREIGN KEY ("StoryHistoryId") REFERENCES "StoryHistories" ("StoryHistoryId") ON DELETE RESTRICT,
        CONSTRAINT "FK_Users_Teams_TeamId" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "RefreshTokens" (
        "RefreshTokenId" uuid NOT NULL,
        "Value" text NULL,
        "IsActive" boolean NOT NULL,
        "UserId" uuid NULL,
        CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("RefreshTokenId"),
        CONSTRAINT "FK_RefreshTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE TABLE "Stories" (
        "StoryId" uuid NOT NULL,
        "Title" text NULL,
        "Description" text NULL,
        "Notes" text NULL,
        "ColumnType" integer NOT NULL,
        "StoryPriority" integer NOT NULL,
        "Estimate" integer NOT NULL,
        "IsReady" boolean NOT NULL,
        "IsBlocked" boolean NOT NULL,
        "BlockReason" text NULL,
        "CreationDate" timestamp without time zone NOT NULL,
        "RecordVersion" bigint NOT NULL,
        "IsDeleted" boolean NOT NULL,
        "SprintId" uuid NULL,
        "UserId" uuid NULL,
        "StoryHistoryId" uuid NULL,
        CONSTRAINT "PK_Stories" PRIMARY KEY ("StoryId"),
        CONSTRAINT "FK_Stories_Sprints_SprintId" FOREIGN KEY ("SprintId") REFERENCES "Sprints" ("SprintId") ON DELETE RESTRICT,
        CONSTRAINT "FK_Stories_StoryHistories_StoryHistoryId" FOREIGN KEY ("StoryHistoryId") REFERENCES "StoryHistories" ("StoryHistoryId") ON DELETE RESTRICT,
        CONSTRAINT "FK_Stories_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Sprints_EpicId" ON "Sprints" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Stories_SprintId" ON "Stories" ("SprintId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Stories_StoryHistoryId" ON "Stories" ("StoryHistoryId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Stories_UserId" ON "Stories" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Teams_EpicId" ON "Teams" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Teams_ProjectId" ON "Teams" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Users_StoryHistoryId" ON "Users" ("StoryHistoryId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    CREATE INDEX "IX_Users_TeamId" ON "Users" ("TeamId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201027174130_InitialDatabase') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20201027174130_InitialDatabase', '3.1.9');
    END IF;
END $$;
