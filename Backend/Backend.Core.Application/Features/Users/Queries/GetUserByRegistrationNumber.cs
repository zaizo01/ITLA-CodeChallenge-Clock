using Backend.Core.Application.Dtos.Users;
using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.Users.Queries;

public class GetUserByRegistrationNumber : IRequest<AuthenticationResponse>
{
    public string RegistrationNumber { get; set; }
}

public class
    GetUserByRegistrationNumberQueryHandler(IAccountService accountService)
    : IRequestHandler<GetUserByRegistrationNumber, AuthenticationResponse>
{
    public async Task<AuthenticationResponse> Handle(GetUserByRegistrationNumber request,
        CancellationToken cancellationToken)
    {
        try
        {
            var user = await accountService.GetUserByRegistrationNumber(request.RegistrationNumber);
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}