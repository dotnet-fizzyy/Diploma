using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class ChangeUserPositionToProjectPositionColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamUser_Teams_TeamId",
                table: "TeamUser");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamUser_Users_UserId",
                table: "TeamUser");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserPosition",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeamUser",
                table: "TeamUser");

            migrationBuilder.DropColumn(
                name: "UserPosition",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RequiredPosition",
                table: "Stories");

            migrationBuilder.RenameTable(
                name: "TeamUser",
                newName: "TeamUsers");

            migrationBuilder.RenameIndex(
                name: "IX_TeamUser_UserId",
                table: "TeamUsers",
                newName: "IX_TeamUsers_UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamptz");

            migrationBuilder.AddColumn<int>(
                name: "ProjectPosition",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Teams",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamptz");

            migrationBuilder.AddColumn<int>(
                name: "ProjectPosition",
                table: "Stories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeamUsers",
                table: "TeamUsers",
                columns: new[] { "TeamId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProjectPosition",
                table: "Users",
                column: "ProjectPosition");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUsers_Teams_TeamId",
                table: "TeamUsers",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUsers_Users_UserId",
                table: "TeamUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamUsers_Teams_TeamId",
                table: "TeamUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamUsers_Users_UserId",
                table: "TeamUsers");

            migrationBuilder.DropIndex(
                name: "IX_Users_ProjectPosition",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TeamUsers",
                table: "TeamUsers");

            migrationBuilder.DropColumn(
                name: "ProjectPosition",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProjectPosition",
                table: "Stories");

            migrationBuilder.RenameTable(
                name: "TeamUsers",
                newName: "TeamUser");

            migrationBuilder.RenameIndex(
                name: "IX_TeamUsers_UserId",
                table: "TeamUser",
                newName: "IX_TeamUser_UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Users",
                type: "timestamptz",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<int>(
                name: "UserPosition",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Teams",
                type: "timestamptz",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<int>(
                name: "RequiredPosition",
                table: "Stories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TeamUser",
                table: "TeamUser",
                columns: new[] { "TeamId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserPosition",
                table: "Users",
                column: "UserPosition");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUser_Teams_TeamId",
                table: "TeamUser",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUser_Users_UserId",
                table: "TeamUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
