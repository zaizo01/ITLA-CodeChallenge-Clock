using Backend.Core.Application.Dtos.Users;
using Backend.Core.Application.Features.Users.Commands;

namespace Backend.Core.Application.Interfaces;

public interface IAccountService
{
    Task<RegisterResponse> RegisterUser(RegisterUserCommand request);
    Task<AuthenticationResponse> AuthenticationUser(AuthenticationUserCommand request);
    Task<AuthenticationResponse> GetUserByRegistrationNumber(string registrationNumber);

    Task<bool> RemoveUser(string registrationNumber);
    Task SignOut();
}