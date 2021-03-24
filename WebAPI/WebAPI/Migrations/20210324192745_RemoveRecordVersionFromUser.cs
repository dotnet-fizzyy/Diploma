using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class RemoveRecordVersionFromUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "xmin",
                table: "Users");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "WorkSpaces",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Teams",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "StoryHistories",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Stories",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Sprints",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "RefreshTokens",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Projects",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Epics",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldDefaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "WorkSpaces",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<uint>(
                name: "xmin",
                table: "Users",
                type: "xid",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Teams",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "StoryHistories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Stories",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Sprints",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "RefreshTokens",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Projects",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Epics",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(2021, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2021, 3, 24, 0, 0, 0, 0, DateTimeKind.Utc));
        }
    }
}
