using Backend.Core.Application.Enums;
using Backend.Infraestructure.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Infraestructure.Identity.Seeds;

public static class DefaultAdmin
{
    public static async Task SeedAsync(UserManager<Users> userManager, RoleManager<IdentityRole> roleManager)
    {
        Users defaultAdmin = new()
        {
            UserName = "20221068",
            FirstName = "Gerald Antonio",
            LastName = "Silverio Serrata",
            Email = "20221068@itla.edu.do",
            EmailConfirmed = true,
            RegistrationNumber = "20221068"
        };

        if (userManager.Users.All(u => u.Id != defaultAdmin.Id))
        {
            var user = await userManager.FindByNameAsync(defaultAdmin.UserName);
            if (user == null)
            {
                await userManager.CreateAsync(defaultAdmin, "123Admin@");
                await userManager.AddToRoleAsync(defaultAdmin, Roles.ADMIN.ToString());
                await userManager.AddToRoleAsync(defaultAdmin, Roles.STUDENT.ToString());
            }
        }
    }
}