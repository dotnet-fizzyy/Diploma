using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class RemoveProgressFromEpicAndSprint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "xmin",
                table: "StoryHistories");

            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Epics");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<uint>(
                name: "xmin",
                table: "StoryHistories",
                type: "xid",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.AddColumn<double>(
                name: "Progress",
                table: "Sprints",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Progress",
                table: "Epics",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
