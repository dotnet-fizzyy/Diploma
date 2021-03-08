using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class UpdateEntitiesWithGeneralEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "RefreshTokens");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Teams",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "StoryHistories",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Stories",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Sprints",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "RefreshTokens",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Projects",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Epics",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "RefreshTokens");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Epics");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "StoryHistories",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Stories",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 8, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "RefreshTokens",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
