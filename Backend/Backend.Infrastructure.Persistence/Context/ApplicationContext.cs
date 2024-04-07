using Backend.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infraestructure.Persistence.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>().ToTable("Questions");
            modelBuilder.Entity<Question>().HasKey(x=> x.Id);
            modelBuilder.Entity<Question>().Property(x => x.Description).HasMaxLength(100);
            modelBuilder.Entity<Question>().Property(x => x.Level).HasMaxLength(10);


            modelBuilder.Entity<ChallengeResult>().ToTable("ChallengeResults");
            modelBuilder.Entity<ChallengeResult>().HasKey(x => x.Id);
            modelBuilder.Entity<ChallengeResult>().Property(x => x.MinutiesElapsed).HasPrecision(5, 3);
            modelBuilder.Entity<ChallengeResult>().Property(x => x.Level).HasMaxLength(10);

        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<ChallengeResult> ChallengeResults { get; set; }
    }
}
