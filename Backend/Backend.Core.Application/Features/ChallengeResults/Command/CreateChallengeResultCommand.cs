using AutoMapper;
using Backend.Core.Application.Dtos.ChallengeResults;
using Backend.Core.Application.Interfaces;
using Backend.Core.Domain.Entities;
using MediatR;

namespace Backend.Core.Application.Features.ChallengeResults.Command;

public class CreateChallengeResultCommand : IRequest<GetChallengeResult>
{
    public string? UserId { get; set; }
    public int Level { get; set; }
    public int CorrectAnswersCount { get; set; }
    public decimal MinutiesElapsed { get; set; }
}

public class CreateChallengeResultCommandHandler(IChallengeResultRepository challengeResultRepository, IMapper mapper)
    : IRequestHandler<CreateChallengeResultCommand, GetChallengeResult>
{
    public async Task<GetChallengeResult> Handle(CreateChallengeResultCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var entity = mapper.Map<ChallengeResult>(request);
            return mapper.Map<GetChallengeResult>(await challengeResultRepository.AddAsync(entity));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}