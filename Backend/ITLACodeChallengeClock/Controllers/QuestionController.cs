using Backend.Core.Application.Features.Questions.Command;
using Backend.Core.Application.Features.Questions.Queries;
using Microsoft.AspNetCore.Mvc;

namespace ITLACodeChallengeClock.Controllers;

public class QuestionController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateQuestionsCommand command)
    {
        try
        {
            var user = await Mediator.Send(command);
            return StatusCode(StatusCodes.Status201Created, command);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpGet("GetQuestionsByLevel{level}")]
    public async Task<IActionResult> GetAll(string level)
    {
        try
        {
            var questions = await Mediator.Send(new GetAllQuestionQuery{Level = level});
            return questions != null
                ? StatusCode(StatusCodes.Status200OK, questions)
                : StatusCode(StatusCodes.Status204NoContent);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}