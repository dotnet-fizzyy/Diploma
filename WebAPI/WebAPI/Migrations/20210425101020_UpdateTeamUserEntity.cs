using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class UpdateTeamUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamUser_Teams_TeamId1",
                table: "TeamUser");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamUser_Users_UserId1",
                table: "TeamUser");

            migrationBuilder.DropIndex(
                name: "IX_TeamUser_TeamId1",
                table: "TeamUser");

            migrationBuilder.DropIndex(
                name: "IX_TeamUser_UserId1",
                table: "TeamUser");

            migrationBuilder.DropColumn(
                name: "TeamId1",
                table: "TeamUser");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "TeamUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeamId1",
                table: "TeamUser",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "TeamUser",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TeamUser_TeamId1",
                table: "TeamUser",
                column: "TeamId1");

            migrationBuilder.CreateIndex(
                name: "IX_TeamUser_UserId1",
                table: "TeamUser",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUser_Teams_TeamId1",
                table: "TeamUser",
                column: "TeamId1",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUser_Users_UserId1",
                table: "TeamUser",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
