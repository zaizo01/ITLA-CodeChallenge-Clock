using Backend.Core.Application.Dtos.Users;
using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.Users.Commands;

public class AuthenticationUserCommand : IRequest<AuthenticationResponse>
{
    public string UserName { get; set; }
    public string PassWord { get; set; }
}

public class AuthenticationUserCommandHandler(IAccountService accountService)
    : IRequestHandler<AuthenticationUserCommand, AuthenticationResponse>
{
    public async Task<AuthenticationResponse> Handle(AuthenticationUserCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var student = await accountService.AuthenticationUser(request);
            return student;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}