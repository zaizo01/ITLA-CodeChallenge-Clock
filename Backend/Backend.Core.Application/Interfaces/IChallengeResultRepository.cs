using Backend.Core.Application.Dtos.ChallengeResults;
using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Interfaces;

public interface IChallengeResultRepository : IBaseRepository<ChallengeResult>
{
    Task<IEnumerable<ChallengeResultDto>> GetAllByLevel(int level);
}