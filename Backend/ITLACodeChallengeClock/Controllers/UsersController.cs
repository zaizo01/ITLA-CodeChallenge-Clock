using Backend.Core.Application.Features.Users.Commands;
using Backend.Core.Application.Features.Users.Queries;
using Microsoft.AspNetCore.Mvc;

namespace ITLACodeChallengeClock.Controllers;

public class UsersController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> CreateUser(RegisterUserCommand commnand)
    {
        try
        {
            var user = await Mediator.Send(commnand);
            return user.HasError ? BadRequest(user) : StatusCode(StatusCodes.Status201Created, user);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(AuthenticationUserCommand command)
    {
        try
        {
            var user = await Mediator.Send(command);
            return user.HasError ? BadRequest(user) : StatusCode(StatusCodes.Status200OK, user);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("{registrationNumber}")]
    public async Task<IActionResult> GetByRegistrationNumber(string registrationNumber)
    {
        try
        {
            var user = await Mediator.Send(new GetUserByRegistrationNumber { RegistrationNumber = registrationNumber });

            return user.HasError ? NoContent() : StatusCode(StatusCodes.Status200OK, user);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpDelete("RemoveUser{registrationNumber}")]
    public async Task<IActionResult> RemoveUser(string registrationNumber)
    {
        try
        {
            var result = await Mediator.Send(new DeleteUserCommand { RegistrationNumber = registrationNumber });
            return result == true
                ? StatusCode(StatusCodes.Status204NoContent)
                : StatusCode(StatusCodes.Status400BadRequest, "No se pudo elimiar el estudiante");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}