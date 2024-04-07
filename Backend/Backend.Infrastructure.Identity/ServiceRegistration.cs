using Backend.Core.Application.Interfaces;
using Backend.Infraestructure.Identity.Context;
using Backend.Infraestructure.Identity.Entities;
using Backend.Infraestructure.Identity.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Infraestructure.Identity
{
    public static class ServiceRegistration
    {
        public static void AddIdentityLayer(this IServiceCollection services, IConfiguration configuration)
        {
            ContextConfiguration(services, configuration);
            #region Identity

            services.AddIdentity<Users, IdentityRole>()
                .AddEntityFrameworkStores<IdentityContext>().AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Login";
                options.AccessDeniedPath = "/Login/AccessDenied";
            });

            services.AddAuthentication();

            #endregion

            ServiceConfiguration(services);
        }

        #region "Private Methods"

        private static void ContextConfiguration(IServiceCollection services, IConfiguration configuration)
        {
            #region IdentityContext

            services.AddDbContext<IdentityContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseSqlServer(configuration.GetConnectionString("IdentityConnection"),
                    m => m.MigrationsAssembly(typeof(IdentityContext).Assembly.FullName));
            });

            #endregion
        }

        private static void ServiceConfiguration(IServiceCollection services)
        {
            #region Services

            services.AddTransient<IAccountService, AccountService>();

            #endregion
        }

        #endregion
    }
}