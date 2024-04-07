using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Infraestructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChallengeResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Level = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CorrectAnswersCount = table.Column<int>(type: "int", nullable: false),
                    MinutiesElapsed = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeResults", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Level = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    CorrectAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeResults");

            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
