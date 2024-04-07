using AutoMapper;
using Backend.Core.Application.Dtos.ChallengeResults;
using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.ChallengeResults.Queries;

public class GetChallengeResultByLevelQuery : IRequest<IEnumerable<ChallengeResultDto>>
{
    public int Level { get; set; }
}

public class GetChallengeResultByLevelQueryHandler(IChallengeResultRepository challengeResultRepository, IMapper mapper)
    : IRequestHandler<GetChallengeResultByLevelQuery, IEnumerable<ChallengeResultDto>>
{
    public async Task<IEnumerable<ChallengeResultDto>> Handle(GetChallengeResultByLevelQuery request,
        CancellationToken cancellationToken)
    {
        try
        {
            var challenges = await challengeResultRepository.GetAllByLevel(request.Level);
            return challenges.ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}