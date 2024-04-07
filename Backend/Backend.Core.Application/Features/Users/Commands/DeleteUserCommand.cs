using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.Users.Commands;

public class DeleteUserCommand : IRequest<bool>
{
    public string RegistrationNumber { get; set; }
}

public class DeleteUserCommandHandler(IAccountService accountService) : IRequestHandler<DeleteUserCommand, bool>
{
    public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await accountService.RemoveUser(request.RegistrationNumber);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}