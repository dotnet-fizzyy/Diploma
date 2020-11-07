﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    ProjectId = table.Column<Guid>(nullable: false),
                    ProjectName = table.Column<string>(nullable: true),
                    ProjectDescription = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Customer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "Epics",
                columns: table => new
                {
                    EpicId = table.Column<Guid>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: false),
                    EpicName = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    EpicDescription = table.Column<string>(nullable: true),
                    Progress = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Epics", x => x.EpicId);
                    table.ForeignKey(
                        name: "FK_Epics_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    TeamId = table.Column<Guid>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: false),
                    TeamName = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.TeamId);
                    table.ForeignKey(
                        name: "FK_Teams_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Sprints",
                columns: table => new
                {
                    SprintId = table.Column<Guid>(nullable: false),
                    EpicId = table.Column<Guid>(nullable: false),
                    SprintName = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Progress = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprints", x => x.SprintId);
                    table.ForeignKey(
                        name: "FK_Sprints_Epics_EpicId",
                        column: x => x.EpicId,
                        principalTable: "Epics",
                        principalColumn: "EpicId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TeamEpics",
                columns: table => new
                {
                    TeamEpicId = table.Column<Guid>(nullable: false),
                    TeamId = table.Column<Guid>(nullable: false),
                    EpicId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEpics", x => x.TeamEpicId);
                    table.ForeignKey(
                        name: "FK_TeamEpics_Epics_EpicId",
                        column: x => x.EpicId,
                        principalTable: "Epics",
                        principalColumn: "EpicId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TeamEpics_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    TeamId = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    UserRole = table.Column<string>(nullable: false),
                    UserPosition = table.Column<string>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    AvatarLink = table.Column<string>(nullable: true),
                    RecordVersion = table.Column<uint>(type: "xid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    RefreshTokenId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.RefreshTokenId);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Stories",
                columns: table => new
                {
                    StoryId = table.Column<Guid>(nullable: false),
                    SprintId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    ColumnType = table.Column<int>(nullable: false),
                    StoryPriority = table.Column<int>(nullable: false),
                    Estimate = table.Column<int>(nullable: false),
                    IsReady = table.Column<bool>(nullable: false),
                    IsBlocked = table.Column<bool>(nullable: false),
                    BlockReason = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    RecordVersion = table.Column<uint>(type: "xid", nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stories", x => x.StoryId);
                    table.ForeignKey(
                        name: "FK_Stories_Sprints_SprintId",
                        column: x => x.SprintId,
                        principalTable: "Sprints",
                        principalColumn: "SprintId",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Stories_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "StoryHistories",
                columns: table => new
                {
                    StoryHistoryId = table.Column<Guid>(nullable: false),
                    StoryHistoryAction = table.Column<string>(nullable: false),
                    FieldName = table.Column<string>(nullable: true),
                    PreviousValue = table.Column<string>(nullable: true),
                    CurrentValue = table.Column<string>(nullable: true),
                    RecordVersion = table.Column<uint>(type: "xid", nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    StoryId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoryHistories", x => x.StoryHistoryId);
                    table.ForeignKey(
                        name: "FK_StoryHistories_Stories_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Stories",
                        principalColumn: "StoryId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Epics_ProjectId",
                table: "Epics",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_EpicId",
                table: "Sprints",
                column: "EpicId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_SprintId",
                table: "Stories",
                column: "SprintId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_UserId",
                table: "Stories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StoryHistories_StoryId",
                table: "StoryHistories",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEpics_EpicId",
                table: "TeamEpics",
                column: "EpicId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEpics_TeamId",
                table: "TeamEpics",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ProjectId",
                table: "Teams",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                column: "TeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "StoryHistories");

            migrationBuilder.DropTable(
                name: "TeamEpics");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropTable(
                name: "Sprints");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Epics");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
