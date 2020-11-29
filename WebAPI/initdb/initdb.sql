CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);


DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE TABLE "Epics" (
        "EpicId" uuid NOT NULL,
        "ProjectId" uuid NOT NULL,
        "EpicName" text NULL,
        "StartDate" timestamp without time zone NOT NULL,
        "EndDate" timestamp without time zone NOT NULL,
        "EpicDescription" text NULL,
        "Progress" double precision NOT NULL,
        CONSTRAINT "PK_Epics" PRIMARY KEY ("EpicId"),
        CONSTRAINT "FK_Epics_Project_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("ProjectId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE TABLE "Teams" (
        "TeamId" uuid NOT NULL,
        "ProjectId" uuid NULL,
        "TeamName" text NULL,
        "Location" text NULL,
        CONSTRAINT "PK_Teams" PRIMARY KEY ("TeamId"),
        CONSTRAINT "FK_Teams_Project_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Project" ("ProjectId") ON DELETE SET NULL
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE TABLE "Users" (
        "UserId" uuid NOT NULL,
        "TeamId" uuid NULL,
        "UserName" text NULL,
        "Password" text NULL,
        "UserRole" text NOT NULL,
        "UserPosition" text NOT NULL,
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE TABLE "StoryHistories" (
        "StoryHistoryId" uuid NOT NULL,
        "StoryHistoryAction" text NOT NULL,
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
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Epics_ProjectId" ON "Epics" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Sprints_EpicId" ON "Sprints" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Stories_SprintId" ON "Stories" ("SprintId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Stories_UserId" ON "Stories" ("UserId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_StoryHistories_StoryId" ON "StoryHistories" ("StoryId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_TeamEpics_EpicId" ON "TeamEpics" ("EpicId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_TeamEpics_TeamId" ON "TeamEpics" ("TeamId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Teams_ProjectId" ON "Teams" ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    CREATE INDEX "IX_Users_TeamId" ON "Users" ("TeamId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201111055014_InitialDatabase') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20201111055014_InitialDatabase', '3.1.9');
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Epics" DROP CONSTRAINT "FK_Epics_Project_ProjectId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Teams" DROP CONSTRAINT "FK_Teams_Project_ProjectId";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Project" DROP CONSTRAINT "PK_Project";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Project" RENAME TO "Projects";
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "StoryHistories" ADD "CreationDate" timestamp without time zone NOT NULL DEFAULT TIMESTAMP '0001-01-01 00:00:00';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Projects" ADD CONSTRAINT "PK_Projects" PRIMARY KEY ("ProjectId");
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Epics" ADD CONSTRAINT "FK_Epics_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("ProjectId") ON DELETE SET NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    ALTER TABLE "Teams" ADD CONSTRAINT "FK_Teams_Projects_ProjectId" FOREIGN KEY ("ProjectId") REFERENCES "Projects" ("ProjectId") ON DELETE SET NULL;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20201129161740_AddTimeForStoryHist') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20201129161740_AddTimeForStoryHist', '3.1.9');
    END IF;
END $$;
