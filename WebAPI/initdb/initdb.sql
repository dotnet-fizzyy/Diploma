CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Projects" (
        "ProjectId" uuid NOT NULL,
        "ProjectName" text NULL,
        "ProjectDescription" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "Customer" text NULL,
        CONSTRAINT "PK_Projects" PRIMARY KEY ("ProjectId")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Epics" (
        "EpicId" uuid NOT NULL,
        "ProjectId" uuid NOT NULL,
        "EpicName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "EpicDescription" text NULL,
        "Progress" double precision NOT NULL,
        CONSTRAINT "PK_Epics" PRIMARY KEY ("EpicId"),
        CONSTRAINT "FK_Epics_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("ProjectId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Teams" (
        "TeamId" uuid NOT NULL,
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Sprints" (
        "SprintId" uuid NOT NULL,
        "EpicId" uuid NOT NULL,
        "SprintName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "Progress" double precision NOT NULL,
        CONSTRAINT "PK_Sprints" PRIMARY KEY ("SprintId"),
        CONSTRAINT "FK_Sprints_Epics_EpicId" FOREIGN KEY ("EpicId") REFERENCES "Epics" ("EpicId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "TeamEpics" (
        "TeamEpicId" uuid NOT NULL,
        "TeamId" uuid NOT NULL,
        "EpicId" uuid NOT NULL,
        CONSTRAINT "PK_TeamEpics" PRIMARY KEY ("TeamEpicId"),
        CONSTRAINT "FK_TeamEpics_Epics_EpicId" FOREIGN KEY ("EpicId") REFERENCES "Epics" ("EpicId") ON DELETE SET NULL,
        CONSTRAINT "FK_TeamEpics_Teams_TeamId" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Users" (
        "UserId" uuid NOT NULL,
        "TeamId" uuid NULL,
        "UserName" text NULL,
        "Password" text NULL,
        "UserRole" integer NOT NULL,
        "UserPosition" integer NOT NULL,
        "IsActive" boolean NOT NULL,
        "Email" text NULL,
        "AvatarLink" text NULL,
        CONSTRAINT "PK_Users" PRIMARY KEY ("UserId"),
        CONSTRAINT "FK_Users_Teams_TeamId" FOREIGN KEY ("TeamId") REFERENCES "Teams" ("TeamId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "RefreshTokens" (
        "RefreshTokenId" uuid NOT NULL,
        "UserId" uuid NOT NULL,
        "Value" text NULL,
        "IsActive" boolean NOT NULL,
        CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("RefreshTokenId"),
        CONSTRAINT "FK_RefreshTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "Stories" (
        "StoryId" uuid NOT NULL,
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
        "CreationDate" timestamp without time zone NOT NULL,
        "IsDeleted" boolean NOT NULL,
        CONSTRAINT "PK_Stories" PRIMARY KEY ("StoryId"),
        CONSTRAINT "FK_Stories_Sprints_SprintId" FOREIGN KEY ("SprintId") REFERENCES "Sprints" ("SprintId") ON DELETE SET NULL,
        CONSTRAINT "FK_Stories_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("UserId") ON DELETE RESTRICT
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE TABLE "StoryHistories" (
        "StoryHistoryId" uuid NOT NULL,
        "StoryHistoryAction" integer NOT NULL,
        "FieldName" text NULL,
        "PreviousValue" text NULL,
        "CurrentValue" text NULL,
        "CreationDate" timestamp without time zone NOT NULL,
        "UserId" uuid NOT NULL,
        "StoryId" uuid NOT NULL,
        CONSTRAINT "PK_StoryHistories" PRIMARY KEY ("StoryHistoryId"),
        CONSTRAINT "FK_StoryHistories_Stories_StoryId" FOREIGN KEY ("StoryId") REFERENCES "Stories" ("StoryId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Epics_ProjectId" ON "Epics" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Sprints_EpicId" ON "Sprints" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Stories_ColumnType" ON "Stories" ("ColumnType");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Stories_SprintId" ON "Stories" ("SprintId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Stories_UserId" ON "Stories" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_StoryHistories_StoryId" ON "StoryHistories" ("StoryId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_TeamEpics_EpicId" ON "TeamEpics" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_TeamEpics_TeamId" ON "TeamEpics" ("TeamId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Teams_ProjectId" ON "Teams" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Users_Password" ON "Users" ("Password");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Users_TeamId" ON "Users" ("TeamId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserName" ON "Users" ("UserName");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserPosition" ON "Users" ("UserPosition");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    CREATE INDEX "IX_Users_UserRole" ON "Users" ("UserRole");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201209190000_InitialMigration') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20201209190000_InitialMigration', '3.1.9');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "RefreshTokens" DROP COLUMN "IsActive";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Users" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Teams" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Sprints" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "RefreshTokens" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Projects" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    ALTER TABLE "Epics" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '2021-03-08 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210308100449_UpdateEntitiesWithGeneralEntity') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20210308100449_UpdateEntitiesWithGeneralEntity', '3.1.9');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    DROP TABLE "TeamEpics";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Users" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Users" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Users" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Teams" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Teams" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Teams" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "StoryHistories" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Stories" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Sprints" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Sprints" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Sprints" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "RefreshTokens" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "RefreshTokens" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "RefreshTokens" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Projects" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Projects" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Projects" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    ALTER TABLE "Epics" ALTER COLUMN "CreationDate" TYPE timestamp without time zone;
    ALTER TABLE "Epics" ALTER COLUMN "CreationDate" SET NOT NULL;
    ALTER TABLE "Epics" ALTER COLUMN "CreationDate" SET DEFAULT TIMESTAMP '2021-03-09 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20210309201028_RemoveExtraTeamEpicTable') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20210309201028_RemoveExtraTeamEpicTable', '3.1.9');
    END IF;
END $$;
