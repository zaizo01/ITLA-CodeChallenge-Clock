using Backend.Core.Application.Interfaces;
using Backend.Core.Domain.Entities;
using Backend.Infraestructure.Persistence.Context;
using Backend.Infraestructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Infraestructure.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<IQuestionRepository, QuestionRepository>();
            services.AddTransient<IChallengeResultRepository, ChallengeResultRepository>();
        }
    }
}