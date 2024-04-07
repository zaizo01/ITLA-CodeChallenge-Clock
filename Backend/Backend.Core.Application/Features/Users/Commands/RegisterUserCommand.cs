using Backend.Core.Application.Dtos.Users;
using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.Users.Commands;

public class RegisterUserCommand : IRequest<RegisterResponse>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string RegistrationNumber { get; set; }
    public string PassWord { get; set; }
}

public class RegisterUserCommandHandler(IAccountService accountService)
    : IRequestHandler<RegisterUserCommand, RegisterResponse>
{
    public async Task<RegisterResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var student = await accountService.RegisterUser(request);
            return student;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}