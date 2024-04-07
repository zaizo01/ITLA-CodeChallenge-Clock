using Backend.Core.Application.Enums;
using Backend.Infraestructure.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Infraestructure.Identity.Seeds;

public static class DefaultRoles
{
    public static async Task SeedAsync(UserManager<Users> userManager, RoleManager<IdentityRole> roleManager)
    {
        await roleManager.CreateAsync(new IdentityRole(Roles.ADMIN.ToString()));
        await roleManager.CreateAsync(new IdentityRole(Roles.STUDENT.ToString()));
    }
}