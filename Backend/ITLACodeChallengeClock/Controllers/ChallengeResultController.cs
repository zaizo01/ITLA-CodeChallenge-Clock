using Backend.Core.Application.Features.ChallengeResults.Command;
using Backend.Core.Application.Features.ChallengeResults.Queries;
using Microsoft.AspNetCore.Mvc;

namespace ITLACodeChallengeClock.Controllers;

public class ChallengeResultController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateChallengeResultCommand command)
    {
        try
        {
            var challenge = await Mediator.Send(command);
            return StatusCode(StatusCodes.Status201Created, challenge);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("{level}")]
    public async Task<IActionResult> Get(int level)
    {
        try
        {
            var challengesResults = await Mediator.Send(new GetChallengeResultByLevelQuery { Level = level }
            );

            return challengesResults != null
                ? StatusCode(StatusCodes.Status200OK, challengesResults)
                : StatusCode(StatusCodes.Status204NoContent);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}