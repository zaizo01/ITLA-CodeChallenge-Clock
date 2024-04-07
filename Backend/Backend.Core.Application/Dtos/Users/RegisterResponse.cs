using Backend.Core.Application.Features.Users.Commands;

namespace Backend.Core.Application.Dtos.Users;

public class RegisterResponse : RegisterUserCommand
{
    public string Id { get; set; }
    public string Error { get; set; }
    public bool HasError { get; set; }
}