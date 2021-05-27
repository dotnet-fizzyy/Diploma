using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddTeamIdForStory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "Stories",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stories_TeamId",
                table: "Stories",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Teams_TeamId",
                table: "Stories",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stories_Teams_TeamId",
                table: "Stories");

            migrationBuilder.DropIndex(
                name: "IX_Stories_TeamId",
                table: "Stories");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Stories");
        }
    }
}
