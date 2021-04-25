CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "WorkSpaces" (
        "WorkSpaceId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "WorkSpaceName" text NULL,
        "WorkSpaceDescription" text NULL,
        CONSTRAINT "PK_WorkSpaces" PRIMARY KEY ("WorkSpaceId")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Projects" (
        "ProjectId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "ProjectName" text NULL,
        "ProjectDescription" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "WorkSpaceId" uuid NOT NULL,
        CONSTRAINT "PK_Projects" PRIMARY KEY ("ProjectId"),
        CONSTRAINT "FK_Projects_WorkSpaces_WorkSpaceId" FOREIGN KEY ("WorkSpaceId") REFERENCES "WorkSpaces" ("WorkSpaceId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Users" (
        "UserId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "WorkSpaceId" uuid NULL,
        "UserName" text NULL,
        "Password" text NULL,
        "UserRole" integer NOT NULL,
        "UserPosition" integer NOT NULL,
        "IsActive" boolean NOT NULL,
        "Email" text NULL,
        "AvatarLink" text NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("UserId"),
        CONSTRAINT "FK_Users_WorkSpaces_WorkSpaceId" FOREIGN KEY ("WorkSpaceId") REFERENCES "WorkSpaces" ("WorkSpaceId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Epics" (
        "EpicId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "ProjectId" uuid NOT NULL,
        "EpicName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "EpicDescription" text NULL,
        CONSTRAINT "PK_Epics" PRIMARY KEY ("EpicId"),
        CONSTRAINT "FK_Epics_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("ProjectId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Teams" (
        "TeamId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "ProjectId" uuid NULL,
        "TeamName" text NULL,
        "Location" text NULL,
        CONSTRAINT "PK_Teams" PRIMARY KEY ("TeamId"),
        CONSTRAINT "FK_Teams_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("ProjectId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "RefreshTokens" (
        "RefreshTokenId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "UserId" uuid NOT NULL,
        "Value" text NULL,
        "ExpirationDate" timestamp without time zone NOT NULL,
        CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("RefreshTokenId"),
        CONSTRAINT "FK_RefreshTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Sprints" (
        "SprintId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "EpicId" uuid NOT NULL,
        "SprintName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        CONSTRAINT "PK_Sprints" PRIMARY KEY ("SprintId"),
        CONSTRAINT "FK_Sprints_Epics_EpicId" FOREIGN KEY ("EpicId") REFERENCES "Epics" ("EpicId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "TeamUser" (
        "TeamId" uuid NOT NULL,
        "UserId" uuid NOT NULL,
        "TeamId1" uuid NULL,
        "UserId1" uuid NULL,
        CONSTRAINT "PK_TeamUser" PRIMARY KEY ("TeamId", "UserId"),
        CONSTRAINT "FK_TeamUser_Teams_TeamId" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE CASCADE,
        CONSTRAINT "FK_TeamUser_Teams_TeamId1" FOREIGN KEY ("TeamId1") REFERENCES "Teams" ("TeamId") ON DELETE RESTRICT,
        CONSTRAINT "FK_TeamUser_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE CASCADE,
        CONSTRAINT "FK_TeamUser_Users_UserId1" FOREIGN KEY ("UserId1") REFERENCES "Users" ("UserId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "Stories" (
        "StoryId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "SprintId" uuid NULL,
        "UserId" uuid NULL,
        "Title" text NULL,
        "Description" text NULL,
        "Notes" text NULL,
        "ColumnType" integer NOT NULL,
        "StoryPriority" integer NOT NULL,
        "Estimate" integer NOT NULL,
        "IsReady" boolean NOT NULL,
        "IsBlocked" boolean NOT NULL,
        "BlockReason" text NULL,
        "IsDeleted" boolean NOT NULL,
        CONSTRAINT "PK_Stories" PRIMARY KEY ("StoryId"),
        CONSTRAINT "FK_Stories_Sprints_SprintId" FOREIGN KEY ("SprintId") REFERENCES "Sprints" ("SprintId") ON DELETE SET NULL,
        CONSTRAINT "FK_Stories_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE TABLE "StoryHistories" (
        "StoryHistoryId" uuid NOT NULL,
        "CreationDate" timestamptz NOT NULL,
        "StoryHistoryAction" integer NOT NULL,
        "FieldName" text NULL,
        "PreviousValue" text NULL,
        "CurrentValue" text NULL,
        "UserId" uuid NOT NULL,
        "StoryId" uuid NOT NULL,
        CONSTRAINT "PK_StoryHistories" PRIMARY KEY ("StoryHistoryId"),
        CONSTRAINT "FK_StoryHistories_Stories_StoryId" FOREIGN KEY ("StoryId") REFERENCES "Stories" ("StoryId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Epics_ProjectId" ON "Epics" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Projects_WorkSpaceId" ON "Projects" ("WorkSpaceId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Sprints_EpicId" ON "Sprints" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Stories_ColumnType" ON "Stories" ("ColumnType");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Stories_SprintId" ON "Stories" ("SprintId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Stories_Title" ON "Stories" ("Title");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Stories_UserId" ON "Stories" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_StoryHistories_StoryId" ON "StoryHistories" ("StoryId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Teams_ProjectId" ON "Teams" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_TeamUser_TeamId1" ON "TeamUser" ("TeamId1");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_TeamUser_UserId" ON "TeamUser" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_TeamUser_UserId1" ON "TeamUser" ("UserId1");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Users_Password" ON "Users" ("Password");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserName" ON "Users" ("UserName");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserPosition" ON "Users" ("UserPosition");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserRole" ON "Users" ("UserRole");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    CREATE INDEX "IX_Users_WorkSpaceId" ON "Users" ("WorkSpaceId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425071547_InitialMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20210425071547_InitialMigration', '3.1.9');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    ALTER TABLE "TeamUser" DROP CONSTRAINT "FK_TeamUser_Teams_TeamId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    ALTER TABLE "TeamUser" DROP CONSTRAINT "FK_TeamUser_Users_UserId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    DROP INDEX "IX_TeamUser_TeamId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    DROP INDEX "IX_TeamUser_UserId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    ALTER TABLE "TeamUser" DROP COLUMN "TeamId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    ALTER TABLE "TeamUser" DROP COLUMN "UserId1";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425101020_UpdateTeamUserEntity') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20210425101020_UpdateTeamUserEntity', '3.1.9');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425102343_RemoveNullableTeamProjectId') THEN
    ALTER TABLE "Teams" ALTER COLUMN "ProjectId" TYPE uuid;
    ALTER TABLE "Teams" ALTER COLUMN "ProjectId" SET NOT NULL;
    ALTER TABLE "Teams" ALTER COLUMN "ProjectId" DROP DEFAULT;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210425102343_RemoveNullableTeamProjectId') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20210425102343_RemoveNullableTeamProjectId', '3.1.9');
    END IF;
END $$;
