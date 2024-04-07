using Microsoft.AspNetCore.Identity;

namespace Backend.Infraestructure.Identity.Entities;

public class Users : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string RegistrationNumber { get; set; }
}